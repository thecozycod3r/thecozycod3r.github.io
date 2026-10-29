// Scroll like a reader, capture frames, collect console errors + basic perf.
import { chromium, devices } from "playwright";
const [base = "http://localhost:3320", label = "pf", mode = "desktop", path = "/"] = process.argv.slice(2);
const b = await chromium.launch({ args: ["--use-gl=angle", "--enable-webgl", "--ignore-gpu-blocklist"] });
const ctx = mode === "mobile" ? await b.newContext({ ...devices["Pixel 7"] }) : await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on("console", m => m.type() === "error" && errs.push(m.text())); p.on("pageerror", e => errs.push(String(e)));
await p.goto(base + path, { waitUntil: "load" }); await p.waitForTimeout(2500);
const h = p.viewportSize().height;
const total = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total && i < 40; y += h * 0.9) {
  await p.mouse.wheel(0, i === 0 ? 0 : h * 0.9); await p.waitForTimeout(700);
  await p.screenshot({ path: `design/shots/${label}-${mode}-${String(i++).padStart(2, "0")}.png` });
}
const info = await p.evaluate(() => ({ canvas: !!document.querySelector("canvas") && getComputedStyle(document.querySelector("canvas")).opacity, overflow: document.documentElement.scrollWidth > innerWidth, height: document.documentElement.scrollHeight }));
console.log(i, "frames", info, "errors:", errs.slice(0, 5));
await b.close();
