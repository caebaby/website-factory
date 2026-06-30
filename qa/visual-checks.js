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
      } else if (cpl > cfg.displayCPLMax + 8 && el.textContent.trim().length > cfg.displayCPLMax + 8) {
        // LED-005: gate on actual text length — a SHORT heading in a wide box isn't "too wide"
        add('P2', 'display-too-wide', sel(el),
          Math.round(fontPx) + 'px heading runs ' + Math.round(cpl) + ' CPL — reads like body, loses hierarchy. Cap measure near ' + cfg.displayCPLMax + ' CPL.',
          { cpl: Math.round(cpl) });
      }
    });

    /* ---- P2: body measure too wide (running prose only) ---- */
    Array.from(document.querySelectorAll('p,li,blockquote')).forEach(el => {
      const c = cs(el), r = rect(el);
      const fontPx = parseFloat(c.fontSize);
      if (fontPx > cfg.bodyFontMax) return;
      if (!el.textContent || el.textContent.trim().length < 40) return;
      // LED-005: only flag LEFT-aligned running prose. Centered lines, label rows,
      // and tracked/uppercase text are not body measure — skip to avoid false positives.
      if (/center|right/.test(c.textAlign)) return;
      if (c.textTransform === 'uppercase' || parseFloat(c.letterSpacing) > 0.5) return;
      const words = el.textContent.trim().split(/\s+/).length;
      if (words / (el.textContent.trim().length / 6) < 0.7) return; // mostly non-word chars → not prose
      const cpl = r.width / (cfg.avgCharEm * fontPx);
      // LED-005: box width ≠ line length. Only flag if the text is long enough to actually
      // wrap past the limit; a short single-line paragraph in a wide box is not too-wide.
      if (cpl > cfg.bodyCPLMax && el.textContent.trim().length > cfg.bodyCPLMax) {
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

      /* ---- P2: accent-fill-absent — the timidity proxy (LAYOUT_CRAFT 8.3) ----
         Accent scarcity governs accent-as-TEXT. This governs accent-as-SURFACE.
         A bold brand that never lets its color own a zone (only colored glyphs on
         warm-white) is timid. Fires only on TOTAL absence of accent-as-fill; a
         deliberately Restrained heritage brand may intend this — the Tier-B critic
         decides whether to drench. Informational, never a blocker. */
      const needle = target.join(', ');
      const vpArea = vw * vh;
      const accentFill = all.some(el => {
        const c = cs(el);
        if (rgbEq(c.backgroundColor, target)) { const r = rect(el); return r.width * r.height >= vpArea * 0.06; }
        if (c.backgroundImage && c.backgroundImage !== 'none' && c.backgroundImage.indexOf(needle) !== -1) {
          const r = rect(el); return r.width * r.height >= vpArea * 0.06;
        }
        return false;
      });
      if (!accentFill) {
        add('P2', 'accent-fill-absent', 'document',
          'The accent never owns a surface — it appears only as text/glyphs, never as a background fill on a meaningful area. A bold brand reads timid this way (LAYOUT_CRAFT 8.3: pick Restrained/Committed/Drenched from positioning). Lowest-risk fix: drench the final-CTA zone. If Restrained is intentional, the taste critic clears it.',
          { hint: 'committed brands want ≥1 accent-filled zone (a band, the final CTA, or a mesh hero)' });
      }
    }

    /* ---- P2: section-rhythm-monotony — density-rhythm proxy (LAYOUT_CRAFT 8.5) ----
       Pages that sing breathe (alternating dense/sparse). Pure structural proxy:
       fires ONLY when every <section> shares the identical vertical padding — true
       uniformity, the floor of monotony. The real rhythm judgment (content density,
       pattern variation) stays with the Tier-B critic; this is the cheap floor. */
    (function rhythm() {
      const sections = Array.from(document.querySelectorAll('section'));
      if (sections.length < 6) return;
      const pad = s => { const c = cs(s);
        return (Math.round(parseFloat(c.paddingTop) / 8) * 8) + ':' + (Math.round(parseFloat(c.paddingBottom) / 8) * 8); };
      const distinct = new Set(sections.map(pad));
      if (distinct.size <= 1) {
        add('P2', 'section-rhythm-monotony', 'section',
          'All ' + sections.length + ' sections share one vertical padding (' + [...distinct][0] + ') — no inhale/exhale rhythm. Vary section density: at least one whitespace "exhale" and one dense "inhale" (LAYOUT_CRAFT 8.5).',
          { sections: sections.length, padding: [...distinct][0] });
      }
    })();

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

    /* ---- P1/P2: AI-SLOP TELLS (ported from the impeccable/avoid-ai-design 44-rule
       detector + slop research — deterministic, run free every build) ---- */
    (function slop() {
      const toHsl = (rgbStr) => {
        const m = rgbStr.match(/\d+(\.\d+)?/g); if (!m) return null;
        let r = +m[0]/255, g = +m[1]/255, b = +m[2]/255;
        const mx = Math.max(r,g,b), mn = Math.min(r,g,b); let h = 0, s = 0, l = (mx+mn)/2;
        if (mx !== mn) { const d = mx-mn; s = l > 0.5 ? d/(2-mx-mn) : d/(mx+mn);
          h = mx===r ? (g-b)/d+(g<b?6:0) : mx===g ? (b-r)/d+2 : (r-g)/d+4; h *= 60; }
        return { h, s, l };
      };
      // 1. AI-default indigo/violet/purple accent on the primary CTA
      const cta = document.querySelector('.btn-primary,[class*=cta] a,button[type=submit],.nav-cta');
      if (cta) { const bg = toHsl(cs(cta).backgroundColor);
        if (bg && bg.h >= 250 && bg.h <= 290 && bg.s > 0.5)
          add('P1', 'slop-indigo-accent', sel(cta), 'Primary CTA uses an AI-default indigo/violet accent (hue ' + Math.round(bg.h) + '°). Choose a hue outside 250-290°.', { hue: Math.round(bg.h) }); }
      // 2. gradient text
      all.forEach(el => { const c = cs(el);
        if ((c.webkitBackgroundClip === 'text' || c.backgroundClip === 'text') &&
            /transparent|rgba\(0, 0, 0, 0\)/.test((c.webkitTextFillColor||'') + c.color) && el.textContent.trim())
          add('P2', 'slop-gradient-text', sel(el), 'Gradient-clipped text — an immediate AI tell. Use a solid color.'); });
      // 3. side-stripe card border (one-edge accent on a rounded card — "most reliable AI tell")
      all.forEach(el => { const c = cs(el);
        const w = ['borderTopWidth','borderLeftWidth','borderRightWidth','borderBottomWidth'].map(p => parseFloat(c[p]) || 0);
        if (w.filter(x => x >= 3).length === 1 && c.borderRadius !== '0px' && el.children.length)
          add('P2', 'slop-side-stripe', sel(el), 'One-edge thick accent border on a rounded card — a top AI tell.'); });
      // 4. same flat ~0.1-opacity single shadow repeated everywhere
      const shadows = {}; all.forEach(el => { const s = cs(el).boxShadow; if (s && s !== 'none') shadows[s] = (shadows[s]||0)+1; });
      Object.keys(shadows).forEach(s => { if (shadows[s] >= 4 && /0\.1\)/.test(s) && (s.match(/rgba?\(/g)||[]).length <= 1)
        add('P2', 'slop-flat-shadow', 'multiple', 'A single flat ~0.1-opacity shadow on ' + shadows[s] + ' elements. Use a layered (multi-stop) shadow.', { count: shadows[s] }); });
      // 5. uniform border-radius everywhere (no radius intent)
      const radii = {}; let rounded = 0;
      all.forEach(el => { const r = cs(el).borderRadius; if (r && r !== '0px') { radii[r] = (radii[r]||0)+1; rounded++; } });
      const topR = Object.entries(radii).sort((a,b) => b[1]-a[1])[0];
      if (rounded > 10 && topR && topR[1]/rounded > 0.8)
        add('P2', 'slop-uniform-radius', 'multiple', Math.round(topR[1]/rounded*100) + '% of rounded elements share radius ' + topR[0] + ' — no radius intent (vary cards/buttons/pills).', { radius: topR[0] });
    })();

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
