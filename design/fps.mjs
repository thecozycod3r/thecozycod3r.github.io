// Frame-time probe on the real GPU (Chrome + Metal), retina 1440x900.
import { chromium } from "playwright";
const [url = "http://localhost:3320/", label = "run"] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--disable-frame-rate-limit", "--disable-gpu-vsync"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
await p.goto(url, { waitUntil: "load" }); await p.waitForTimeout(3000);
await p.mouse.move(700, 450);
await p.evaluate(() => {
  window.__f = []; let last = performance.now();
  const tick = (t) => { window.__f.push([t - last, scrollY]); last = t; requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  window.__lt = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt += e.duration; }).observe({ type: "longtask", buffered: false });
});
const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let y = 0; y < total; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); if (y % 600 === 0) await p.mouse.move(500 + (y % 400), 300 + (y % 300)); }
await p.waitForTimeout(800);
const { f, lt, sections } = await p.evaluate(() => ({
  f: window.__f, lt: Math.round(window.__lt),
  sections: [...document.querySelectorAll("main > section, main > .pin-spacer")].map((s) => { const r = s.getBoundingClientRect(); const sec = s.matches("section") ? s : s.querySelector("section"); return [sec?.id || sec?.getAttribute("aria-label") || sec?.className.split(" ").find(c => c.startsWith("data")) || (sec?.hasAttribute("data-flow") ? "flow" : sec?.hasAttribute("data-reel") ? "reel" : "sec"), Math.round(r.top + scrollY), Math.round(r.bottom + scrollY)]; }),
}));
const ms = f.map((x) => x[0]).filter((x) => x < 500);
const pct = (a, q) => [...a].sort((x, y) => x - y)[Math.floor(a.length * q)];
const summary = (a) => ({ frames: a.length, p50: +pct(a, 0.5).toFixed(1), p95: +pct(a, 0.95).toFixed(1), fps: Math.round(1000 / (a.reduce((s, x) => s + x, 0) / a.length)), over16: Math.round((100 * a.filter((x) => x > 16.9).length) / a.length) + "%", over33: Math.round((100 * a.filter((x) => x > 33.4).length) / a.length) + "%" });
console.log(label, "ALL", summary(ms), "longtask ms", lt);
let idx = 0;
for (const [name, top, bot] of sections) {
  const a = f.filter(([d, y]) => d < 500 && y + 450 >= top && y + 450 < bot).map((x) => x[0]);
  if (a.length > 5) console.log(`  ${String(idx++).padStart(2)} ${name.padEnd(12).slice(0, 12)}`, summary(a));
}
await b.close();
