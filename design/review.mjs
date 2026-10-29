// Capture settled viewport frames of every page type for a visual review.
import { chromium, devices } from "playwright";
const pages = [["home", "/"], ["case-cerno", "/projects/analytics-dashboard/"], ["case-pl", "/projects/pl-dashboard/"], ["websites", "/websites/"], ["site-nandipura", "/websites/nandipura/"]];
const b = await chromium.launch({ channel: "chrome", args: ["--use-angle=metal", "--enable-gpu"] });
for (const [mode, opts, maxFrames] of [["desktop", { viewport: { width: 1440, height: 900 } }, 18], ["mobile", { ...devices["Pixel 7"] }, 10]]) {
  for (const [name, path] of pages) {
    const p = await (await b.newContext(opts)).newPage();
    await p.goto("http://localhost:3320" + path, { waitUntil: "load" }); await p.waitForTimeout(2200);
    const h = p.viewportSize().height; const total = await p.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.max(h * 0.95, total / maxFrames);
    let i = 0;
    for (let y = 0; y < total - 50 && i < maxFrames; y += step) {
      await p.mouse.wheel(0, i === 0 ? 0 : step); await p.waitForTimeout(1300);
      await p.screenshot({ path: `design/review/${mode}-${name}-${String(i++).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
    }
    await p.close();
  }
}
await b.close();
