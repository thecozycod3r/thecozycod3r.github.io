// Films a public web page scrolling, frame by frame, at 3840×2400.
//   PLAYWRIGHT=/path/to/playwright-core/index.mjs node footage/capture.mjs site-yercaud
// Clips are described in captures.json. Only public pages belong here: anything
// behind a login is rebuilt with invented data as a footage/*.html page instead.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(here, '..', 'public');
const name = process.argv[2];
const clip = JSON.parse(fs.readFileSync(path.join(here, 'captures.json'), 'utf8'))[name];
if (!clip) throw new Error('No clip called ' + name);
const fps = 60;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 3 });

const ff = spawn('ffmpeg', [
  '-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', 'pipe:0',
  '-filter_complex', '[0:v]split=2[a][b];[b]scale=1280:800:flags=lanczos[s]',
  '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', process.env.CRF || '25', '-pix_fmt', 'yuv420p', '-g', String(fps * 2), '-movflags', '+faststart', path.join(pub, 'media', name + '.mp4'),
  '-map', '[s]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p', '-g', String(fps * 2), '-movflags', '+faststart', path.join(pub, 'media', name + '-sm.mp4'),
], { stdio: ['pipe', 'inherit', 'inherit'] });

let first = true;
for (const seg of clip.segments) {
  await page.goto(seg.url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2500);
  // Walk the page once so lazy images load and one-off reveals have played.
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y <= Math.min(max, 5200); y += 400) { await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(160); }
  await page.evaluate(() => { scrollTo({ top: 0, behavior: 'instant' }); document.querySelectorAll('video').forEach((v) => { v.pause(); }); });
  await page.waitForTimeout(1200);
  if (first) {
    await page.screenshot({ type: 'jpeg', quality: 86, path: path.join(pub, 'media', 'posters', name + '.jpg') });
    if (clip.still) await page.screenshot({ type: 'jpeg', quality: 88, path: path.join(pub, clip.still) });
    first = false;
  }
  const k = seg.scroll.map(([t, y]) => [t, Math.min(y, max)]);
  const frames = Math.round(seg.dur * fps);
  for (let i = 0; i < frames; i++) {
    const t = i / fps;
    let y = k[0][1];
    for (let j = 0; j < k.length - 1; j++) if (t >= k[j][0]) y = k[j][1] + (k[j + 1][1] - k[j][1]) * ease(Math.min(1, (t - k[j][0]) / (k[j + 1][0] - k[j][0])));
    await page.evaluate((v) => new Promise((r) => { scrollTo({ top: v, behavior: 'instant' }); requestAnimationFrame(() => requestAnimationFrame(r)); }), y);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await once(ff.stdin, 'drain');
    if (i % 120 === 0) console.log(name, `${i}/${frames}`, 'max', max);
  }
}
ff.stdin.end();
await once(ff, 'close');
console.log(name, 'done');
await browser.close();
