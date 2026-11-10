// Renders one footage page to film, frame by frame.
//   PLAYWRIGHT=/path/to/playwright-core/index.mjs node footage/render.mjs cerno [fps]
// Writes public/media/<name>.mp4 (3840×2400), <name>-sm.mp4 (1280×800) and
// public/media/posters/<name>.jpg. Needs ffmpeg on the PATH.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT || 'playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const media = path.join(here, '..', 'public', 'media');
const [name, fpsArg, posterAt] = process.argv.slice(2);
const fps = +(fpsArg || 60);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 3 });
page.on('pageerror', (e) => console.error('PAGE ERROR', e.message));
await page.goto('file://' + path.join(here, name + '.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);
const dur = await page.evaluate(() => window.DUR);
const frames = Math.round(dur * fps);

const ff = spawn('ffmpeg', [
  '-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', 'pipe:0',
  '-filter_complex', '[0:v]split=2[a][b];[b]scale=1280:800:flags=lanczos[s]',
  '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-g', String(fps * 2), '-movflags', '+faststart', path.join(media, name + '.mp4'),
  '-map', '[s]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p', '-g', String(fps * 2), '-movflags', '+faststart', path.join(media, name + '-sm.mp4'),
], { stdio: ['pipe', 'inherit', 'inherit'] });

const draw = (t) => page.evaluate((tt) => new Promise((r) => { window.setT(tt); requestAnimationFrame(() => requestAnimationFrame(r)); }), t);
for (let i = 0; i < frames; i++) {
  await draw(i / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 96 });
  if (!ff.stdin.write(buf)) await once(ff.stdin, 'drain');
  if (i % 120 === 0) console.log(name, `${i}/${frames}`);
}
ff.stdin.end();
await once(ff, 'close');

// Poster: a still chosen to read well small.
await draw(+(posterAt || 2.2));
await page.screenshot({ type: 'jpeg', quality: 86, path: path.join(media, 'posters', name + '.jpg') });
console.log(name, 'done', { dur, frames });
await browser.close();
