'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TypewriterHeading from './TypewriterHeading';
import SpotlightCard, { hexToRgb } from './ui/SpotlightCard';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Information Engineering',
    institution: 'The Chinese University of Hong Kong',
    shortInstitution: 'CUHK',
    location: 'Hong Kong',
    period: '2019 — 2023',
    detail: 'Studied information systems, data engineering, and software development. Represented the university in basketball and was actively involved in multicultural student life across a campus of 40+ nationalities.',
    tags: ['Information Engineering', 'Data Systems', 'Software Development'],
    color: '#C9A96E',
    accentBg: 'rgba(201,169,110,0.06)',
    accentBorder: 'rgba(201,169,110,0.2)',
    primary: true,
  },
  {
    degree: 'ISC 12th Grade',
    field: 'Science',
    institution: "St. Joseph's Boys' High School",
    shortInstitution: "St. Joseph's",
    location: 'Bangalore, India',
    period: 'Graduated 2019',
    detail: 'Completed higher secondary education with a focus on science and mathematics. Active in sports and extracurricular activities throughout school.',
    tags: ['Science', 'Mathematics'],
    color: '#8C8278',
    accentBg: 'rgba(140,130,120,0.05)',
    accentBorder: 'rgba(140,130,120,0.15)',
    primary: false,
  },
];

const extracurriculars = [
  {
    icon: '🎾',
    title: 'Tennis',
    subtitle: 'Club & University Level',
    detail: 'Club and university-level competitor. Consistent winner in tournaments — a sport that demands both strategy and composure under pressure.',
    color: '#3FBF7F',
    accentBg: 'rgba(63,191,127,0.07)',
    accentBorder: 'rgba(63,191,127,0.2)',
  },
  {
    icon: '🏀',
    title: 'Basketball',
    subtitle: 'University Representative · Captain',
    detail: 'Represented CUHK at the university level. Captained the team to a championship victory — built leadership, team coordination, and high-stakes decision-making.',
    color: '#E8432D',
    accentBg: 'rgba(232,67,45,0.07)',
    accentBorder: 'rgba(232,67,45,0.2)',
  },
  {
    icon: '🌏',
    title: 'Global Traveller',
    subtitle: '15+ Countries',
    detail: "Travelled to 15+ countries across Asia, Europe, and beyond. Cross-cultural adaptability isn't a soft skill — it's something you build one timezone at a time.",
    color: '#60A5FA',
    accentBg: 'rgba(96,165,250,0.07)',
    accentBorder: 'rgba(96,165,250,0.2)',
  },
  {
    icon: '♠️',
    title: 'Poker & Card Magic',
    subtitle: 'Strategy · Misdirection',
    detail: 'Poker sharpens probabilistic thinking and risk management. Card magic is about audience psychology — knowing what people see, and what they miss.',
    color: '#A78BFA',
    accentBg: 'rgba(167,139,250,0.07)',
    accentBorder: 'rgba(167,139,250,0.2)',
  },
];

export default function EducationExtras() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* Ambient tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 35% at 90% 5%, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* ── EDUCATION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            Education
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </motion.div>

        <div className="mb-10">
          <TypewriterHeading prefix="Where I " emphasis="studied." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
            >
              <SpotlightCard
                rgb={hexToRgb(edu.color)}
                bg="var(--bg-card)"
                hoverBg={edu.accentBg}
                className="h-full p-6 rounded-2xl cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-md mb-2 inline-block"
                      style={{
                        color: edu.color,
                        background: edu.accentBg,
                        border: `1px solid ${edu.accentBorder}`,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {edu.period}
                    </span>
                    <h3 className="text-lg font-medium leading-snug" style={{ color: 'var(--cream)' }}>
                      {edu.degree}
                      <span className="block text-base font-normal font-display italic" style={{ color: edu.color }}>
                        {edu.field}
                      </span>
                    </h3>
                  </div>
                  {edu.primary && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: edu.accentBg,
                        border: `1px solid ${edu.accentBorder}`,
                        color: edu.color,
                        boxShadow: `0 0 18px ${edu.color}26`,
                      }}
                    >
                      ★
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--cream)' }}>
                  {edu.institution}
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                  {edu.location}
                </p>

                <div
                  className="h-px mb-4"
                  style={{ background: `linear-gradient(90deg, ${edu.color}40, transparent)` }}
                />

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {edu.detail}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {edu.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{
                        color: 'var(--muted)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-elevated)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── EXTRACURRICULARS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
            Beyond Work
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </motion.div>

        <div className="mb-10">
          <TypewriterHeading prefix="Who I am " emphasis="off the clock." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {extracurriculars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.08, ease }}
            >
              <SpotlightCard
                rgb={hexToRgb(item.color)}
                bg="var(--bg-card)"
                hoverBg={item.accentBg}
                className="h-full p-5 rounded-2xl cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform duration-300 hover:scale-110 hover:-rotate-6"
                  style={{
                    background: item.accentBg,
                    border: `1px solid ${item.accentBorder}`,
                    boxShadow: `0 0 20px ${item.color}1f`,
                  }}
                >
                  {item.icon}
                </div>

                <h3 className="text-base font-medium mb-0.5" style={{ color: 'var(--cream)' }}>
                  {item.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.subtitle}
                </p>

                <div
                  className="h-px mb-3"
                  style={{ background: `linear-gradient(90deg, ${item.color}40, transparent)` }}
                />

                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {item.detail}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
