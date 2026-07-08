#!/usr/bin/env python3
"""Regenerate packet.txt from PROMPT.md + the AGL rulebook + reference-v8.html.
Run after any rulebook amendment so future bench runs carry the new rules."""
from pathlib import Path

HERE = Path(__file__).parent
body = Path(HERE/"PROMPT.md").read_text().split("\n---\n", 1)[1].strip()
standards = Path(HERE/"../../projects/agl/v9/DESIGN_SYSTEM.md").read_text().strip()
ref = Path(HERE/"reference-v8.html").read_text().strip()

packet = f"""{body}

---

# APPENDIX A — AGL DESIGN STANDARDS (rulebook — treat as ground truth; cite rule IDs in your own self-review before finishing)

{standards}

---

# APPENDIX B — reference-v8.html (the current build you are elevating — full source)

```html
{ref}
```

---

FINAL INSTRUCTIONS: Before writing code, state your positioning call (A/B + 3 sentences) and your
design plan in ~6 lines. Then output the complete HTML in code blocks. If you approach your output
limit, end with <!--CONTINUE--> and I'll say "continue" — resume exactly where you stopped,
mid-line if necessary, with no repeated content. After the code, self-review in ~12 lines citing
rule IDs — including R34's interaction checklist: walk every CTA and every entry path (button AND
url-hash) and state where each lands.
"""
Path(HERE/"packet.txt").write_text(packet)
print(f"packet.txt regenerated ({len(packet)//1024} KB)")
