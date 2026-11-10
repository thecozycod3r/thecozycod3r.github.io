'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll and pointer motion for every page, wired by data attributes so the
 * sections stay server-rendered. Nothing is hidden in CSS: GSAP sets starting
 * states at runtime, inside a no-preference media query, so readers who ask
 * for less motion (and pages where this never runs) see the finished layout.
 *
 * One idea throughout: cards are dealt, turned, stacked or tilted. No fades
 * on text, no parallax, no counters.
 */
export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];

    // The home page's deal releases the stage itself. Everywhere else it is
    // released here: at once, or as the sub-page entrance below takes over.
    const release = () => document.documentElement.classList.remove('deal-pending');
    const subhero = document.querySelector<HTMLElement>('[data-subhero]');
    if (!document.querySelector('[data-hero]') && !subhero) release();

    // ── Footage: attach the file near the viewport, play only on screen,
    //    and never decode more than two clips at once.
    const reduceQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Every clip ships twice: the 3840-wide film, and a 1280-wide `-sm` copy
    // for screens that could not show the difference (or asked to save data).
    const sourceFor = (v: HTMLVideoElement) => {
      const full = v.dataset.src!;
      const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      const sharp = window.innerWidth * (window.devicePixelRatio || 1) >= 1700 && !saver;
      return sharp ? full : full.replace(/\.mp4$/, '-sm.mp4');
    };
    const ratios = new Map<HTMLVideoElement, number>();
    const arbitrate = () => {
      const ranked = [...ratios.entries()].filter(([, r]) => r > 0.35).sort((a, b) => b[1] - a[1]);
      const winners = new Set(reduceQ.matches ? [] : ranked.slice(0, 2).map(([v]) => v));
      ratios.forEach((_, v) => {
        if (winners.has(v)) void v.play().catch(() => {});
        else if (!v.paused) v.pause();
      });
    };
    const vio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !v.src && v.dataset.src) v.src = sourceFor(v);
          ratios.set(v, e.isIntersecting ? e.intersectionRatio : 0);
        }
        arbitrate();
      },
      { rootMargin: '200px 0px', threshold: [0, 0.35, 0.6, 0.9] },
    );
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-src]');
    videos.forEach((v) => {
      if (!v.hasAttribute('data-hover')) return vio.observe(v);
      // Website previews rest on their poster and play on hover or focus.
      const card = v.closest<HTMLElement>('a') ?? v;
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
      const play = () => {
        if (!fine.matches || reduceQ.matches) return;
        if (!v.src && v.dataset.src) v.src = sourceFor(v);
        void v.play().catch(() => {});
      };
      const stop = () => v.pause();
      card.addEventListener('pointerenter', play);
      card.addEventListener('focusin', play);
      card.addEventListener('pointerleave', stop);
      card.addEventListener('focusout', stop);
      cleanups.push(() => {
        card.removeEventListener('pointerenter', play);
        card.removeEventListener('focusin', play);
        card.removeEventListener('pointerleave', stop);
        card.removeEventListener('focusout', stop);
      });
    });
    const onReduce = () => reduceQ.matches && videos.forEach((v) => v.pause());
    reduceQ.addEventListener('change', onReduce);
    cleanups.push(() => { vio.disconnect(); reduceQ.removeEventListener('change', onReduce); });

    const mm = gsap.matchMedia();

    // ── Sub-page entrance: the title comes up, and the page's card is drawn
    //    from the pile, thrown in face down and turned over where it lands.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!subhero || window.scrollY > window.innerHeight * 0.5) return release();
      const words = subhero.querySelectorAll<HTMLElement>('.rise > span');
      const late = subhero.querySelectorAll<HTMLElement>('[data-late]');
      const drawn = subhero.querySelector<HTMLElement>('[data-draw]');
      const flip = drawn?.querySelector<HTMLElement>('.pc-flip');
      const under = subhero.querySelector<HTMLElement>('.sub-under');
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from(words, { yPercent: 112, duration: 0.95, stagger: 0.09, clearProps: 'transform' }, 0)
        .from(late, { autoAlpha: 0, y: 14, duration: 0.7, ease: 'power3.out', clearProps: 'opacity,visibility,transform' }, 0.3);
      if (drawn && flip && under) {
        tl.from(under, { x: () => window.innerWidth * 0.3, y: -160, rotation: 70, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from(drawn, { x: () => window.innerWidth * 0.34, y: -220, rotation: 150, duration: 0.95 }, 0.22)
          .from(flip, { rotationY: 180, transformPerspective: 1000, duration: 0.6, ease: 'power2.inOut', clearProps: 'transform' }, 0.72)
          .to(drawn, { y: -12, duration: 0.24, ease: 'power2.out', yoyo: true, repeat: 1 }, 0.72)
          // Hand the resting pose back to the stylesheet, so it follows a resize.
          .set([under, drawn], { clearProps: 'all' });
      }
      release();
    });
    // Reduced motion never runs the entrance; make sure nothing stays held.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) release();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const offs: (() => void)[] = [];

      // ── Cards inside the long read are dealt in as their row arrives:
      //    the steps of a process, the results, the rest of the hand.
      const rows = new Map<Element, HTMLElement[]>();
      gsap.utils.toArray<HTMLElement>('.flow-card, .stat, .more-row > li').forEach((c) => {
        const row = c.parentElement!;
        rows.set(row, [...(rows.get(row) ?? []), c]);
      });
      rows.forEach((cards, row) => {
        gsap.from(cards, {
          x: () => -window.innerWidth * 0.3,
          y: -50,
          rotation: -34,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.07,
          clearProps: 'transform,opacity,visibility',
          // The last row on a page may never climb far up a tall screen.
          scrollTrigger: { trigger: row, start: row.classList.contains('more-row') ? 'top 99%' : 'top 86%', once: true },
        });
      });

      // ── Each section's rank card is put down as the section arrives.
      gsap.utils.toArray<HTMLElement>('.rank').forEach((r) => {
        gsap.from(r, {
          y: -46,
          x: -30,
          rotation: -38,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: r.closest('.sec') ?? r, start: 'top 80%', once: true },
        });
      });

      // ── Dealt and turned: the four aces, and any card marked the same way.
      gsap.utils.toArray<HTMLElement>('[data-deal]').forEach((group) => {
        const cards = group.querySelectorAll<HTMLElement>('[data-dealcard]');
        const flips = group.querySelectorAll<HTMLElement>('[data-dealcard] .pc-flip');
        gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 76%', once: true } })
          .from(cards, {
            x: () => -window.innerWidth * 0.45,
            y: -90,
            rotation: -80,
            autoAlpha: 0,
            duration: 0.95,
            ease: 'expo.out',
            stagger: 0.13,
          })
          .from(flips, { rotationY: 180, transformPerspective: 900, duration: 0.7, ease: 'power2.inOut', stagger: 0.13, clearProps: 'transform' }, 0.3);
      });

      // ── Pitched across the table at the contact section.
      const scatter = document.querySelector<HTMLElement>('[data-scatter]');
      if (scatter) {
        gsap.from(scatter.querySelectorAll('[data-dealt]'), {
          x: () => -window.innerWidth * 0.7,
          y: () => window.innerHeight * 0.5,
          rotation: -260,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.11,
          scrollTrigger: { trigger: scatter, start: 'top 68%', once: true },
        });
      }

      // ── A single card set down: sub-page footage, the "next" card.
      gsap.utils.toArray<HTMLElement>('[data-setdown]').forEach((el) => {
        gsap.from(el, {
          y: 90,
          rotation: -3.5,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      // ── The portrait card leans toward the pointer.
      gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((el) => {
        const host = el.parentElement!;
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          if (e.pointerType !== 'mouse') return;
          const r = host.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 22);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 16);
        };
        const leave = () => { rx(0); ry(0); };
        host.addEventListener('pointermove', move);
        host.addEventListener('pointerleave', leave);
        offs.push(() => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); });
      });
      return () => offs.forEach((f) => f());
    });

    // ── The websites fan opens from a squared pile (wide screens only).
    mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const row = document.querySelector<HTMLElement>('[data-spread]');
      if (!row) return;
      const sites = gsap.utils.toArray<HTMLElement>('.site', row);
      const mid = (sites.length - 1) / 2;
      gsap.from(sites, {
        x: (i) => (mid - i) * sites[0].offsetWidth * 0.86,
        y: 70,
        rotation: (i) => (mid - i) * 5,
        duration: 1.15,
        ease: 'expo.out',
        stagger: { each: 0.05, from: 'center' },
        clearProps: 'transform',
        scrollTrigger: { trigger: row, start: 'top 80%', once: true },
      });
    });

    // ── Work: each card shrinks a touch as the next one is laid over it.
    mm.add('(min-width: 960px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)', () => {
      const jobs = gsap.utils.toArray<HTMLElement>('.job');
      jobs.forEach((job, i) => {
        const next = jobs[i + 1];
        if (!next) return;
        gsap.to(job, {
          scale: 0.945,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${78 + (i + 1) * 13}px`, scrub: true },
        });
      });
    });

    return () => {
      cleanups.forEach((f) => f());
      mm.revert();
    };
  }, []);

  return null;
}
