import { chromium, devices } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const shots = [["/projects/analytics-dashboard/", "text=Data Flow", "d"], ["/projects/asana-ops/", "text=The employee experience", "d"], ["/projects/asana-ops/", "text=The employee experience", "m"], ["/", "[data-statement]", "d"], ["/projects/arthur/", "text=Assistants want everything", "d"]];
let n = 0;
for (const [path, sel, mode] of shots) {
  const p = await (await b.newContext(mode === "m" ? { ...devices["Pixel 7"] } : { viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto("http://localhost:3320" + path, { waitUntil: "load" }); await p.waitForTimeout(800);
  const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.mouse.wheel(0, 200); await p.waitForTimeout(1600);
  await p.screenshot({ path: `/tmp/spot-${n++}.png` }); await p.close();
}
await b.close();
