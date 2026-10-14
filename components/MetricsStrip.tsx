'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
  highlight?: boolean;
}

const metrics: Metric[] = [
  { value: 1000, suffix: '+', label: 'Emails / Day', sub: 'Outbound campaigns at DAM', highlight: true },
  { value: 5, suffix: '%', label: 'Reply Rate', sub: 'Positive email responses' },
  { value: 5, suffix: 'L+/mo', prefix: '₹', label: 'MRR Closed', sub: 'Via LinkedIn outreach', highlight: true },
  { value: 30, suffix: '%', label: 'MTTR Reduction', sub: 'Magpie dashboard · Mars Inc.' },
  { value: 500, suffix: '+', label: 'Startups Researched', sub: 'NASSCOM EdTech analysis' },
  { value: 15, suffix: '+', label: 'Countries', sub: 'Global exposure & adaptability' },
  { value: 3, suffix: '', label: 'Global Markets', sub: 'Integrated into Magpie reporting' },
  { value: 15, suffix: '%', label: 'ML Accuracy Lift', sub: 'LSTM model at TCS', highlight: true },
];

export default function MetricsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4"
        >
          <div
            className="h-px flex-1 max-w-12"
            style={{ background: 'var(--gold)' }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}
          >
            By the numbers
          </span>
          <div
            className="h-px flex-1"
            style={{ background: 'var(--border-subtle)' }}
          />
        </motion.div>
      </div>

      {/* Metrics grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              animate={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  index,
  animate: shouldAnimate,
}: {
  metric: Metric;
  index: number;
  animate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldAnimate && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1.2 + index * 0.05;
      const startTime = performance.now() + index * 80;

      const step = (currentTime: number) => {
        if (currentTime < startTime) {
          requestAnimationFrame(step);
          return;
        }
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        // ease out expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayValue(Math.round(eased * metric.value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [shouldAnimate, metric.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      className="group relative p-5 rounded-xl transition-all duration-300"
      style={{
        background: metric.highlight ? 'rgba(201,169,110,0.05)' : 'var(--bg-card)',
        border: metric.highlight
          ? '1px solid rgba(201,169,110,0.2)'
          : '1px solid var(--border-subtle)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,169,110,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = metric.highlight
          ? 'rgba(201,169,110,0.2)'
          : 'var(--border-subtle)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Index */}
      <div
        className="text-xs mb-3"
        style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Value */}
      <div className="mb-1">
        <span
          className="font-mono-custom leading-none"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: metric.highlight ? 'var(--gold)' : 'var(--cream)',
            fontWeight: 400,
          }}
        >
          {metric.prefix && (
            <span style={{ fontSize: '0.6em', color: 'var(--muted)' }}>{metric.prefix}</span>
          )}
          {displayValue.toLocaleString()}
          <span
            style={{
              fontSize: '0.5em',
              color: metric.highlight ? 'var(--gold)' : 'var(--muted)',
              marginLeft: '2px',
            }}
          >
            {metric.suffix}
          </span>
        </span>
      </div>

      {/* Label */}
      <p
        className="text-sm font-medium mb-1"
        style={{ color: 'var(--cream)' }}
      >
        {metric.label}
      </p>

      {/* Sub */}
      <p className="text-xs leading-snug" style={{ color: 'var(--tertiary)' }}>
        {metric.sub}
      </p>

      {/* Highlight dot */}
      {metric.highlight && (
        <div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--gold)' }}
        />
      )}
    </motion.div>
  );
}
