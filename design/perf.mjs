import { chromium, devices } from "playwright";
const base = "http://localhost:3320";
const b = await chromium.launch();
for (const mode of ["mobile", "desktop"]) {
  const ctx = await b.newContext(mode === "mobile" ? { ...devices["Pixel 7"] } : { viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p); await cdp.send("Network.enable");
  const sz = new Map(), ty = new Map();
  cdp.on("Network.responseReceived", e => ty.set(e.requestId, [e.type, e.response.url]));
  cdp.on("Network.loadingFinished", e => sz.set(e.requestId, e.encodedDataLength));
  await p.addInitScript(() => { window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
  await p.goto(base + "/", { waitUntil: "load" }); await p.waitForTimeout(3500);
  const by = {}; let three = 0;
  for (const [id, n] of sz) { const [t, u] = ty.get(id) || ["?", ""]; by[t] = (by[t] || 0) + n; if (/three|constellation/i.test(u)) three += n; }
  const m = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3) }));
  console.log(mode, m, Object.fromEntries(Object.entries(by).map(([k, v]) => [k, Math.round(v / 1024) + "KB"])));
  await ctx.close();
}
const nj = await b.newContext({ ...devices["Pixel 7"], javaScriptEnabled: false }); const p = await nj.newPage();
await p.goto(base + "/", { waitUntil: "load" }); await p.waitForTimeout(1500);
const loc = p.locator("main h1, main h2, main h3, main p, main dt"); const n = await loc.count(); let hid = 0;
for (let i = 0; i < n; i++) { const el = loc.nth(i); await el.evaluate(e => e.scrollIntoView({ block: "center" }));
  const o = await el.evaluate(e => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; }); if (o < 0.5) hid++; }
console.log(`JS off: ${hid}/${n} text elements hidden`);
const rm = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }); const q = await rm.newPage();
await q.goto(base + "/", { waitUntil: "load" }); await q.waitForTimeout(2500);
const l2 = q.locator("main h2, main p"); const n2 = await l2.count(); let h2 = 0;
for (let i = 0; i < n2; i++) { const el = l2.nth(i); await el.evaluate(e => e.scrollIntoView({ block: "center" })); await q.waitForTimeout(30);
  const o = await el.evaluate(e => { let o = 1; for (let x = e; x; x = x.parentElement) o *= +getComputedStyle(x).opacity; return o; }); if (o < 0.5) h2++; }
console.log(`Reduced motion: ${h2}/${n2} hidden; pin-spacers: ${await q.locator(".pin-spacer").count()}`);
await b.close();
