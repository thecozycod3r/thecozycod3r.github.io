import { chromium, devices } from "playwright";
const pages = ["/", "/projects/analytics-dashboard/", "/projects/pl-dashboard/", "/projects/social-media-tool/", "/projects/arthur/", "/websites/", "/websites/nandipura/"];
const b = await chromium.launch();
for (const pg of pages) {
  const out = { pg };
  for (const [name, opts] of [["noJs", { ...devices["Pixel 7"], javaScriptEnabled: false }], ["reduced", { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }], ["normal", { ...devices["Pixel 7"] }]]) {
    const ctx = await b.newContext(opts); const p = await ctx.newPage(); const errs = [];
    p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await p.goto("http://localhost:3320" + pg, { waitUntil: "load" }); await p.waitForTimeout(1200);
    const loc = p.locator("main h1, main h2, main h3, main p"); const n = await loc.count(); let hid = 0;
    for (let i = 0; i < n; i += Math.max(1, Math.floor(n / 40))) { const el = loc.nth(i); await el.evaluate((e) => e.scrollIntoView({ block: "center" })); await p.waitForTimeout(40);
      const o = await el.evaluate((e) => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; }); if (o < 0.5) hid++; }
    out[name] = `${hid} hidden` + (name === "normal" ? `, overflow=${await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)}, errors=${errs.length}` : "");
    await ctx.close();
  }
  console.log(JSON.stringify(out));
}
await b.close();
