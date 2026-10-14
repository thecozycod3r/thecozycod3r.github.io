'use client';

import { useRef, useState, useEffect } from 'react';
import TypewriterHeading from './TypewriterHeading';
import CountUp from './ui/CountUp';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SCROLL_PER_ITEM = 150; // vh per company slide


const experiences = [
  {
    id: 'dam',
    company: 'Digital Advantage Media',
    shortName: 'Digital Advantage\nMedia',
    period: 'Oct 2025 — Present',
    role: "Founders' Office Growth Analyst",
    location: 'Bangalore, India',
    color: '#C9A96E',
    accentBg: 'rgba(201,169,110,0.08)',
    accentBorder: 'rgba(201,169,110,0.25)',
    headline: 'Built the entire growth stack from zero.',
    description:
      "Joined as the first growth hire in the Founders' Office. Built the outbound sales system, financial intelligence layer, and operations stack from scratch — while repositioning the brand away from commoditisation.",
    highlights: [
      { metric: '1,000+', label: 'Emails / day', detail: 'End-to-end outbound system via ZAP Mail + Sending.ac inbox warmup' },
      { metric: '5%', label: 'Positive reply rate', detail: 'Targeted sequences converting cold leads to paying clients' },
      { metric: '₹5L+/mo', label: 'MRR closed', detail: 'LinkedIn Sales Navigator outreach on founders\' profiles' },
      { metric: 'Monthly → Weekly', label: 'Reporting cycle', detail: 'Centralised P&L dashboard in BigQuery + Looker Studio' },
      { metric: 'Shipped', label: 'Social media app', detail: 'AI-assisted full-stack tool — Supabase + Vercel + Meta API, replacing fragmented Slack/WhatsApp approval chains' },
    ],
    bullets: [
      'Vibe-coded a full social media planning and approval platform using Claude, Supabase, and Vercel — with calendar view, mood board creation, multi-stage internal approval flow (Manager → Copywriter → Designer), client sign-off step, and automated posting to Instagram + Facebook via Meta API.',
      'Prospected leads via Apollo, AmpleLeads, BetterContact — built a CRM pipeline of 30+ qualified prospects across 4 industries.',
      'Repositioned DAM from "digital marketing agency" to "strategic growth partner" with new ICPs, collateral, and productised offerings.',
      'Introduced new products: CRO via conversational AI (WhatsApp + website chatbots), SEO + GEO services.',
      'Implemented Asana company-wide with auto-assignment, due-date logic, Slack/email notifications, and workload dashboards.',
      'Designed automated NPS survey system with 72-hour follow-up protocol on detractors and QBR integration.',
    ],
    tags: ['Apollo', 'Sales Navigator', 'ZAP Mail', 'Sending.ac', 'BigQuery', 'Looker Studio', 'Asana', 'Zapier', 'Supabase', 'Vercel', 'Meta API', 'Claude AI'],
  },
  {
    id: 'mars',
    company: 'Mars Inc. via Mu Sigma',
    shortName: 'Mars Inc.\n/ Mu Sigma',
    period: 'Jul 2023 — Oct 2025',
    role: 'Decision Scientist',
    location: 'Asia · Australia · Europe',
    color: '#3FBF7F',
    accentBg: 'rgba(63,191,127,0.07)',
    accentBorder: 'rgba(63,191,127,0.22)',
    headline: 'Supply chain intelligence for one of the world\'s largest FMCG companies.',
    description:
      'Embedded with Mars Inc. for 2+ years as a Decision Scientist contractor. Designed and maintained a suite of Power BI dashboards giving supply planners across 3 continents real-time visibility into material requirements, inventory, and demand forecasts.',
    highlights: [
      { metric: '30%', label: 'MTTR reduction', detail: 'Magpie dashboard — proactive discrepancy resolution before escalation' },
      { metric: '1 hour', label: 'Pipeline saved', detail: 'PySpark optimisation in Databricks for MRP pipeline runtime' },
      { metric: '3', label: 'New global markets', detail: 'Integrated into Magpie reporting ecosystem' },
      { metric: '4', label: 'Dashboards shipped', detail: 'MRP · Customer MOS · Magpie · Long-Term Demand Planning' },
    ],
    bullets: [
      'MRP Dashboard: Power BI for consumption and demand reports — automated weekly updates, PO batch matching for improved data accuracy.',
      'Scalable Customer MOS: In-transit stock, cover days, risk flags — rolled out across Serbia + Croatia, JDA → Kinaxis migration.',
      'Magpie: Raw material and packaging inventory health, safety coverage, overdue PO tracking across 3 new global markets.',
      'Long-Term Demand Planning: NSV trends, YoY product performance, promotion impact — cross-functional alignment across 3 continents.',
      'Authored BRDs, FRDs, and user stories for all dashboard rollouts; managed stakeholder sign-off across Asia, Australia, Europe.',
    ],
    tags: ['Power BI', 'PySpark', 'Databricks', 'Azure', 'SQL Server', 'React', 'Kinaxis', 'Azure Data Factory'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    shortName: 'Tata\nConsultancy Services',
    period: '2022',
    role: 'ML Intern',
    location: 'India',
    color: '#60A5FA',
    accentBg: 'rgba(96,165,250,0.07)',
    accentBorder: 'rgba(96,165,250,0.22)',
    headline: 'Predictive maintenance models that went into production.',
    description:
      'Built LSTM-based predictive maintenance models during a machine learning internship at TCS. Improved accuracy through feature engineering and delivered insight decks that drove stakeholder buy-in.',
    highlights: [
      { metric: '15%', label: 'Accuracy lift', detail: 'LSTM model improvement via feature engineering + hyperparameter tuning' },
      { metric: 'Adopted', label: 'By the client', detail: 'Insight decks drove stakeholder acceptance of data models' },
    ],
    bullets: [
      'Built predictive maintenance models using Python and LSTM neural networks on real industrial datasets.',
      'Improved model accuracy by 15% through systematic feature engineering and hyperparameter optimisation.',
      'Developed client-facing insight decks translating model outputs into business-ready recommendations.',
      'Drove stakeholder adoption by clearly communicating model confidence, limitations, and business value.',
    ],
    tags: ['Python', 'LSTM', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
  {
    id: 'nasscom',
    company: 'NASSCOM Centre of Excellence',
    shortName: 'NASSCOM\nCoE',
    period: '2021',
    role: 'Research Intern',
    location: 'Bangalore, India',
    color: '#E8432D',
    accentBg: 'rgba(232,67,45,0.07)',
    accentBorder: 'rgba(232,67,45,0.22)',
    headline: 'Mapped 500+ AI startups for India\'s EdTech research.',
    description:
      'Research internship at the NASSCOM Centre of Excellence for Data Science. Produced structured analysis of the Indian AI/ML startup ecosystem and supported industry-startup collaboration events.',
    highlights: [
      { metric: '500+', label: 'Startups researched', detail: 'AI/Data Science landscape for EdTech trend analysis' },
      { metric: 'Xperience AI', label: 'Events supported', detail: 'Industry-startup collaboration for NASSCOM CoE' },
    ],
    bullets: [
      'Researched and catalogued 500+ AI/Data Science startups across the Indian EdTech ecosystem.',
      'Produced structured reports used for NASSCOM sector insights and policy inputs.',
      'Supported Xperience AI events facilitating industry-startup collaboration for the Centre of Excellence.',
    ],
    tags: ['Research', 'EdTech', 'AI/ML', 'Startup Ecosystem', 'Data Analysis'],
  },
  {
    id: 'sof',
    company: 'School of Fish Technologies',
    shortName: 'School of Fish\nTechnologies',
    period: '2020',
    role: 'Intern',
    location: 'Bangalore, India',
    color: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.07)',
    accentBorder: 'rgba(167,139,250,0.22)',
    headline: 'First industry role — data pipelines, beta testing, and feedback loops.',
    description:
      'My first professional role. Managed data pipelines and contributed to product improvement through structured beta testing and customer feedback integration.',
    highlights: [
      { metric: 'SQL', label: 'Data pipelines', detail: 'B2C and B2B data management' },
      { metric: 'UI/UX', label: 'Improved', detail: 'Beta testing + customer feedback integration' },
    ],
    bullets: [
      'Managed B2C and B2B data pipelines using SQL — ensuring data integrity across customer records.',
      'Conducted beta testing sessions and systematically integrated customer feedback into the product roadmap.',
      'Gained first-hand exposure to product development cycles, user research, and iterative improvement.',
    ],
    tags: ['SQL', 'Beta Testing', 'UX Research', 'Data Management'],
  },
];

export default function StickyExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * experiences.length), experiences.length - 1);
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const progressWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 80, damping: 20 }
  );

  const active = experiences[activeIndex];

  return (
    <section style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            Experience
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </div>
        <TypewriterHeading
          prefix="Where I've worked, "
          emphasis="and what I shipped."
          size="clamp(36px, 5vw, 60px)"
        />
        <p className="mt-3 text-sm" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
          Scroll to explore each role ↓
        </p>
      </div>

      {/* Sticky scroll */}
      <div
        ref={containerRef}
        style={{ height: `${experiences.length * SCROLL_PER_ITEM}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
          {/* Ambient glow tinted by active company */}
          <AnimatePresence>
            <motion.div
              key={active.id + '-glow'}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `radial-gradient(ellipse 55% 45% at 70% 40%, ${active.accentBg} 0%, transparent 70%)`,
              }}
            />
          </AnimatePresence>

          {/* Giant watermark index */}
          <div
            className="absolute right-2 bottom-0 pointer-events-none select-none hidden lg:block font-display leading-none"
            style={{
              fontSize: 'clamp(180px, 24vw, 320px)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: active.color,
              opacity: 0.05,
              transition: 'color 0.6s ease',
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </div>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'var(--border-subtle)', zIndex: 10 }}>
            <motion.div
              className="h-full"
              style={{
                width: progressWidth,
                background: `linear-gradient(90deg, ${active.color}88, ${active.color})`,
                boxShadow: `0 0 14px ${active.color}`,
              }}
            />
          </div>

          <div className="h-full max-w-7xl mx-auto px-6 md:px-10 flex gap-0">

            {/* ── LEFT: Company list ── */}
            <div
              className="hidden md:flex flex-col justify-center py-16 flex-shrink-0"
              style={{ width: 220, borderRight: '1px solid var(--border-subtle)', paddingRight: 32 }}
            >
              <div className="space-y-1">
                {experiences.map((exp, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <motion.div
                      key={exp.id}
                      animate={{
                        opacity: isActive ? 1 : 0.28,
                      }}
                      transition={{ duration: 0.35 }}
                      className="relative py-3 pl-4 rounded-lg transition-all duration-300 cursor-default"
                      style={{
                        borderLeft: `2px solid ${isActive ? exp.color : 'transparent'}`,
                      }}
                    >
                      {/* Active glow */}
                      {isActive && (
                        <motion.div
                          layoutId="active-bg"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: exp.accentBg,
                            boxShadow: `0 0 28px ${exp.color}1a, inset 0 0 0 1px ${exp.color}22`,
                          }}
                          transition={{ duration: 0.35, ease }}
                        />
                      )}
                      <div className="relative z-10">
                        <p
                          className="text-sm font-medium leading-snug whitespace-pre-line"
                          style={{ color: isActive ? 'var(--cream)' : 'var(--tertiary)' }}
                        >
                          {exp.shortName}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{
                            color: isActive ? exp.color : 'var(--tertiary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {exp.period.split(' — ')[0]}
                          {exp.period.includes('Present') ? ' — Now' : ''}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Index counter */}
              <div className="mt-8 pl-4">
                <span
                  className="text-xs tabular-nums"
                  style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}{' '}
                  <span style={{ color: 'var(--border)' }}>/</span>{' '}
                  {String(experiences.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* ── RIGHT: Detail content ── */}
            <div className="flex-1 flex flex-col justify-center py-16 overflow-hidden" style={{ paddingLeft: 48 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease }}
                  className="w-full h-full flex flex-col justify-center"
                  style={{ willChange: 'opacity, transform' }}
                >
                  {/* Role + company */}
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{
                          color: active.color,
                          background: active.accentBg,
                          border: `1px solid ${active.accentBorder}`,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {active.period}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--tertiary)' }}>{active.location}</span>
                    </div>
                    <h3
                      className="font-display leading-tight mb-1"
                      style={{ fontSize: 'clamp(22px, 2.6vw, 38px)', color: 'var(--cream)', fontWeight: 500 }}
                    >
                      {active.headline}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: active.color }}>
                      {active.role} · {active.company}
                    </p>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: 'var(--muted)', maxWidth: 560 }}
                  >
                    {active.description}
                  </p>

                  {/* Two-col layout: highlights + bullets */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                    {/* Highlights */}
                    <div className="space-y-2">
                      <p className="text-xs tracking-widest uppercase mb-2.5" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
                        Key impact
                      </p>
                      {active.highlights.map((h) => (
                        <div
                          key={h.metric + h.label}
                          className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 cursor-default"
                          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = active.accentBg;
                            el.style.borderColor = active.accentBorder;
                            el.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = 'var(--bg-card)';
                            el.style.borderColor = 'var(--border-subtle)';
                            el.style.transform = 'translateX(0)';
                          }}
                        >
                          <div className="w-0.5 self-stretch rounded-full flex-shrink-0" style={{ background: active.color }} />
                          <div>
                            <div className="flex items-baseline gap-1.5 mb-0.5">
                              <CountUp
                                value={h.metric}
                                duration={1.2}
                                className="font-mono-custom text-base font-medium"
                                style={{ color: active.color }}
                              />
                              <span className="text-xs" style={{ color: 'var(--muted)' }}>{h.label}</span>
                            </div>
                            <p className="text-xs leading-snug" style={{ color: 'var(--tertiary)' }}>{h.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bullets */}
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-2.5" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
                        Responsibilities
                      </p>
                      <ul className="space-y-2">
                        {active.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2.5 transition-all duration-150 cursor-default rounded-lg px-2 py-1.5"
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = active.accentBg;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'transparent';
                            }}
                          >
                            <span
                              className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: active.color }}
                            />
                            <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md transition-all duration-150 cursor-default"
                        style={{ color: 'var(--muted)', border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = active.color;
                          el.style.borderColor = active.accentBorder;
                          el.style.background = active.accentBg;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = 'var(--muted)';
                          el.style.borderColor = 'var(--border-subtle)';
                          el.style.background = 'var(--bg-elevated)';
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
