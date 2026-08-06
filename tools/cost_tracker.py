#!/usr/bin/env python3
"""
factory-cost — real per-project cost tracking for the website factory.

Reads .factory-state.json (stage logs with timestamps + models) and cross-
references the Hermes session DB (state.db) for actual token counts, then
applies a user-maintained pricing table to produce real dollar figures.

Usage:
    python3 tools/cost_tracker.py <client>           # per-stage + total
    python3 tools/cost_tracker.py <client> --json     # machine-readable
    python3 tools/cost_tracker.py <client> --update   # rewrite .factory-state.json with costs

The pricing table is in tools/pricing.json — update it when providers change prices.
Token counts come from Hermes state.db (~/.hermes/state.db), which tracks every
session's input/output/reasoning tokens regardless of whether Hermes knows the price.
"""
import json, sqlite3, sys, os, subprocess
from pathlib import Path
from datetime import datetime, timedelta

REPO = Path(__file__).resolve().parent.parent
HERMES_DB = Path.home() / ".hermes" / "state.db"
PRICING_FILE = Path(__file__).resolve().parent / "pricing.json"

# ── pricing ────────────────────────────────────────────────────────────

DEFAULT_PRICING = {
    # $ per 1M tokens. Update when providers change. Verify on provider dashboards.
    # Format: "model_key": {"input": X, "output": Y, "reasoning": Z}
    # reasoning is often billed same as output; if free, set to 0.
    "glm-5.2":           {"input": 0.55, "output": 2.19, "reasoning": 2.19},
    "glm-5":             {"input": 0.55, "output": 2.19, "reasoning": 2.19},
    "glm-5-turbo":       {"input": 0.14, "output": 0.28, "reasoning": 0.28},
    "glm-4.5-flash":     {"input": 0.14, "output": 0.28, "reasoning": 0.28},
    "deepseek/deepseek-v4-pro":  {"input": 0.27, "output": 1.10, "reasoning": 1.10},
    "deepseek-v4-pro":           {"input": 0.27, "output": 1.10, "reasoning": 1.10},
    "deepseek-reasoner":         {"input": 0.55, "output": 2.19, "reasoning": 2.19},
    "claude-sonnet-5":           {"input": 3.00, "output": 15.00, "reasoning": 0},
    "claude-opus-4-8":           {"input": 15.00, "output": 75.00, "reasoning": 0},
    "claude-haiku-4.5":          {"input": 0.80, "output": 4.00, "reasoning": 0},
    "fugu-ultra":                {"input": 2.00, "output": 8.00, "reasoning": 0},
    "fugu-ultra-20260615":       {"input": 2.00, "output": 8.00, "reasoning": 0},
    "google/gemini-2.5-flash":   {"input": 0.15, "output": 0.60, "reasoning": 0.60},
    "gemini-2.5-flash":          {"input": 0.15, "output": 0.60, "reasoning": 0.60},
    "moonshot/kimi-k2":          {"input": 0.60, "output": 2.50, "reasoning": 2.50},
    "kimi-k2":                   {"input": 0.60, "output": 2.50, "reasoning": 2.50},
    "grok-4.5":                  {"input": 5.00, "output": 15.00, "reasoning": 0},
}

def load_pricing():
    if PRICING_FILE.exists():
        with open(PRICING_FILE) as f:
            return json.load(f)
    return DEFAULT_PRICING

def save_pricing(data):
    with open(PRICING_FILE, "w") as f:
        json.dump(data, f, indent=2)

def model_key(model_name):
    """Normalize model names for pricing lookup."""
    if not model_name:
        return None
    key = model_name.lower().strip()
    # try exact match first, then prefix match
    pricing = load_pricing()
    if key in pricing:
        return key
    for pkey in pricing:
        if key.startswith(pkey) or pkey.startswith(key):
            return pkey
    return None

def calc_cost(model, input_t, output_t, reasoning_t=0):
    key = model_key(model)
    if not key:
        return None, "no pricing entry"
    pricing = load_pricing()
    rates = pricing[key]
    cost = (input_t / 1_000_000 * rates["input"] +
            output_t / 1_000_000 * rates["output"] +
            (reasoning_t or 0) / 1_000_000 * rates.get("reasoning", 0))
    return cost, None

# ── session DB queries ────────────────────────────────────────────────

def query_sessions(start_ts, end_ts, model_filter=None):
    """Query Hermes state.db for sessions in a time range."""
    if not HERMES_DB.exists():
        return []
    conn = sqlite3.connect(str(HERMES_DB))
    conn.row_factory = sqlite3.Row
    query = """
        SELECT id, model, input_tokens, output_tokens, reasoning_tokens,
               estimated_cost_usd, started_at, title
        FROM sessions
        WHERE started_at >= ? AND started_at <= ?
    """
    params = [start_ts, end_ts]
    if model_filter:
        query += " AND model LIKE ?"
        params.append(f"%{model_filter}%")
    query += " ORDER BY started_at"
    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]

def ts_to_epoch(ts_str):
    """ISO timestamp to epoch."""
    try:
        dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
        return dt.timestamp()
    except Exception:
        return 0

# ── main ──────────────────────────────────────────────────────────────

def track_cost(client, json_out=False, update=False):
    proj = REPO / "projects" / client
    state_file = proj / ".factory-state.json"
    if not state_file.exists():
        print(f"ERROR: no .factory-state.json at {state_file}")
        print(f"Run: node factory.js print {client} --dry-run first")
        sys.exit(1)

    with open(state_file) as f:
        state = json.load(f)

    stage_logs = state.get("log", [])
    if not stage_logs:
        print(f"ERROR: no stage logs in {state_file}")
        print("Run at least one stage via: node factory.js print <client>")
        sys.exit(1)

    report = {
        "client": client,
        "generated_at": datetime.now().isoformat(),
        "stages": [],
        "totals": {"input_tokens": 0, "output_tokens": 0, "reasoning_tokens": 0, "cost_usd": 0},
    }

    for entry in stage_logs:
        stage = entry.get("stage", "?")
        role = entry.get("role", "?")
        at_ts = entry.get("at", "")
        ms = entry.get("ms", 0)

        stage_input = stage_output = stage_reasoning = 0
        stage_cost = 0
        models_used = set()
        session_ids = []

        # ── Deep research chain (stage 0b): read usage.json if present ──
        if stage == "deepresearch":
            usage_file = proj / "research" / "usage.json"
            if usage_file.exists():
                with open(usage_file) as f:
                    ru = json.load(f)
                stage_input += ru.get("total_prompt_tokens", 0)
                stage_output += ru.get("total_completion_tokens", 0)
                for call in ru.get("calls", []):
                    models_used.add(call.get("model", call.get("provider", "?")))
                    c, _ = calc_cost(call.get("model", ""), call.get("prompt_tokens", 0),
                                     call.get("completion_tokens", 0), 0)
                    if c:
                        stage_cost += c
        else:
            # ── Hermes/Claude stages: query session DB by time window ──
            epoch = ts_to_epoch(at_ts)
            window_start = epoch - (ms / 1000) - 60
            window_end = epoch + 60
            sessions = query_sessions(window_start, window_end)

            for s in sessions:
                # Skip trivially tiny sessions (startup pings, etc.)
                if (s["input_tokens"] or 0) < 50:
                    continue
                stage_input += s["input_tokens"] or 0
                stage_output += s["output_tokens"] or 0
                stage_reasoning += s["reasoning_tokens"] or 0
                models_used.add(s["model"])
                session_ids.append(s["id"])

                cost, _ = calc_cost(s["model"], s["input_tokens"] or 0,
                                    s["output_tokens"] or 0, s["reasoning_tokens"] or 0)
                if cost:
                    stage_cost += cost

        # Also add any cost directly logged by factory.js (Claude JSON)
        factory_cost = entry.get("costUsd", 0)
        if factory_cost and not stage_cost:
            stage_cost = factory_cost

        report["stages"].append({
            "stage": stage,
            "role": role,
            "models": list(models_used),
            "input_tokens": stage_input,
            "output_tokens": stage_output,
            "reasoning_tokens": stage_reasoning,
            "cost_usd": round(stage_cost, 4),
            "wall_clock_min": round(ms / 60000, 1),
            "sessions": len(session_ids),
        })
        report["totals"]["input_tokens"] += stage_input
        report["totals"]["output_tokens"] += stage_output
        report["totals"]["reasoning_tokens"] += stage_reasoning
        report["totals"]["cost_usd"] += stage_cost

    report["totals"]["cost_usd"] = round(report["totals"]["cost_usd"], 4)

    if update:
        # Write cost back into state file
        state["cost_report"] = report
        with open(state_file, "w") as f:
            json.dump(state, f, indent=2)
        print(f"Updated {state_file} with cost report")

    if json_out:
        print(json.dumps(report, indent=2))
        return

    # Human-readable
    print(f"\n{'═' * 60}")
    print(f"  FACTORY COST REPORT — {client}")
    print(f"  Generated: {report['generated_at'][:19]}")
    print(f"{'═' * 60}\n")

    print(f"{'Stage':<14} {'Role':<12} {'Input':>10} {'Output':>8} {'Cost':>9} {'Min':>6}")
    print(f"{'─'*14} {'─'*12} {'─'*10} {'─'*8} {'─'*9} {'─'*6}")

    for s in report["stages"]:
        model_note = s["models"][0][:20] if s["models"] else "?"
        print(f"{s['stage']:<14} {s['role']:<12} {s['input_tokens']:>10,} {s['output_tokens']:>8,} "
              f"${s['cost_usd']:>7.3f} {s['wall_clock_min']:>5.1f}m")
        if len(s["models"]) > 1:
            print(f"{'':>14} models: {', '.join(s['models'])}")

    t = report["totals"]
    print(f"{'─'*14} {'─'*12} {'─'*10} {'─'*8} {'─'*9} {'─'*6}")
    print(f"{'TOTAL':<14} {'':<12} {t['input_tokens']:>10,} {t['output_tokens']:>8,} "
          f"${t['cost_usd']:>7.3f}")
    print(f"\n  Input tokens:     {t['input_tokens']:,}")
    print(f"  Output tokens:    {t['output_tokens']:,}")
    print(f"  Reasoning tokens: {t['reasoning_tokens']:,}")
    print(f"  Estimated cost:   ${t['cost_usd']:.4f}")
    print()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 tools/cost_tracker.py <client> [--json] [--update]")
        print("       python3 tools/cost_tracker.py --init-pricing   # write pricing.json")
        sys.exit(1)

    if sys.argv[1] == "--init-pricing":
        save_pricing(DEFAULT_PRICING)
        print(f"Wrote default pricing table to {PRICING_FILE}")
        print("Review and update with current provider prices.")
        sys.exit(0)

    client = sys.argv[1]
    json_out = "--json" in sys.argv
    update = "--update" in sys.argv
    track_cost(client, json_out, update)
