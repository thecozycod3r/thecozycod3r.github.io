# Design lock — portfolio motion rebuild (branch motion-rebuild, 29 Oct 2026)

**Brief:** personal portfolio for Dhruv Shricharan (growth, data, operations). Readers: hiring founders/recruiters, prospective clients. Primary action: email. Secondary: case studies, résumé.
**Primary reference:** the site's own "systems drawing" system (15 Oct). Kept: navy/cobalt/signal-yellow roles, Bricolage condensed display + IBM Plex Sans/Mono, the four-stage system map as the organising idea.
**Change:** home becomes a *night blueprint* (`.night` swaps paper/ink roles; cobalt lifted to #6F89FF for contrast on navy); About is the one light `.day` section for tonal relief. Case-study pages untouched.
**Borrow (≤2):** Zentry preview's real tool footage; ThreeUI-style behaviour contract for the WebGL scene.

## Effect budget — explicit owner exception to R13
Owner asked for "all the stunning animations". Recorded here as a deliberate decision.
Signature: WebGL constellation of the business (4 stage clusters, yellow pulses along bridges, pointer tilt, fly-through on scroll).
Also: CSS char-rise name, stage pulse legend, pinned system flow, horizontal work reel, hover-play/tilt site cards, scroll-lit statement, self-drawing timeline + count-ups, two-row toolkit marquee, clip/parallax portrait, wave contact word, magnetic buttons, custom cursor, progress hairline.

## Non-negotiables kept
- Content in HTML, visible with JS off (0/107 hidden) and with reduced motion (0/61 hidden, no pins, static constellation, marquee wraps, videos paused).
- three.js loaded after idle; render loop runs only when in view AND tab visible; DPR ≤ 1.75; context-loss safe; full dispose.
- Pins desktop-only (≥1024px); reel is a grid unless the pin is live (`.reel-on`).
- Videos: no src until near viewport; play only while visible.
- LCP ~90 ms, CLS 0 (local, mobile + desktop). JS 333 KB gz incl. three (~150 KB, deferred) — budget exceeded by decision.

## Open
- Statement copy ("Most of what slows a growing business down…") drafted by Claude — Dhruv to approve or rewrite.
- Fonts 267 KB (Bricolage variable with wdth+opsz axes) — pre-existing; subsetting is a follow-up.

## 29 Oct (later) — all pages + frame rate
**Subpages:** ProjectLayout now gives all 9 case studies and 5 website pages a night hero (title char-rise, project-colour glow, blueprint grid, tool footage/screenshot with clip + parallax) over a light `.day` reading body (keeps the hard-coded accent colours legible), words lifting on section titles, count-ups, card tilt, clip-reveal screenshots, and a giant "Next case study / Next website" wave link (order verified: Cerno → Neo → Tempo → Creative Studio → Social → P&L → Asana → Table Night → ARTHUR → Cerno). /websites index: night hero + clip cards. Legacy colour aliases re-declared per theme.
**Frame rate (Chrome + Metal on M4, retina 1440×900, vsync off):**
| Fix | Effect |
|---|---|
| Clips 30 → 60 fps (minterpolate, 1280×800) | scroll footage no longer judders at 120 Hz |
| Marquee on its own layer (will-change, contain) | Toolkit p95 249 ms → 1.7 ms |
| Cursor without mix-blend-mode; nav without backdrop blur | removed full-page composite per frame |
| Max 2 videos decoding; tilt via quickTo; canvas DPR 1.25, no MSAA, 600 dust | long tasks 590 ms → 0; reel p95 12.7 → 4.5 ms |
| Stage-dot glow animates opacity/transform, not box-shadow | no paint per frame |
| Smaller blur radius on glow shadows | fewer >16 ms frames |
Home: p95 2.3 ms, 0% frames > 16.7 ms. Case study (Neo): p95 3.5–5.9 ms. Website detail pages show a steady 16.7–17.8 ms cadence after ~900 px in headless even with video and the body removed; main-thread work < 1 ms and no frame > 33 ms, so it reads as headless 60 Hz pacing, not page cost — to be confirmed on a real 120 Hz display.
