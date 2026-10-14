'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';
import SpotlightCard, { hexToRgb } from './ui/SpotlightCard';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const skillGroups = [
  {
    category: 'Growth & Sales',
    color: '#C9A96E',
    accentBg: 'rgba(201,169,110,0.08)',
    accentBorder: 'rgba(201,169,110,0.25)',
    icon: '↗',
    description: 'Building pipelines, closing deals, enabling teams.',
    skills: ['Apollo', 'LinkedIn Sales Navigator', 'ZAP Mail', 'Sending.ac', 'AmpleLeads', 'BetterContact', 'Cold Calling', 'CRM Management', 'ICP Frameworks', 'Deal Negotiation', 'Contract Drafting', 'Outbound Prospecting'],
  },
  {
    category: 'Data & Analytics',
    color: '#3FBF7F',
    accentBg: 'rgba(63,191,127,0.07)',
    accentBorder: 'rgba(63,191,127,0.22)',
    icon: '◈',
    description: 'Turning raw data into decisions that stick.',
    skills: ['Power BI', 'BigQuery', 'Looker Studio', 'SQL', 'Python', 'PySpark', 'Pandas', 'NumPy', 'Financial Modelling', 'Demand Forecasting', 'Supply Chain Analytics', 'EDA', 'Anomaly Detection'],
  },
  {
    category: 'Ops & Automation',
    color: '#60A5FA',
    accentBg: 'rgba(96,165,250,0.07)',
    accentBorder: 'rgba(96,165,250,0.22)',
    icon: '⟳',
    description: 'Systems that run without you in the room.',
    skills: ['Asana', 'Zapier', 'Zoho People', 'Zoho Payroll', 'Slack Integrations', 'NPS Systems', 'Resource Planning', 'Project Management', 'Agile Sprints'],
  },
  {
    category: 'Cloud & Engineering',
    color: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.07)',
    accentBorder: 'rgba(167,139,250,0.22)',
    icon: '⬡',
    description: 'Infrastructure that scales with the work.',
    skills: ['Azure', 'Databricks', 'Azure Data Factory', 'Google Cloud', 'Supabase', 'Vercel', 'GitHub', 'React', 'ServiceNow', 'Kinaxis', 'Meta API', 'Claude AI'],
  },
  {
    category: 'Delivery & Stakeholders',
    color: '#E8432D',
    accentBg: 'rgba(232,67,45,0.07)',
    accentBorder: 'rgba(232,67,45,0.22)',
    icon: '◎',
    description: 'Shipping things people actually use.',
    skills: ['BRD / FRD Authoring', 'User Stories', 'Cross-functional Alignment', 'Client Presentations', 'Stakeholder Management', 'AI-Assisted Development'],
  },
];

const languages = [
  { lang: 'English', level: 'Fluent', pct: 100 },
  { lang: 'Kannada', level: 'Fluent', pct: 100 },
  { lang: 'Hindi', level: 'Basic', pct: 40 },
  { lang: 'Spanish', level: 'Basic', pct: 35 },
  { lang: 'Mandarin', level: 'Basic', pct: 30 },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Ambient tints */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 8% 0%, rgba(201,169,110,0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 45% at 95% 90%, rgba(96,165,250,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            Skills
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </motion.div>

        <div className="mb-14">
          <TypewriterHeading prefix="The toolkit I bring " emphasis="to every engagement." />
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => {
            const isHovered = hoveredGroup === group.category;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: gi * 0.08, ease }}
              >
                <SpotlightCard
                  rgb={hexToRgb(group.color)}
                  bg="var(--bg-card)"
                  hoverBg={group.accentBg}
                  dimmed={hoveredGroup !== null && !isHovered}
                  className="h-full p-6 rounded-2xl cursor-default"
                  onHoverChange={(h) => setHoveredGroup(h ? group.category : null)}
                >
                  {/* Category header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-base font-mono-custom transition-all duration-300"
                          style={{
                            color: group.color,
                            background: group.accentBg,
                            border: `1px solid ${group.accentBorder}`,
                            boxShadow: isHovered ? `0 0 18px ${group.color}33` : 'none',
                          }}
                        >
                          {group.icon}
                        </span>
                        <h3 className="text-sm font-semibold tracking-wide" style={{ color: 'var(--cream)' }}>
                          {group.category}
                        </h3>
                      </div>
                      <p className="text-xs leading-snug" style={{ color: 'var(--muted)' }}>
                        {group.description}
                      </p>
                    </div>
                    <span
                      className="text-xs tabular-nums ml-3 mt-0.5"
                      style={{ color: group.color, fontFamily: 'var(--font-mono)' }}
                    >
                      {group.skills.length}
                    </span>
                  </div>

                  <div
                    className="h-px mb-4 transition-all duration-300"
                    style={{
                      background: isHovered
                        ? `linear-gradient(90deg, ${group.color}66, transparent)`
                        : 'var(--border-subtle)',
                    }}
                  />

                  {/* Skill chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.025, ease }}
                        className="text-xs px-2.5 py-1 rounded-md transition-all duration-150"
                        style={{
                          color: isHovered ? group.color : 'var(--muted)',
                          border: `1px solid ${isHovered ? group.accentBorder : 'var(--border-subtle)'}`,
                          background: isHovered ? group.accentBg : 'var(--bg-elevated)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}

          {/* Languages card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: skillGroups.length * 0.08, ease }}
          >
            <SpotlightCard
              rgb="201, 169, 110"
              bg="var(--bg-card)"
              hoverBg="rgba(201,169,110,0.05)"
              dimmed={hoveredGroup !== null && hoveredGroup !== 'languages'}
              className="h-full p-6 rounded-2xl cursor-default"
              onHoverChange={(h) => setHoveredGroup(h ? 'languages' : null)}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
                  style={{
                    color: 'var(--gold)',
                    background: 'rgba(201,169,110,0.08)',
                    border: '1px solid rgba(201,169,110,0.25)',
                  }}
                >
                  ◍
                </span>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--cream)' }}>
                  Languages
                </h3>
              </div>
              <div className="h-px mb-4" style={{ background: 'var(--border-subtle)' }} />
              <div className="space-y-3">
                {languages.map((l, li) => (
                  <div key={l.lang}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>
                        {l.lang}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
                        {l.level}
                      </span>
                    </div>
                    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${l.pct}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.4 + li * 0.08, ease }}
                        style={{
                          background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-bright))',
                          boxShadow: '0 0 8px rgba(201,169,110,0.4)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
