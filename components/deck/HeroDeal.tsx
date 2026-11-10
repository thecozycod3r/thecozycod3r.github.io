'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * The opening: a deck drops onto the table, is ribbon-spread across the
 * screen, turned over in one wave while the name rises, then gathered. Seven
 * cards fan out as the hand of shipped work; the rest square up beside the
 * name with the court card turned face up on top.
 *
 * The finished layout lives entirely in CSS. This only moves cards *from*
 * somewhere else to where the stylesheet already puts them, then clears every
 * inline style it set, so resizing afterwards and visiting without JavaScript
 * or with reduced motion all show the same resting hand.
 */
export default function HeroDeal() {
  useEffect(() => {
    const root = document.documentElement;
    const release = () => root.classList.remove('deal-pending');
    const stage = document.querySelector<HTMLElement>('[data-hero]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!stage || reduce || window.scrollY > window.innerHeight * 0.5) {
      release();
      return;
    }

    let ctx: gsap.Context | undefined;
    let started = false;
    let dead = false;
    let tl: gsap.core.Timeline | undefined;
    const downCards: HTMLElement[] = [];

    const settle = () => {
      downCards.forEach((c) => c.classList.add('is-down'));
      stage.querySelectorAll<HTMLElement>('.hc-tilt').forEach((t) => t.style.removeProperty('--a'));
      release();
    };

    const start = () => {
      if (started || dead) return;
      started = true;

      ctx = gsap.context(() => {
        type Part = { el: HTMLElement; role: string; mv: HTMLElement; tilt: HTMLElement; flip: HTMLElement; x0: number; y0: number; w: number };
        const els = gsap.utils.toArray<HTMLElement>('.hc', stage);
        const hands = els.filter((e) => e.dataset.role === 'hand');
        const step = parseFloat(getComputedStyle(stage).getPropertyValue('--step')) || 8;

        // Face-down cards rest on a CSS rotateY; hand that over to GSAP for the run.
        stage.querySelectorAll<HTMLElement>('.pc.is-down').forEach((c) => { downCards.push(c); c.classList.remove('is-down'); });
        // Close the fan so each hand card can be measured, and flown, unrotated.
        hands.forEach((e) => e.querySelector<HTMLElement>('.hc-tilt')!.style.setProperty('--a', '0deg'));

        const parts: Part[] = els.map((el) => {
          const mv = el.querySelector<HTMLElement>('.hc-move')!;
          const r = mv.getBoundingClientRect();
          return {
            el, role: el.dataset.role!, mv,
            tilt: el.querySelector<HTMLElement>('.hc-tilt')!,
            flip: el.querySelector<HTMLElement>('.pc-flip')!,
            x0: r.left + r.width / 2, y0: r.top + r.height / 2, w: r.width,
          };
        });
        const hand = parts.filter((p) => p.role === 'hand');
        const rest = parts.filter((p) => p.role === 'rest');
        const court = parts.find((p) => p.role === 'court')!;

        // Ribbon order: a project card every third place, the court card mid-deck.
        const others = [...rest.slice(0, 7), court, ...rest.slice(7)];
        const ribbon: Part[] = [];
        for (let i = 0, h = 0, o = 0; i < parts.length; i++) {
          if ((i % 3 === 2 && h < hand.length) || o >= others.length) ribbon.push(hand[h++]);
          else ribbon.push(others[o++]);
        }
        const N = ribbon.length;
        const S = hand[0].w;
        const sr = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        const nameBottom = stage.querySelector('.hero-name')!.getBoundingClientRect().bottom;
        const cx = sr.left + sr.width / 2;
        const cy = Math.min(nameBottom + S * 0.86, vh - S * 0.9);
        const pad = Math.max(S * 0.62, sr.width * 0.06);
        const rx = (i: number) => sr.left + pad + (sr.width - pad * 2) * (i / (N - 1));
        const ry = (i: number) => cy - Math.sin((i / (N - 1)) * Math.PI) * S * 0.2;

        const mvs = ribbon.map((p) => p.mv);
        const flips = ribbon.map((p) => p.flip);
        const chars = gsap.utils.toArray<HTMLElement>('.rise > span', stage);
        const late = gsap.utils.toArray<HTMLElement>('[data-late]', stage);

        // Everything starts squared up as one deck in the middle of the table.
        gsap.set(ribbon.map((p) => p.el), { zIndex: (i) => 10 + i });
        gsap.set(mvs, {
          x: (i) => cx - ribbon[i].x0,
          y: (i) => cy - ribbon[i].y0 - i * 0.8,
          scale: (i) => S / ribbon[i].w,
          rotation: 0,
        });
        gsap.set(flips, { rotationY: 180, transformPerspective: 1100 });
        gsap.set(chars, { yPercent: 112, y: 0 });
        gsap.set(late, { autoAlpha: 0, y: 14 });
        gsap.set(els, { visibility: 'visible' });
        release();

        const finish = () => {
          gsap.set(els, { clearProps: 'zIndex,visibility' });
          gsap.set([...mvs, ...flips, ...chars, ...late], { clearProps: 'all' });
          settle();
          try { sessionStorage.setItem('dealt', '1'); } catch { /* private mode */ }
        };

        tl = gsap.timeline({ onComplete: finish });

        // 1. The deck lands.
        tl.from(mvs, {
          y: `-=${cy + S * 1.6}`,
          rotation: (i) => (i % 2 ? 26 : -22),
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.009,
        }, 0)
          .to(mvs, { y: '+=5', duration: 0.07, ease: 'power1.out', yoyo: true, repeat: 1 }, '>-0.04')

          // 2. Ribbon spread.
          .addLabel('ribbon', '>+0.06')
          .to(mvs, {
            x: (i) => rx(i) - ribbon[i].x0,
            y: (i) => ry(i) - ribbon[i].y0,
            rotation: (i) => -9 + 18 * (i / (N - 1)),
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.022,
          }, 'ribbon')

          // 3. The turnover, in one wave; the name comes up underneath it.
          .addLabel('wave', 'ribbon+=0.72')
          .to(flips, { rotationY: 0, duration: 0.5, ease: 'power2.inOut', stagger: 0.03 }, 'wave')
          .to(mvs, { y: `-=${S * 0.2}`, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.03 }, 'wave')
          .to(chars, { yPercent: 0, duration: 0.95, ease: 'expo.out', stagger: 0.034 }, 'wave-=0.05')

          // 4. Gather: the hand to its corner, the rest back to the pile.
          .addLabel('home', 'wave+=1.22')
          .to(hand.map((p) => p.mv), { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.7, ease: 'power3.inOut', stagger: 0.035 }, 'home')
          .to(others.map((p) => p.mv), { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.66, ease: 'power3.inOut', stagger: 0.016 }, 'home')
          .to(others.map((p) => p.flip), { rotationY: 180, duration: 0.5, ease: 'power2.inOut', stagger: 0.016 }, 'home+=0.08')

          // 5. The fan opens.
          .to(hand.map((p) => p.tilt), {
            '--a': (i: number) => `${(i - 3) * step}deg`,
            duration: 0.95,
            ease: 'back.out(1.5)',
            stagger: { each: 0.045, from: 'center' },
          }, 'home+=0.62')
          .to(late, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09 }, 'home+=0.5')

          // 6. And the top card of the pile is turned.
          .to(court.mv, { y: -S * 0.22, duration: 0.3, ease: 'power2.out' }, 'home+=0.95')
          .to(court.flip, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' }, 'home+=1.0')
          .to(court.mv, { y: 0, duration: 0.45, ease: 'bounce.out' }, 'home+=1.42');

        let seen = false;
        try { seen = sessionStorage.getItem('dealt') === '1'; } catch { /* private mode */ }
        if (seen) tl.timeScale(1.7);
        // Development only: lets the sequence be scrubbed frame by frame.
        if (process.env.NODE_ENV !== 'production') (window as unknown as { __deal?: gsap.core.Timeline }).__deal = tl;
      }, stage);
    };

    // Measure once the real fonts are in, but never wait long for them.
    const timer = window.setTimeout(start, 900);
    document.fonts?.ready.then(() => requestAnimationFrame(start));

    // A resize mid-deal invalidates every measured position: jump to the end.
    const onResize = () => tl?.progress(1);
    window.addEventListener('resize', onResize);

    return () => {
      dead = true;
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      ctx?.revert();
      settle();
    };
  }, []);

  return null;
}
