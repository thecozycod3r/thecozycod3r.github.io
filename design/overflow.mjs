import { chromium, devices } from "playwright";
const b = await chromium.launch(); const p = await (await b.newContext({ ...devices["Pixel 7"] })).newPage();
await p.goto("http://localhost:3320" + (process.argv[2] || "/"), { waitUntil: "load" }); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => {
  const W = document.documentElement.clientWidth, out = [];
  for (const e of document.querySelectorAll("body *")) {
    const r = e.getBoundingClientRect();
    if (r.right > W + 1 && r.width > 0 && !e.closest(".marquee-wrap") && getComputedStyle(e).position !== "fixed")
      out.push(`${e.tagName.toLowerCase()}.${String(e.className).slice(0, 60)} right=${Math.round(r.right)} w=${Math.round(r.width)} text="${(e.textContent || "").trim().slice(0, 30)}"`);
  }
  return `W=${W} scrollW=${document.documentElement.scrollWidth}\n` + out.slice(0, 12).join("\n");
}));
await b.close();
