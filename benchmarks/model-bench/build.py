#!/usr/bin/env python3
"""Inject the supplied assets into an LLM-generated AGL site file.

Usage:  python3 build.py candidate.html
Output: candidate-final.html (tokens replaced with real base64)
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
TOKENS = {
    "[[FONT_SCHIBSTED]]": HERE / "assets/SchibstedGrotesk-var.woff2.b64",
    "[[FONT_NEWSREADER]]": HERE / "assets/Newsreader-italic.woff2.b64",
    "[[IMG_HERO]]": HERE / "assets/hero-dawn.jpg.b64",
}

def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    html = src.read_text()
    missing = [t for t in TOKENS if t not in html]
    if missing:
        print(f"warning: tokens not found in {src.name}: {', '.join(missing)}")
    for token, b64_path in TOKENS.items():
        html = html.replace(token, b64_path.read_text().strip())
    out = src.with_name(src.stem + "-final" + src.suffix)
    out.write_text(html)
    print(f"wrote {out} ({len(html)//1024} KB)")

if __name__ == "__main__":
    main()
