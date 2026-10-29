'use client';

import { useEffect, useRef } from 'react';

/**
 * Mounts the constellation after the page is idle, so three.js (~150 KB)
 * never competes with the name, the line and the buttons for first paint.
 * Until then — or if WebGL is missing — the CSS glow behind it shows.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let disposed = false;
    let api: { setScroll(p: number): void; dispose(): void } | undefined;
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onScroll = () => api?.setScroll(window.scrollY / window.innerHeight);

    const boot = async () => {
      if (disposed) return;
      try {
        const { createConstellation } = await import('./constellation');
        if (disposed) return;
        api = createConstellation(canvas, { reduce: rmq.matches });
        canvas.style.opacity = '1';
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      } catch {
        /* no WebGL: the gradient stays */
      }
    };

    // The preference can change mid-visit: rebuild the scene in the new mode.
    const onPref = async () => {
      if (!api || disposed) return;
      api.dispose();
      const { createConstellation } = await import('./constellation');
      if (!disposed) api = createConstellation(canvas, { reduce: rmq.matches });
    };
    rmq.addEventListener('change', onPref);

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const id = w.requestIdleCallback ? w.requestIdleCallback(boot, { timeout: 1500 }) : window.setTimeout(boot, 300);

    return () => {
      disposed = true;
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
      window.removeEventListener('scroll', onScroll);
      rmq.removeEventListener('change', onPref);
      api?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1400ms]"
    />
  );
}
