'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const companies = [
  {
    name: 'Digital Advantage Media',
    period: 'Oct 2025 — Present',
    role: "Founders' Office Growth Analyst",
    color: '#C9A96E',
    accentBg: 'rgba(201,169,110,0.06)',
    accentBorder: 'rgba(201,169,110,0.2)',
    tag: 'Current',
    headline: 'Built the outbound engine and financial backbone from zero.',
    impacts: [
      { metric: '1,000+', label: 'emails/day', detail: 'Outbound system built end-to-end via ZAP Mail + Sending.ac' },
      { metric: '5%', label: 'reply rate', detail: 'Targeted campaigns converting cold leads to paying clients' },
      { metric: '₹5L+/mo', label: 'MRR closed', detail: 'LinkedIn Sales Navigator outreach on founders\' profiles' },
      { metric: 'Monthly → Weekly', label: 'reporting cycle', detail: 'P&L dashboard in BigQuery + Looker Studio' },
      { metric: '10%+', label: 'cost target', detail: 'Identified key cost-sink areas via centralised opex tracking' },
      { metric: '30+', label: 'qualified prospects', detail: 'CRM pipeline built across 4 industries and geographies' },
    ],
  },
  {
    name: 'Mars Inc. via Mu Sigma',
    period: 'Jul 2023 — Oct 2025',
    role: 'Decision Scientist',
    color: '#3FBF7F',
    accentBg: 'rgba(63,191,127,0.05)',
    accentBorder: 'rgba(63,191,127,0.18)',
    tag: '2yr 3mo',
    headline: 'Supply chain intelligence across Asia, Australia, and Europe.',
    impacts: [
      { metric: '30%', label: 'MTTR reduction', detail: 'Magpie dashboard enabled proactive discrepancy resolution' },
      { metric: '1 hour', label: 'pipeline saved', detail: 'PySpark optimisation in Databricks cut MRP runtime' },
      { metric: '3', label: 'new global markets', detail: 'Integrated into Magpie reporting ecosystem' },
      { metric: '4', label: 'dashboards shipped', detail: 'MRP, Customer MOS, Magpie, Long-Term Demand Planning' },
      { metric: 'Serbia + Croatia', label: 'rollout', detail: 'Customer MOS deployed; JDA → Kinaxis migration' },
      { metric: '3 continents', label: 'stakeholder alignment', detail: 'Asia, Australia, Europe for demand planning' },
    ],
  },
  {
    name: 'TCS',
    period: '2022',
    role: 'ML Intern',
    color: '#60A5FA',
    accentBg: 'rgba(96,165,250,0.05)',
    accentBorder: 'rgba(96,165,250,0.18)',
    tag: 'Internship',
    headline: 'Built predictive models that got adopted in production.',
    impacts: [
      { metric: '15%', label: 'accuracy lift', detail: 'LSTM model for predictive maintenance via feature engineering' },
      { metric: 'Adopted', label: 'by the client', detail: 'Insights decks drove stakeholder buy-in for data models' },
    ],
  },
  {
    name: 'NASSCOM',
    period: '2021',
    role: 'Research Intern',
    color: '#E8432D',
    accentBg: 'rgba(232,67,45,0.05)',
    accentBorder: 'rgba(232,67,45,0.18)',
    tag: 'Internship',
    headline: 'Mapped the Indian AI startup landscape.',
    impacts: [
      { metric: '500+', label: 'startups researched', detail: 'AI/Data Science landscape for EdTech trend analysis' },
      { metric: 'Xperience AI', label: 'events supported', detail: 'Industry-startup collaboration for NASSCOM CoE' },
    ],
  },
];

export default function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            Impact
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="font-display mb-14"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--cream)', fontWeight: 400 }}
        >
          What I&apos;ve actually <em style={{ color: 'var(--gold)' }}>moved the needle on.</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {companies.map((co, i) => (
            <CompanyCard key={co.name} company={co} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyCard({
  company,
  index,
  isInView,
}: {
  company: (typeof companies)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group relative p-6 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid var(--border-subtle)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = `1px solid ${company.accentBorder}`;
        el.style.background = company.accentBg;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px ${company.accentBorder}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = '1px solid var(--border-subtle)';
        el.style.background = 'var(--bg-card)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ background: company.accentBg, color: company.color, border: `1px solid ${company.accentBorder}`, fontFamily: 'var(--font-mono)' }}
            >
              {company.tag}
            </span>
            <span className="text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
              {company.period}
            </span>
          </div>
          <h3 className="text-lg font-medium" style={{ color: 'var(--cream)' }}>
            {company.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{company.role}</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: company.accentBg, border: `1px solid ${company.accentBorder}` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: company.color }} />
        </div>
      </div>

      {/* Headline */}
      <p
        className="text-sm italic font-display mb-5 pb-5"
        style={{ color: 'var(--muted)', fontWeight: 300, borderBottom: '1px solid var(--border-subtle)' }}
      >
        &ldquo;{company.headline}&rdquo;
      </p>

      {/* Impact grid */}
      <div className={`grid gap-3 ${company.impacts.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {company.impacts.map((impact) => (
          <ImpactItem key={impact.metric + impact.label} impact={impact} color={company.color} accentBg={company.accentBg} accentBorder={company.accentBorder} />
        ))}
      </div>
    </motion.div>
  );
}

function ImpactItem({
  impact,
  color,
  accentBg,
  accentBorder,
}: {
  impact: { metric: string; label: string; detail: string };
  color: string;
  accentBg: string;
  accentBorder: string;
}) {
  return (
    <div
      className="group/item p-3 rounded-lg transition-all duration-200 cursor-default"
      style={{ background: 'transparent' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = accentBg;
        el.style.border = `1px solid ${accentBorder}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'transparent';
        el.style.border = '1px solid transparent';
      }}
    >
      <div className="flex items-baseline gap-1.5 mb-0.5">
        <span className="font-mono-custom text-base font-medium" style={{ color }}>
          {impact.metric}
        </span>
        <span className="text-xs" style={{ color: 'var(--muted)' }}>
          {impact.label}
        </span>
      </div>
      <p className="text-xs leading-snug" style={{ color: 'var(--tertiary)' }}>
        {impact.detail}
      </p>
    </div>
  );
}
