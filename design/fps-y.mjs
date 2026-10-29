// Frame cost by scroll position (every 300px band), to locate hot spots on any page.
import { chromium } from "playwright";
const [url] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--disable-frame-rate-limit", "--disable-gpu-vsync"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
if (process.env.CSS) await p.addInitScript((c) => addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = c; document.head.append(s); }), process.env.CSS);
if (process.env.NOVIDEO) await p.route(/\.mp4/, (r) => r.abort());
await p.goto(url, { waitUntil: "load" }); await p.waitForTimeout(3000); await p.mouse.move(700, 450);
await p.evaluate(() => { window.__f = []; let l = performance.now(); const t = (n) => { window.__f.push([n - l, scrollY]); l = n; requestAnimationFrame(t); }; requestAnimationFrame(t); });
const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let y = 0; y < total; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); }
const f = await p.evaluate(() => window.__f);
const bands = {};
for (const [d, y] of f) { if (d > 500) continue; const k = Math.floor(y / 300) * 300; (bands[k] ||= []).push(d); }
for (const [k, a] of Object.entries(bands)) { const s = [...a].sort((x, y) => x - y); const over = a.filter((x) => x > 16.9).length; if (over) console.log(String(k).padStart(5), `n=${a.length}`.padEnd(7), `p95=${s[Math.floor(a.length * 0.95)].toFixed(1)}`, `over16=${over}`); }
const where = await p.evaluate(() => [...document.querySelectorAll("header, main > div, main > section, section, figure, footer")].slice(0, 30).map((e) => `${Math.round(e.getBoundingClientRect().top + scrollY)} ${e.tagName.toLowerCase()}.${(e.className || "").toString().split(" ")[0]}`));
console.log(where.join(" | "));
await b.close();
