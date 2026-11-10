/* Deterministic stage for the portfolio's tool footage.
   Every clip is a page of invented data, 1280×800 CSS px, made of scenes that
   cross-fade. window.setT(seconds) draws any moment exactly, so render.mjs can
   photograph it frame by frame at 3× for a 3840×2400 film. No real client,
   person or figure appears in these files. */
window.Stage = function (scenes) {
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const X = 0.5; // cross-fade, seconds
  let total = 0;
  scenes.forEach((s) => { s.el = document.getElementById(s.id); s.t0 = total; total += s.dur; });
  window.DUR = total;

  // Figures count up as their scene arrives.
  const counters = new Map();
  scenes.forEach((s) => counters.set(s, [...s.el.querySelectorAll('[data-n]')].map((el) => ({ el, final: el.textContent }))));
  const countTo = (final, f) => {
    const m = final.match(/\d[\d,]*(\.\d+)?/);
    if (!m || f >= 1) return final;
    const dec = m[1] ? m[1].length - 1 : 0;
    const v = parseFloat(m[0].replace(/,/g, '')) * f;
    const txt = m[0].includes(',') ? v.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v.toFixed(dec);
    return final.replace(m[0], txt);
  };

  window.setT = function (t) {
    t = clamp(t, 0, total - 1e-4);
    scenes.forEach((s, i) => {
      const lt = t - s.t0;
      let o = lt >= 0 && lt < s.dur ? 1 : 0;
      if (i > 0 && lt >= 0 && lt < X) o = ease(lt / X);
      if (i < scenes.length - 1 && lt >= s.dur && lt < s.dur + X) o = 1; // stay under the next scene while it fades in
      s.el.style.opacity = o;
      s.el.style.visibility = o ? 'visible' : 'hidden';
      s.el.style.zIndex = i + 1;
      const L = clamp(lt, 0, s.dur);
      const k = s.scroll || [[0, 0]];
      let y = k[0][1];
      for (let j = 0; j < k.length - 1; j++) {
        if (L >= k[j][0]) y = k[j][1] + (k[j + 1][1] - k[j][1]) * ease(clamp((L - k[j][0]) / (k[j + 1][0] - k[j][0])));
      }
      const sc = s.el.querySelector('[data-scroll]');
      if (sc) sc.style.transform = `translate3d(0,${-y.toFixed(2)}px,0)`;
      const f = ease(clamp((lt - 0.2) / 1.1));
      s.el.style.setProperty('--in', f.toFixed(4));
      counters.get(s).forEach((c) => { c.el.textContent = countTo(c.final, f); });
      if (s.on) s.on(L, s.el);
    });
  };
  window.setT(0);
};

/* Small seeded generator so sparklines are the same on every render. */
window.rng = function (seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
};
window.spark = function (seed, { w = 240, h = 34, n = 7, color = '#7A6BD0', fill = 'rgba(122,107,208,.22)' } = {}) {
  const r = window.rng(seed);
  const pts = [...Array(n)].map((_, i) => [(i / (n - 1)) * w, h - 3 - r() * (h - 9)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return `<svg class="sp" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${line} L${w} ${h} L0 ${h} Z" fill="${fill}"/><path d="${line}" fill="none" stroke="${color}" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>`;
};
