/* ============================================================================
   VISUAL-CHECKS.js — the factory's deterministic visual-QA gate
   ----------------------------------------------------------------------------
   Runs IN the rendered page (preview_eval, Playwright page.evaluate, or pasted
   into devtools). Inspects real geometry + computed styles — NOT CSS source —
   so it catches the failure class that CSS-grep QA ships clean:
   collapsed/zero-height elements, starved columns, overflow, accent overuse,
   AI-slop tells. Returns a structured defect list. No baseline image needed.

   Why this exists: the Field build passed every CSS check and shipped (1) a
   signature element collapsed to 0px height and (2) a 64px heading trapped in a
   324px column. Neither is visible to a grep. Both are P0 here.

   USAGE:
     const report = window.__visualChecks({ accent: '#C17F49' });
     // report = { pass, blockers, warnings, summary, defects:[...] }

   Severity: P0 = ship-blocker. P1 = should fix. P2 = polish.
   Tunable thresholds live in CFG. Numbers cite the layout-craft research.
   ============================================================================ */
(function () {
  const CFG = {
    accent: null,                 // brand accent hex, e.g. '#C17F49' (enables accent-overuse + slop checks)
    accentMaxElements: 14,        // accent allowed on ≤ this many elements (eyebrows+CTA+numbers; research: accent scarce)
    bodyFontMax: 20,              // px; above this an element is treated as display/heading
    displayCPLMin: 14,            // display type below this chars-per-line = trapped column (research M4: ≤25 CPL, flag <14)
    displayCPLMax: 32,            // display wrapping wider than this reads as body, loses hierarchy (research M3/M4)
    bodyCPLMax: 92,              // body measure hard ceiling (Butterick 45-90)
    minBoxPx: 2,                  // rect smaller than this with content = collapsed
    avgCharEm: 0.5,               // research constant: avg glyph advance ≈ 0.5em
    bannedFonts: ['Inter','Roboto','Arial','"Arial"','Open Sans','Lato','Poppins','DM Sans','system-ui','Helvetica'],
  };

  function run(opts) {
    const cfg = Object.assign({}, CFG, opts || {});
    const defects = [];
    const add = (severity, code, sel, msg, data) =>
      defects.push({ severity, code, selector: sel, message: msg, data: data || null });

    const vw = window.innerWidth, vh = window.innerHeight;
    const cs = el => getComputedStyle(el);
    const rect = el => el.getBoundingClientRect();
    const sel = el => {
      if (el.id) return '#' + el.id;
      const c = (el.className && String(el.className).trim().split(/\s+/)[0]) || '';
      return el.tagName.toLowerCase() + (c ? '.' + c : '');
    };
    const hasContent = el =>
      (el.textContent && el.textContent.trim().length > 0) ||
      el.querySelector('img,svg,canvas,video,input,button,picture');

    const all = Array.from(document.querySelectorAll('body *')).filter(el => {
      const c = cs(el);
      return c.display !== 'none' && c.visibility !== 'hidden' && +c.opacity !== 0;
    });

    /* ---- P0: A3 horizontal viewport overflow (highest ROI single check) ---- */
    if (document.documentElement.scrollWidth > vw + 1) {
      const offenders = all.filter(el => rect(el).right > vw + 1)
        .sort((a, b) => rect(b).right - rect(a).right).slice(0, 5).map(sel);
      add('P0', 'viewport-overflow', 'html',
        'Page scrolls horizontally (' + document.documentElement.scrollWidth + 'px > ' + vw + 'px viewport).',
        { offenders });
    }

    /* ---- P0: A1 collapsed / zero-box element that holds content ---- */
    all.forEach(el => {
      if (!hasContent(el)) return;
      const r = rect(el), c = cs(el);
      // skip intentionally-clipped sr-only / skip-links
      if (c.position === 'absolute' && r.width <= 1 && r.height <= 1 && /(-?9999|1px)/.test(c.clip + c.left + c.width)) return;
      if (r.height < cfg.minBoxPx && el.scrollHeight > 2) {
        add('P0', 'collapsed-height', sel(el),
          'Element holds content but rendered height is ' + Math.round(r.height) + 'px (collapsed). scrollHeight=' + el.scrollHeight + '. Common cause: all children position:absolute with no fixed height — use inline-grid stacking.',
          { height: Math.round(r.height), scrollHeight: el.scrollHeight });
      } else if (r.width < cfg.minBoxPx && el.scrollWidth > 2) {
        add('P0', 'collapsed-width', sel(el),
          'Element holds content but rendered width is ' + Math.round(r.width) + 'px (starved).',
          { width: Math.round(r.width) });
      }
    });

    /* ---- P1: A7 display type trapped in a narrow column (the Field bug) ---- */
    Array.from(document.querySelectorAll('h1,h2,h3,.section-h2,[class*=headline],[class*=hero] h1')).forEach(el => {
      const c = cs(el), r = rect(el);
      const fontPx = parseFloat(c.fontSize);
      if (fontPx <= cfg.bodyFontMax) return;           // only display/heading sizes
      if (r.width < cfg.minBoxPx) return;              // collapse already reported
      const cpl = r.width / (cfg.avgCharEm * fontPx);
      const container = el.parentElement ? rect(el.parentElement).width : vw;
      if (cpl < cfg.displayCPLMin) {
        add('P1', 'display-trapped', sel(el),
          Math.round(fontPx) + 'px heading is ' + Math.round(r.width) + 'px wide ≈ ' + Math.round(cpl) +
          ' CPL — far below the ' + cfg.displayCPLMin + '-' + cfg.displayCPLMax + ' display band. It wraps into a starved 1-2-word column. Needs ≥ ' +
          Math.round(9 * fontPx) + 'px (3 words/line). Check for an em-based max-width on a parent (em resolves to the small inherited font).',
          { fontPx: Math.round(fontPx), widthPx: Math.round(r.width), cpl: Math.round(cpl), containerPx: Math.round(container) });
      } else if (cpl > cfg.displayCPLMax + 8) {
        add('P2', 'display-too-wide', sel(el),
          Math.round(fontPx) + 'px heading runs ' + Math.round(cpl) + ' CPL — reads like body, loses hierarchy. Cap measure near ' + cfg.displayCPLMax + ' CPL.',
          { cpl: Math.round(cpl) });
      }
    });

    /* ---- P2: body measure too wide ---- */
    Array.from(document.querySelectorAll('p,li,blockquote')).forEach(el => {
      const c = cs(el), r = rect(el);
      const fontPx = parseFloat(c.fontSize);
      if (fontPx > cfg.bodyFontMax) return;
      if (!el.textContent || el.textContent.trim().length < 40) return;
      const cpl = r.width / (cfg.avgCharEm * fontPx);
      if (cpl > cfg.bodyCPLMax) {
        add('P2', 'measure-too-wide', sel(el),
          'Body text ≈ ' + Math.round(cpl) + ' CPL (>' + cfg.bodyCPLMax + '). Constrain to ~65ch.', { cpl: Math.round(cpl) });
      }
    });

    /* ---- P0/P1: overflow / protrusion beyond a non-scroll parent ---- */
    all.forEach(el => {
      const p = el.parentElement; if (!p) return;
      const pc = cs(p);
      if (/(auto|scroll)/.test(pc.overflow + pc.overflowX + pc.overflowY)) return; // intentional scroller
      if (pc.position === 'static' && pc.display === 'inline') return;
      const r = rect(el), pr = rect(p);
      if (pr.width < 4) return;
      if (r.right > pr.right + 2 && r.width <= pr.width) {
        // only if it visually breaks (not a deliberate full-bleed wider-than-parent element)
        if (r.right > vw + 1) return; // already counted in viewport-overflow
        add('P1', 'element-protrusion', sel(el),
          sel(el) + ' overflows its parent ' + sel(p) + ' by ' + Math.round(r.right - pr.right) + 'px.',
          { byPx: Math.round(r.right - pr.right) });
      }
    });

    /* ---- P2: accent-color overuse (research: accent must be scarce) ---- */
    if (cfg.accent) {
      const target = hexToRgbStr(cfg.accent);
      const hits = all.filter(el => {
        const c = cs(el);
        return rgbEq(c.color, target) && el.textContent && el.textContent.trim().length > 0 && el.children.length === 0;
      });
      if (hits.length > cfg.accentMaxElements) {
        add('P2', 'accent-overuse', 'multiple',
          'Accent color on ' + hits.length + ' text elements (budget ' + cfg.accentMaxElements + '). "Accent everywhere dilutes it" — reserve for CTA, eyebrow, and key numerals.',
          { count: hits.length, sample: hits.slice(0, 6).map(sel) });
      }
    }

    /* ---- P1: banned / AI-default fonts ---- */
    const fonts = new Set();
    ['h1','h2','body','p'].forEach(t => { const e = document.querySelector(t); if (e) fonts.add(cs(e).fontFamily.split(',')[0].replace(/["']/g,'').trim()); });
    fonts.forEach(f => {
      if (cfg.bannedFonts.some(b => f.toLowerCase() === b.replace(/"/g,'').toLowerCase())) {
        add('P1', 'banned-font', 'root', 'Banned/AI-default font in use: ' + f + '. Use an approved characterful face.', { font: f });
      }
    });

    /* ---- P1: signature animation stuck (anti-fool: only trust a finished anim) ---- */
    if (document.getAnimations) {
      const running = document.getAnimations().filter(a => a.playState === 'paused' || a.playState === 'idle');
      // informational — surfaced so a frozen-rAF capture can't masquerade as "done"
      if (running.length && /(reduce)/.test(matchMedia('(prefers-reduced-motion: reduce)').media) === false) {
        // not a hard fail (could be legitimately pre-trigger), but report for the critic
        add('P2', 'anim-not-finished', 'document',
          running.length + ' animation(s) not in a running/finished state at inspect time. If a signature animation, verify it is not frozen by rAF throttling.',
          { count: running.length });
      }
    }

    const blockers = defects.filter(d => d.severity === 'P0');
    const warnings = defects.filter(d => d.severity === 'P1');
    return {
      pass: blockers.length === 0,
      blockers: blockers.length,
      warnings: warnings.length,
      polish: defects.filter(d => d.severity === 'P2').length,
      summary: blockers.length === 0
        ? ('No blockers. ' + warnings.length + ' warnings, ' + defects.filter(d=>d.severity==='P2').length + ' polish.')
        : (blockers.length + ' BLOCKER(S) — do not ship.'),
      defects,
    };

    function hexToRgbStr(hex) {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(x => x + x).join('') : h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    function rgbEq(rgbStr, arr) {
      const m = rgbStr.match(/\d+/g); if (!m) return false;
      return Math.abs(+m[0]-arr[0]) < 10 && Math.abs(+m[1]-arr[1]) < 10 && Math.abs(+m[2]-arr[2]) < 10;
    }
  }

  window.__visualChecks = run;
  return run;
})();
