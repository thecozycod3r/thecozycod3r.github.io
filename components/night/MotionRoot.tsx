'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Every scroll-driven effect on the home page, wired by data attributes so
 * the sections stay server-rendered and readable without JavaScript.
 *
 * Nothing is hidden in CSS. GSAP sets starting states at runtime, inside a
 * `prefers-reduced-motion: no-preference` media query, so readers who ask for
 * less motion — and pages where JS never runs — see the finished layout.
 *
 * Effects (an explicit, owner-requested exception to the R13 effect budget;
 * see design/design-lock.md): reveals, word lifts, count-ups, the pinned
 * system flow, the horizontal work reel, the scroll-lit statement, the
 * self-drawing timeline, card tilt, magnetic buttons, a custom cursor and a
 * progress hairline. Videos play only while on screen.
 */
export default function MotionRoot() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];
    const mm = gsap.matchMedia();

    // ── Videos: attach src near the viewport, play only while visible ──
    // At most two clips decode at once — the two most visible. Everything
    // else is paused, so the reel never asks the GPU for three 60 fps streams.
    const ratios = new Map<HTMLVideoElement, number>();
    const MAX_PLAYING = 2;
    const arbitrate = () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const ranked = [...ratios.entries()].filter(([, r]) => r > 0.35).sort((a, b) => b[1] - a[1]);
      const winners = new Set(reduce ? [] : ranked.slice(0, MAX_PLAYING).map(([v]) => v));
      ratios.forEach((_, v) => {
        if (winners.has(v)) void v.play().catch(() => {});
        else if (!v.paused) v.pause();
      });
    };
    const vio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && !v.src && v.dataset.src) v.src = v.dataset.src;
          ratios.set(v, e.isIntersecting ? e.intersectionRatio : 0);
        }
        arbitrate();
      },
      { rootMargin: '200px 0px', threshold: [0, 0.35, 0.6, 0.9] },
    );
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-src]');
    // Hover clips (website previews) rest on their poster and play only on
    // hover/focus with a fine pointer; their recordings have dissolves that
    // read as broken in a still frame. Everything else autoplays in view.
    const hoverOff: (() => void)[] = [];
    videos.forEach((v) => {
      if (!v.hasAttribute('data-hover')) return vio.observe(v);
      const card = v.closest<HTMLElement>('a, [data-tilt]') ?? v;
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
      const play = () => {
        if (!fine.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        void v.play().catch(() => {});
      };
      const stop = () => { v.pause(); };
      card.addEventListener('pointerenter', play);
      card.addEventListener('focusin', play);
      card.addEventListener('pointerleave', stop);
      card.addEventListener('focusout', stop);
      hoverOff.push(() => { card.removeEventListener('pointerenter', play); card.removeEventListener('focusin', play); card.removeEventListener('pointerleave', stop); card.removeEventListener('focusout', stop); });
    });
    cleanups.push(() => hoverOff.forEach((f) => f()));
    // Turning reduced motion on mid-visit stops every clip at once.
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onRm = () => rmq.matches && videos.forEach((v) => v.pause());
    rmq.addEventListener('change', onRm);
    cleanups.push(() => { vio.disconnect(); rmq.removeEventListener('change', onRm); });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Progress hairline
      const bar = document.getElementById('progress');
      if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

      // Fade-up reveals, batched. The start state is set here, at runtime, so
      // it is reverted (content visible) if the reader turns on reduced motion.
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      gsap.set('[data-reveal]', desktop ? { y: 40, autoAlpha: 0 } : { y: 14 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 94%',
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: desktop ? 1 : 0.7, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });

      // Headings: words lift out of a mask
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((h) => {
        if (!desktop) return;
        gsap.from(h.querySelectorAll('.w > span'), {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: h, start: 'top 94%', once: true },
        });
      });

      // Count-ups: keep prefix/suffix, count the number in the middle
      const restore: [HTMLElement, string][] = [];
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const raw = el.textContent ?? '';
        const m = raw.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
        if (!m) return;
        const [, pre, num, post] = m;
        const target = parseFloat(num);
        const decimals = num.includes('.') ? num.split('.')[1].length : 0;
        const obj = { v: 0 };
        restore.push([el, raw]);
        el.textContent = `${pre}0${post}`;
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = `${pre}${obj.v.toFixed(decimals)}${post}`),
        });
      });

      // Scroll-lit statement: each word brightens as you read
      gsap.utils.toArray<HTMLElement>('[data-statement]').forEach((s) => {
        gsap.fromTo(
          s.querySelectorAll('.sw'),
          { opacity: 0.16 },
          { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: s, start: 'top 75%', end: 'bottom 45%', scrub: true } },
        );
      });

      // Timeline: the spine draws itself
      gsap.utils.toArray<HTMLElement>('[data-timeline-line]').forEach((l) => {
        gsap.fromTo(l, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: l.parentElement, start: 'top 70%', end: 'bottom 70%', scrub: true } });
      });

      // Image clip reveals
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        if (!desktop) return;
        gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Leaving this mode (reduced motion switched on): put the real numbers back.
      return () => restore.forEach(([el, raw]) => (el.textContent = raw));
    });

    // Desktop-only choreography: pins and horizontal travel
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      // Pinned system flow: stages light up one by one as you scroll
      const flow = document.querySelector<HTMLElement>('[data-flow]');
      if (flow) {
        const stages = flow.querySelectorAll<HTMLElement>('[data-flow-stage]');
        const line = flow.querySelector<HTMLElement>('[data-flow-line]');
        const tl = gsap.timeline({ scrollTrigger: { trigger: flow, start: 'top top', end: `+=${stages.length * 60}%`, pin: true, scrub: 0.6 } });
        stages.forEach((st, i) => {
          const dot = st.querySelector('[data-flow-dot]');
          const nodes = st.querySelectorAll('[data-flow-node]');
          if (dot) tl.to(dot, { backgroundColor: '#FFC21A', scale: 1.35, duration: 0.4 }, i);
          tl.to(nodes, { borderColor: 'rgba(111,137,255,0.85)', y: -4, stagger: 0.08, duration: 0.5 }, i + 0.1);
          if (i > 0) tl.to(stages[i - 1].querySelectorAll('[data-flow-node]'), { y: 0, borderColor: 'rgba(232,235,239,0.16)', duration: 0.5 }, i);
        });
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: stages.length }, 0);
      }

      // Horizontal work reel
      const reel = document.querySelector<HTMLElement>('[data-reel]');
      const track = reel?.querySelector<HTMLElement>('[data-reel-track]');
      if (reel && track) {
        // Horizontal layout exists only while the pin does; otherwise the reel is a grid.
        reel.classList.add('reel-on');
        if (reel.scrollHeight > window.innerHeight + 2) {
          // Too tall to pin without clipping (short laptop screens): keep the grid.
          reel.classList.remove('reel-on');
          return;
        }
        const dist = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: reel, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
      }
      return () => reel?.classList.remove('reel-on');
    });

    // Fine pointers: cursor, magnetic buttons, card tilt
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const ring = document.createElement('div');
      const dot = document.createElement('div');
      ring.id = 'cursor-ring';
      dot.id = 'cursor-dot';
      document.body.append(ring, dot);
      gsap.set([ring, dot], { autoAlpha: 0 });
      let shown = false;
      const onOut = (e: PointerEvent) => { if (!e.relatedTarget) { gsap.to([ring, dot], { autoAlpha: 0, duration: 0.2 }); shown = false; } };
      document.addEventListener('pointerout', onOut);
      const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
      const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
      const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
      const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
      const move = (e: PointerEvent) => {
        if (!shown) { gsap.set([ring, dot], { x: e.clientX, y: e.clientY }); gsap.to([ring, dot], { autoAlpha: 1, duration: 0.2 }); shown = true; }
        rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
        const hot = (e.target as HTMLElement).closest('a, button, [data-tilt]');
        ring.classList.toggle('is-hover', !!hot);
      };
      window.addEventListener('pointermove', move, { passive: true });

      const mags = document.querySelectorAll<HTMLElement>('[data-magnetic]');
      const magOff: (() => void)[] = [];
      mags.forEach((m) => {
        const xTo = gsap.quickTo(m, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(m, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        const onMove = (e: PointerEvent) => {
          const r = m.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const onLeave = () => { xTo(0); yTo(0); };
        m.addEventListener('pointermove', onMove);
        m.addEventListener('pointerleave', onLeave);
        magOff.push(() => { m.removeEventListener('pointermove', onMove); m.removeEventListener('pointerleave', onLeave); });
      });

      const tilts = document.querySelectorAll<HTMLElement>('[data-tilt]');
      const tiltOff: (() => void)[] = [];
      tilts.forEach((t) => {
        // quickTo reuses one tween per axis instead of creating one per pointer event.
        gsap.set(t, { transformPerspective: 900 });
        const rotY = gsap.quickTo(t, 'rotateY', { duration: 0.5, ease: 'power3.out' });
        const rotX = gsap.quickTo(t, 'rotateX', { duration: 0.5, ease: 'power3.out' });
        // The quickTo tweens are created inside this matchMedia callback, so they
        // are owned by its context and reverted with it; the handlers are plain.
        let rect: DOMRect | null = null;
        const onEnter = () => (rect = t.getBoundingClientRect());
        const onMove = (e: PointerEvent) => {
          const r = rect ?? t.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rotY(px * 10);
          rotX(-py * 10);
          t.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
          t.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
        };
        const onLeave = () => {
          rect = null;
          rotY(0);
          rotX(0);
        };
        t.addEventListener('pointerenter', onEnter);
        t.addEventListener('pointermove', onMove);
        t.addEventListener('pointerleave', onLeave);
        tiltOff.push(() => { t.removeEventListener('pointerenter', onEnter); t.removeEventListener('pointermove', onMove); t.removeEventListener('pointerleave', onLeave); });
      });

      return () => {
        window.removeEventListener('pointermove', move);
        document.removeEventListener('pointerout', onOut);
        ring.remove();
        dot.remove();
        magOff.forEach((f) => f());
        tiltOff.forEach((f) => f());
      };
    });

    // Fonts and videos change heights; re-measure pins once everything lands.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      cleanups.forEach((f) => f());
      mm.revert();
    };
  }, []);

  return <div id="progress" aria-hidden />;
}
