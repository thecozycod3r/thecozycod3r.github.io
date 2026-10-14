'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const skills = [
  {
    category: 'Growth & Sales',
    color: 'var(--hot)',
    items: ['Apollo', 'Sales Navigator', 'ZAP Mail', 'Sending.ac', 'CRM', 'Cold Calling', 'ICP Frameworks', 'Deal Negotiation'],
  },
  {
    category: 'Data & Analytics',
    color: 'var(--green)',
    items: ['Power BI', 'BigQuery', 'Looker Studio', 'SQL', 'Python', 'PySpark', 'Pandas', 'Demand Forecasting'],
  },
  {
    category: 'Ops & Automation',
    color: 'var(--gold)',
    items: ['Asana', 'Zapier', 'Zoho People', 'NPS Systems', 'Slack Integrations', 'Resource Planning'],
  },
  {
    category: 'Cloud & Engineering',
    color: '#60A5FA',
    items: ['Azure', 'Databricks', 'Google Cloud', 'Supabase', 'React', 'GitHub', 'Kinaxis'],
  },
];

const timeline = [
  { year: '2025–Now', role: 'Founders\' Office Growth Analyst', org: 'Digital Advantage Media', type: 'current' },
  { year: '2023–2025', role: 'Decision Scientist (Contractor at Mars Inc.)', org: 'Mu Sigma', type: 'past' },
  { year: '2022', role: 'ML Intern', org: 'TCS', type: 'past' },
  { year: '2021', role: 'Research Intern', org: 'NASSCOM', type: 'past' },
  { year: '2020', role: 'Intern', org: 'School of Fish Technologies', type: 'past' },
];

export default function BioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  });

  return (
    <section
      ref={ref}
      className="py-24 relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">
          {/* Left: About */}
          <div className="lg:pr-16">
            <motion.div {...stagger(0)} className="mb-10">
              <span
                className="text-xs tracking-[0.3em] uppercase mb-3 block"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}
              >
                About
              </span>
              <h2
                className="font-display leading-tight mb-6"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--cream)', fontWeight: 400 }}
              >
                I build the engine,{' '}
                <em style={{ color: 'var(--gold)' }}>then drive it.</em>
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>
                  I&apos;m a multidisciplinary operator who sits at the intersection of data science,
                  growth, and business operations. Currently building outbound systems, financial
                  models, and client acquisition pipelines at Digital Advantage Media.
                </p>
                <p>
                  Before this, I spent 2+ years as a Decision Scientist at Mu Sigma,
                  embedded with Mars Inc. across Asia, Australia, and Europe — building
                  Power BI dashboards that compressed reporting cycles and reduced operational risk.
                </p>
                <p>
                  I studied Information Engineering at The Chinese University of Hong Kong,
                  and I&apos;ve worked across 3 continents, travelled to 15+ countries, and
                  play competitive tennis and basketball.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div {...stagger(1)}>
              <span
                className="text-xs tracking-[0.3em] uppercase mb-4 block"
                style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Career Timeline
              </span>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[4.5rem] top-0 bottom-0 w-px"
                  style={{ background: 'var(--border-subtle)' }}
                />
                <div className="space-y-0">
                  {timeline.map((entry, i) => (
                    <motion.div
                      key={entry.year}
                      {...stagger(2 + i)}
                      className="flex items-start gap-4 py-3"
                    >
                      <span
                        className="text-xs w-16 shrink-0 mt-0.5 text-right"
                        style={{
                          color: entry.type === 'current' ? 'var(--gold)' : 'var(--tertiary)',
                          fontFamily: 'var(--font-jb-mono)',
                        }}
                      >
                        {entry.year}
                      </span>
                      {/* Dot */}
                      <div className="relative flex items-center justify-center w-2.5 shrink-0 mt-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: entry.type === 'current' ? 'var(--gold)' : 'var(--border)',
                            border: entry.type === 'current' ? '2px solid var(--gold)' : '1px solid var(--border)',
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <p
                          className="text-sm font-medium"
                          style={{ color: entry.type === 'current' ? 'var(--cream)' : 'var(--muted)' }}
                        >
                          {entry.role}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--tertiary)' }}>
                          {entry.org}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block h-full min-h-[400px]"
            style={{ background: 'var(--border-subtle)' }}
          />

          {/* Right: Skills */}
          <div className="lg:pl-16 mt-16 lg:mt-0">
            <motion.div {...stagger(0)}>
              <span
                className="text-xs tracking-[0.3em] uppercase mb-6 block"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Skills
              </span>
              <div className="space-y-6">
                {skills.map((group, gi) => (
                  <motion.div key={group.category} {...stagger(gi + 1)}>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: group.color }}
                      />
                      <span
                        className="text-xs tracking-wider uppercase"
                        style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}
                      >
                        {group.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded-md transition-colors duration-150"
                          style={{
                            color: 'var(--muted)',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-elevated)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Beyond work */}
            <motion.div
              {...stagger(6)}
              className="mt-10 p-5 rounded-xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase mb-3 block"
                style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Beyond Work
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: '🎾', label: 'Tennis', sub: 'Club & uni champion' },
                  { icon: '🏀', label: 'Basketball', sub: 'Captained to championship' },
                  { icon: '🌏', label: '15+ Countries', sub: 'Widely travelled' },
                  { icon: '♠️', label: 'Poker & Card Magic', sub: 'Strategy & risk' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 p-2.5 rounded-lg">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--tertiary)' }}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div {...stagger(7)} className="mt-8 flex gap-3">
              <Link
                href="/projects"
                className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--cream)',
                  background: 'var(--bg-elevated)',
                }}
              >
                View All Projects
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ background: 'var(--gold)', color: 'var(--bg)' }}
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
