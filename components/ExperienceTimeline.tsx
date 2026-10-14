'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const experiences = [
  {
    id: 'dam',
    period: 'Oct 2025 — Present',
    role: "Founders' Office Growth Analyst",
    company: 'Digital Advantage Media',
    location: 'Bangalore, India',
    type: 'current',
    tagline: "Built the outbound engine, the ops stack, and the financial brain — from scratch.",
    categories: [
      {
        label: 'Outbound Sales & Pipeline',
        color: '#E8432D',
        points: [
          'Prospected leads via Apollo, AmpleLeads, BetterContact — enriched contact data across target industries.',
          'Set up ZAP Mail + Sending.ac for inbox warmup; ran campaigns sending 1,000+ emails/day with a 5% positive reply rate.',
          'Ran LinkedIn Sales Navigator outreach on founders\' profiles — closed Rs. 5L+/month in MRR.',
          'Drafted client contracts and led deal negotiations through to close.',
          'Built a CRM pipeline of 30+ qualified prospects across 4 industries and geographies.',
        ],
      },
      {
        label: 'Product & Sales Enablement',
        color: '#C9A96E',
        points: [
          'Productised offerings segmented by industry and geography (Real Estate, Hospitality).',
          'Repositioned DAM from "digital marketing agency" to "strategic growth partner" to escape commoditisation.',
          'Developed sales collateral: decks, one-pagers, case studies.',
          'Introduced new products: CRO via conversational AI (WhatsApp + website chatbots), SEO + GEO services.',
        ],
      },
      {
        label: 'Financial Modelling & Reporting',
        color: '#3FBF7F',
        points: [
          'Built a centralised P&L dashboard in BigQuery + Looker Studio tracking actuals vs. forecast, opex ratios, revenue streams.',
          'Compressed the reporting cycle from monthly to weekly insights.',
          'Identified key cost-sink areas; targeting 10%+ cost optimisation.',
        ],
      },
      {
        label: 'Operations & Project Management',
        color: '#60A5FA',
        points: [
          'Audited ops workflows across creatives, Google Ads, Meta Ads, and account management — team was siloed.',
          'Implemented Asana company-wide with auto-assignment, due-date logic, and cross-team visibility.',
          'Built Slack/email notification system triggered by task status changes.',
          'Built Zapier + Asana leave tracker with manager approval flow and calendar view.',
        ],
      },
    ],
    metrics: [
      { value: '1,000+', label: 'Emails / day' },
      { value: '5%', label: 'Reply rate' },
      { value: '₹5L+/mo', label: 'MRR closed' },
    ],
  },
  {
    id: 'mars',
    period: 'Jul 2023 — Oct 2025',
    role: 'Decision Scientist (Contractor at Mars Inc.)',
    company: 'Mu Sigma',
    location: 'Asia · Australia · Europe',
    type: 'past',
    tagline: "Built supply chain intelligence for one of the world's largest FMCG companies — across 3 continents.",
    categories: [
      {
        label: 'MRP Dashboard',
        color: '#C9A96E',
        points: [
          'Power BI dashboard for consumption and demand reports with automated weekly updates.',
          'Added batch logic to match purchase orders with batch details, improving data accuracy.',
          'Reduced pipeline runtime by 1 hour by optimising PySpark code in Databricks.',
        ],
      },
      {
        label: 'Scalable Customer MOS',
        color: '#3FBF7F',
        points: [
          'Enhanced Mars\' customer-order management system with in-transit stock, cover days, and risk flag views.',
          'Optimised React components and SQL Server backend queries.',
          'Rolled out across Serbia and Croatia; migrated workflows from JDA to Kinaxis.',
        ],
      },
      {
        label: 'Magpie — Raws & Packs Dashboard',
        color: '#60A5FA',
        points: [
          'Power BI dashboard for raw material and packaging inventory with real-time stock health visibility.',
          'Reduced MTTR by 30% through proactive discrepancy resolution.',
          'Integrated 3 new global markets into the reporting ecosystem.',
        ],
      },
      {
        label: 'Long-Term Demand Planning',
        color: '#E8432D',
        points: [
          'Financial dashboard tracking NSV trends, YoY product performance, and promotion impact.',
          'Cross-functional stakeholder alignment across Asia, Australia, and Europe.',
          'Authored BRDs, FRDs, and user stories for global rollout.',
        ],
      },
    ],
    metrics: [
      { value: '1 hr', label: 'Pipeline saved' },
      { value: '30%', label: 'MTTR reduction' },
      { value: '3', label: 'New markets' },
    ],
  },
  {
    id: 'tcs',
    period: '2022',
    role: 'ML Intern',
    company: 'Tata Consultancy Services',
    location: 'India',
    type: 'past',
    tagline: 'Built predictive maintenance models that actually got adopted by the client.',
    categories: [
      {
        label: 'Machine Learning',
        color: '#C9A96E',
        points: [
          'Built predictive maintenance models using Python (LSTM neural networks).',
          'Improved model accuracy by 15% through feature engineering and hyperparameter tuning.',
          'Developed client-facing insights decks that drove stakeholder adoption of data models.',
        ],
      },
    ],
    metrics: [{ value: '15%', label: 'Accuracy lift' }],
  },
  {
    id: 'nasscom',
    period: '2021',
    role: 'Research Intern',
    company: 'NASSCOM Centre of Excellence for Data Science',
    location: 'Bangalore, India',
    type: 'past',
    tagline: "Mapped the Indian AI/ML startup landscape for NASSCOM's EdTech research.",
    categories: [
      {
        label: 'Research & Analysis',
        color: '#3FBF7F',
        points: [
          'Researched 500+ AI/Data Science start-ups for EdTech trend analysis.',
          'Supported Xperience AI industry-startup collaboration events.',
          'Produced structured research reports used for NASSCOM sector insights.',
        ],
      },
    ],
    metrics: [{ value: '500+', label: 'Startups mapped' }],
  },
  {
    id: 'sof',
    period: '2020',
    role: 'Intern',
    company: 'School of Fish Technologies',
    location: 'Bangalore, India',
    type: 'past',
    tagline: 'First industry exposure — data, UX testing, and shipping real feedback loops.',
    categories: [
      {
        label: 'Data & Product',
        color: '#60A5FA',
        points: [
          'Managed B2C and B2B data pipelines using SQL.',
          'Refined UI/UX by conducting beta testing and integrating customer feedback into the product roadmap.',
        ],
      },
    ],
    metrics: [],
  },
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const spineScaleY = useSpring(
    useTransform(scrollYProgress, [0, 0.95], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Ambient glow that moves with scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [
              'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 70%)',
              'radial-gradient(ellipse 50% 30% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)',
              'radial-gradient(ellipse 50% 30% at 50% 100%, rgba(201,169,110,0.04) 0%, transparent 70%)',
            ]
          ),
        }}
      />

      {/* Section header */}
      <SectionHeader />

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 relative">
        {/* Animated spine line */}
        <motion.div
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: 'calc(theme(spacing.6) + 16px)',
            scaleY: spineScaleY,
            transformOrigin: 'top',
            background: 'linear-gradient(to bottom, var(--gold), rgba(201,169,110,0.2), transparent)',
          }}
        />

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}
        >
          Experience
        </span>
        <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="font-display leading-tight"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--cream)', fontWeight: 400 }}
      >
        Where I&apos;ve built,{' '}
        <em style={{ color: 'var(--gold)' }}>and what I built.</em>
      </motion.h2>
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  total,
}: {
  exp: (typeof experiences)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: card content drifts up slightly as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  const isLast = index === total - 1;

  return (
    <div
      ref={cardRef}
      className={`relative flex gap-8 md:gap-12 ${isLast ? 'pb-8' : 'pb-24'}`}
    >
      {/* Node column */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 33 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05, type: 'spring', stiffness: 200, damping: 18 }}
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: 33,
            height: 33,
            background: exp.type === 'current' ? 'var(--gold)' : 'var(--bg-card)',
            border: exp.type === 'current'
              ? '2px solid var(--gold)'
              : '1px solid var(--border)',
            boxShadow: exp.type === 'current'
              ? '0 0 24px rgba(201,169,110,0.35)'
              : 'none',
          }}
        >
          {exp.type === 'current' ? (
            <>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--bg)' }} />
              <motion.div
                animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(201,169,110,0.5)' }}
              />
            </>
          ) : (
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--tertiary)' }} />
          )}
        </motion.div>
      </div>

      {/* Content with scroll-linked parallax */}
      <motion.div className="flex-1 min-w-0" style={{ y: springY, opacity }}>
        {/* Header block */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mb-6 pb-6"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                color: exp.type === 'current' ? 'var(--gold)' : 'var(--tertiary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {exp.period}
            </span>
            {exp.type === 'current' && (
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(201,169,110,0.1)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Current
              </span>
            )}
          </div>

          <h3
            className="font-display mb-1 leading-tight"
            style={{
              fontSize: 'clamp(20px, 2.5vw, 30px)',
              color: 'var(--cream)',
              fontWeight: 500,
            }}
          >
            {exp.role}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-medium" style={{ color: 'var(--gold)' }}>
              {exp.company}
            </span>
            <span style={{ color: 'var(--border)' }}>·</span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>
              {exp.location}
            </span>
          </div>

          <p
            className="text-base italic font-display"
            style={{ color: 'var(--muted)', fontWeight: 300 }}
          >
            &ldquo;{exp.tagline}&rdquo;
          </p>
        </motion.div>

        {/* Metrics */}
        {exp.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22, ease }}
            className="flex flex-wrap gap-3 mb-7"
          >
            {exp.metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-baseline gap-2 px-4 py-2.5 rounded-lg"
                style={{
                  background: 'rgba(201,169,110,0.06)',
                  border: '1px solid rgba(201,169,110,0.18)',
                }}
              >
                <span
                  className="font-mono-custom text-xl font-medium"
                  style={{ color: 'var(--gold)' }}
                >
                  {m.value}
                </span>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Work categories */}
        <div
          className={`grid gap-4 ${exp.categories.length > 2 ? 'md:grid-cols-2' : 'grid-cols-1'}`}
        >
          {exp.categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.28 + ci * 0.07, ease }}
              className="p-4 rounded-xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-1 h-4 rounded-full flex-shrink-0"
                  style={{ background: cat.color }}
                />
                <span
                  className="text-xs font-medium tracking-wider uppercase"
                  style={{ color: cat.color, fontFamily: 'var(--font-mono)' }}
                >
                  {cat.label}
                </span>
              </div>
              <ul className="space-y-2">
                {cat.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-2.5">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: 'var(--tertiary)' }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--muted)' }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
