'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import CountUp from './ui/CountUp';
import Magnetic from './ui/Magnetic';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const floatingCards = [
  { label: 'Email Reply Rate', value: '5%', sub: 'Outbound campaigns', pos: 'top-6 -right-4', dur: 4.2 },
  { label: 'MRR Closed', value: '₹5L+', sub: 'Via LinkedIn outreach', pos: 'bottom-16 -left-6', dur: 5.1 },
  { label: 'MTTR Reduction', value: '30%', sub: 'Mars Inc. Magpie', pos: 'bottom-4 right-0', dur: 4.6 },
];

const companies = ['Digital Advantage Media', 'Mars Inc.', 'TCS', 'NASSCOM', 'Mu Sigma'];

function AnimatedWord({
  word,
  baseDelay,
  gold,
}: {
  word: string;
  baseDelay: number;
  gold?: boolean;
}) {
  return (
    <span className="block" aria-label={word}>
      {word.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.1em', marginBottom: '-0.1em', paddingRight: gold ? '0.03em' : undefined }}
          aria-hidden
        >
          <motion.span
            className={`inline-block ${gold ? 'text-gold-shimmer' : ''}`}
            initial={{ y: '110%', rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: baseDelay + i * 0.045, ease }}
            style={gold ? { fontStyle: 'italic', fontWeight: 600 } : { fontWeight: 300, color: 'var(--cream)' }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Aurora backdrop ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="aurora-blob"
          style={{
            width: 640,
            height: 480,
            top: '8%',
            right: '-6%',
            background: 'radial-gradient(circle, rgba(201,169,110,0.14) 0%, transparent 65%)',
            animation: 'aurora-a 16s ease-in-out infinite',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: 520,
            height: 420,
            bottom: '-8%',
            left: '-8%',
            background: 'radial-gradient(circle, rgba(138,110,62,0.12) 0%, transparent 65%)',
            animation: 'aurora-b 20s ease-in-out infinite',
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: 380,
            height: 320,
            top: '35%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(63,191,127,0.05) 0%, transparent 65%)',
            animation: 'aurora-a 24s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--cream) 1px, transparent 1px), linear-gradient(90deg, var(--cream) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 100%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* ── Left: Text ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col">
            {/* Status pill */}
            <motion.div variants={item} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs tracking-wider border backdrop-blur-sm"
                style={{
                  color: 'var(--gold)',
                  borderColor: 'rgba(201,169,110,0.28)',
                  background: 'rgba(201,169,110,0.06)',
                  fontFamily: 'var(--font-jb-mono)',
                  boxShadow: '0 0 24px rgba(201,169,110,0.08) inset',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--green)', animation: 'pulse-dot 2s ease-in-out infinite' }}
                />
                Bangalore · Open to Growth &amp; Founders&apos; Office roles
              </span>
            </motion.div>

            {/* Name — per-letter reveal */}
            <div className="mb-5">
              <h1
                className="font-display leading-[0.9] tracking-tight select-none"
                style={{ fontSize: 'clamp(64px, 10vw, 128px)' }}
              >
                <AnimatedWord word="Dhruv" baseDelay={0.35} />
                <AnimatedWord word="Shricharan" baseDelay={0.6} gold />
              </h1>
            </div>

            {/* Title */}
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <span
                className="text-sm tracking-[0.25em] uppercase"
                style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Founders&apos; Office Growth Analyst
              </span>
              <span className="w-8 hairline-gold" />
              <span
                className="text-sm tracking-[0.25em] uppercase"
                style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Decision Scientist
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-xl md:text-2xl font-display leading-snug mb-9 max-w-xl"
              style={{ color: 'var(--cream)', fontWeight: 300, fontStyle: 'italic' }}
            >
              I run the data, ops, and outbound stack at a 30-person growth agency —{' '}
              <span style={{ color: 'var(--gold)' }}>and built most of it from zero.</span>
            </motion.p>

            {/* Proof strip — animated counters */}
            <motion.div
              variants={item}
              className="mb-10 grid grid-cols-3 max-w-lg rounded-xl overflow-hidden backdrop-blur-sm"
              style={{
                border: '1px solid rgba(201,169,110,0.14)',
                background: 'linear-gradient(180deg, rgba(26,24,21,0.7) 0%, rgba(20,18,16,0.5) 100%)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
              }}
            >
              {[
                { v: '₹5L+', l: 'MRR closed via outbound' },
                { v: '30%', l: 'MTTR cut at Mars Inc.' },
                { v: '5%', l: 'Cold email reply rate' },
              ].map((s, i) => (
                <div
                  key={s.l}
                  className="group px-4 py-4 transition-colors duration-300 hover:bg-[rgba(201,169,110,0.05)]"
                  style={{ borderLeft: i > 0 ? '1px solid rgba(201,169,110,0.1)' : 'none' }}
                >
                  <CountUp
                    value={s.v}
                    delay={0.9 + i * 0.15}
                    className="font-mono-custom text-xl md:text-2xl font-medium leading-none mb-1.5 block"
                    style={{ color: 'var(--gold)' }}
                  />
                  <div
                    className="text-[10px] leading-tight"
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/projects"
                  className="btn-shine group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #E4C07A 0%, #C9A96E 55%, #B8924A 100%)',
                    color: 'var(--bg)',
                    boxShadow: '0 8px 28px rgba(201,169,110,0.25), 0 0 0 1px rgba(228,192,122,0.4) inset',
                  }}
                >
                  View Projects
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <Magnetic>
                <a
                  href="/Dhruv_Shricharan_Resume.pdf"
                  download="Dhruv_Shricharan_Resume.pdf"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm"
                  style={{
                    color: 'var(--cream)',
                    border: '1px solid var(--border)',
                    background: 'rgba(20,18,16,0.6)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(201,169,110,0.45)';
                    el.style.boxShadow = '0 0 24px rgba(201,169,110,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--border)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Download size={14} />
                  Resume
                </a>
              </Magnetic>
            </motion.div>

            {/* Companies — marquee */}
            <motion.div variants={item} className="mt-12 flex items-center gap-5">
              <span
                className="text-xs tracking-widest uppercase shrink-0"
                style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Experience at
              </span>
              <div className="marquee-mask max-w-sm">
                <div className="marquee-track" style={{ ['--marquee-duration' as string]: '22s' }}>
                  {[...companies, ...companies].map((co, i) => (
                    <span key={i} className="flex items-center shrink-0">
                      <span className="text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                        {co}
                      </span>
                      <span
                        className="mx-4 w-1 h-1 rounded-full shrink-0"
                        style={{ background: 'var(--gold-dim)' }}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="relative hidden lg:flex justify-center"
          >
            <TiltPhoto />

            {/* Floating metric cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5, ease }}
                className={`absolute ${card.pos} z-10`}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: card.dur, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FloatingCard {...card} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
        />
      </motion.div>
    </section>
  );
}

function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 140, damping: 18 });

  return (
    <div
      style={{ perspective: 1100 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <motion.div
        ref={ref}
        className="relative"
        style={{ width: 360, height: 440, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      >
        {/* Rotating conic glow behind the frame */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: -60,
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(201,169,110,0.45) 55deg, transparent 130deg, transparent 200deg, rgba(201,169,110,0.22) 265deg, transparent 330deg)',
            filter: 'blur(36px)',
            animation: 'spin-slow 14s linear infinite',
            opacity: 0.7,
          }}
        />

        {/* Outer decorative border */}
        <div
          className="absolute"
          style={{ inset: '-9px', border: '1px solid rgba(201,169,110,0.25)', borderRadius: '3px' }}
        />

        {/* Corner accents */}
        <CornerAccent position="top-0 left-0" rotate="0" />
        <CornerAccent position="top-0 right-0" rotate="90" />
        <CornerAccent position="bottom-0 left-0" rotate="270" />
        <CornerAccent position="bottom-0 right-0" rotate="180" />

        {/* Main frame */}
        <div
          className="group relative w-full h-full overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '3px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          <Image
            src="/dp.jpeg"
            alt="Dhruv Shricharan"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ objectPosition: 'center center' }}
            priority
          />

          {/* Sheen sweep on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, transparent 30%, rgba(237,232,220,0.08) 45%, transparent 60%)',
            }}
          />

          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 pt-10 pb-3"
            style={{ background: 'linear-gradient(to top, rgba(11,10,8,0.92) 0%, transparent 100%)' }}
          >
            <p className="font-display text-lg" style={{ color: 'var(--cream)', fontWeight: 400 }}>
              Dhruv Shricharan
            </p>
            <p className="text-xs tracking-wider" style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}>
              Growth · Data · Operations
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CornerAccent({ position, rotate }: { position: string; rotate: string }) {
  return (
    <div className={`absolute ${position} w-5 h-5 z-10`} style={{ transform: `rotate(${rotate}deg)` }}>
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,169,110,0.6)' }}
      />
      <div
        className="absolute top-0 left-0 w-px h-full"
        style={{ background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,169,110,0.6)' }}
      />
    </div>
  );
}

function FloatingCard({ label, value, sub }: { label: string; value: string; sub: string; pos: string; dur: number }) {
  return (
    <div
      className="px-3.5 py-3 rounded-xl min-w-[128px]"
      style={{
        background: 'rgba(20,18,16,0.78)',
        border: '1px solid rgba(201,169,110,0.18)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.02) inset',
      }}
    >
      <p className="text-[10px] tracking-wide mb-1" style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}>
        {label}
      </p>
      <CountUp value={value} delay={1.2} className="font-mono-custom text-xl font-medium block" style={{ color: 'var(--gold)' }} />
      <p className="text-[11px] mt-0.5" style={{ color: 'var(--tertiary)' }}>
        {sub}
      </p>
    </div>
  );
}
