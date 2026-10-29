import { chromium } from "playwright";
const b = await chromium.launch();
for (const pg of ["/", "/projects/analytics-dashboard/", "/websites/nandipura/"]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto("http://localhost:3320" + pg, { waitUntil: "load" }); await p.waitForTimeout(1500);
  // 1) jump straight to the bottom (like an anchor link), then walk back up slowly
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(1500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = H; y >= 0; y -= 700) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); }
  await p.waitForTimeout(1500);
  const hidden = await p.evaluate(() => [...document.querySelectorAll("[data-reveal], [data-split] .w > span, [data-clip]")].filter((e) => {
    const cs = getComputedStyle(e); return +cs.opacity < 0.5 || cs.visibility === "hidden" || (cs.clipPath && cs.clipPath.includes("100%")) || /matrix.*\b(?:1\d\d|[3-9]\d)\b/.test(cs.transform) && e.closest("[data-split]");
  }).length);
  const total = await p.evaluate(() => document.querySelectorAll("[data-reveal], [data-split] .w > span, [data-clip]").length);
  console.log(pg, `after jump-to-bottom + scroll up: ${hidden}/${total} still hidden`);
}
await b.close();
