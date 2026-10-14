'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import SpotlightCard, { hexToRgb } from '@/components/ui/SpotlightCard';
import CountUp from '@/components/ui/CountUp';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Props {
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export function ProjectSection({ label, title, children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const words = title.split(' ');

  return (
    <div ref={ref} className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay, ease }}
        className="flex items-center gap-4 mb-5"
      >
        <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
          {label}
        </span>
        <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
      </motion.div>

      {/* Per-word masked reveal */}
      <h2
        className="font-display mb-8 leading-[1.08]"
        style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', color: 'var(--cream)', fontWeight: 400 }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{
              paddingBottom: '0.12em',
              marginBottom: '-0.12em',
              marginRight: i < words.length - 1 ? '0.26em' : undefined,
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '112%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: delay + 0.06 + i * 0.045, ease }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StatCard({ value, label, sub, color }: { value: string; label: string; sub?: string; color: string }) {
  return (
    <SpotlightCard
      rgb={hexToRgb(color)}
      bg="var(--bg-card)"
      hoverBg={`${color}0d`}
      className="h-full p-5 rounded-xl cursor-default"
    >
      <CountUp value={value} className="font-mono-custom text-2xl font-medium mb-1 block" style={{ color }} />
      <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--cream)' }}>
        {label}
      </p>
      {sub && (
        <p className="text-xs" style={{ color: 'var(--tertiary)' }}>
          {sub}
        </p>
      )}
    </SpotlightCard>
  );
}

export function FeatureCard({ icon, title, desc, color, bg }: { icon: string; title: string; desc: string; color: string; bg: string }) {
  return (
    <SpotlightCard
      rgb={hexToRgb(color)}
      bg="var(--bg-card)"
      hoverBg={bg}
      className="h-full p-5 rounded-xl cursor-default"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-base mb-4 transition-transform duration-300 hover:scale-110"
        style={{ background: bg, border: `1px solid ${color}33`, boxShadow: `0 0 18px ${color}1a` }}
      >
        {icon}
      </div>
      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--cream)' }}>
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
        {desc}
      </p>
    </SpotlightCard>
  );
}

export function TechBadge({ name, color }: { name: string; color?: string }) {
  return (
    <span
      className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default inline-block hover:-translate-y-0.5"
      style={{
        color: color ?? 'var(--muted)',
        border: `1px solid ${color ? color + '33' : 'var(--border-subtle)'}`,
        background: color ? color + '0d' : 'var(--bg-elevated)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {name}
    </span>
  );
}

export function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
  fit = 'cover',
  light = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  fit?: 'cover' | 'contain';
  light?: boolean;
}) {
  return (
    <div className="mb-3 group">
      <div
        className="rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1"
        style={{
          border: '1px solid var(--border)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#E8432D', opacity: 0.75 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#C9A96E', opacity: 0.75 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#3FBF7F', opacity: 0.75 }} />
          <span
            className="ml-3 text-[10px] tracking-wider truncate"
            style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}
          >
            {alt}
          </span>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            background: light ? '#FFFFFF' : 'var(--bg-elevated)',
            aspectRatio: `${width} / ${height}`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 900px) 100vw, 880px"
            className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} transition-transform duration-700 group-hover:scale-[1.015]`}
          />
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase"
            style={{
              background: 'rgba(11,10,8,0.78)',
              border: '1px solid rgba(201,169,110,0.3)',
              color: 'var(--gold)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--gold)', boxShadow: '0 0 6px var(--gold)' }}
            />
            Live · Confidential blur
          </div>
        </div>
      </div>
      {caption && (
        <p
          className="text-xs leading-snug mt-3"
          style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)', maxWidth: 720 }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

export function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-lg px-2 py-1 -mx-2 transition-colors duration-150"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${color}0a`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          <span
            className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
          />
          <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
