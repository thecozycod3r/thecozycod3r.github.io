'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Menu, X, ExternalLink } from 'lucide-react';

const projects = [
  {
    slug: 'arthur',
    title: 'A.R.T.H.U.R.',
    tag: 'Voice AI · On-device ML',
    desc: 'JARVIS-style assistant: briefs me, replies by voice',
  },
  {
    slug: 'analytics-dashboard',
    title: 'Client Analytics Platform',
    tag: 'Data · AI',
    desc: 'Ads + CRM pipeline, AI insights, auto reports',
  },
  {
    slug: 'creative-studio',
    title: 'DAM Creative Studio',
    tag: 'Product · GenAI',
    desc: '7 AI image + video models with spend controls',
  },
  {
    slug: 'social-media-tool',
    title: 'Social Media Planning Tool',
    tag: 'Product · AI',
    desc: 'Approval platform built with Supabase + Meta API',
  },
  {
    slug: 'pl-dashboard',
    title: 'Financial P&L Dashboard',
    tag: 'Analytics · BigQuery',
    desc: 'Real-time P&L via BigQuery + Looker Studio',
  },
  {
    slug: 'asana-ops',
    title: 'Asana Operations Overhaul',
    tag: 'Ops · Automation',
    desc: 'Company-wide PM system with Zapier automations',
  },
  {
    slug: 'mars-analytics',
    title: 'Mars Inc. Supply Chain Suite',
    tag: 'Data · Power BI',
    desc: '4 dashboards · 3 global markets · 30% MTTR reduction',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-[60]"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-bright))',
          boxShadow: '0 0 12px rgba(201,169,110,0.5)',
        }}
      />

      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(11, 10, 8, 0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className="w-8 h-8 flex items-center justify-center text-sm font-semibold tracking-wider transition-all duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #E4C07A 0%, #C9A96E 60%, #B8924A 100%)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-jb-mono)',
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)',
                boxShadow: '0 0 20px rgba(201,169,110,0.25)',
              }}
            >
              DS
            </div>
            <span
              className="hidden md:block text-sm tracking-widest uppercase transition-colors duration-200 group-hover:text-[var(--cream)]"
              style={{ color: 'var(--muted)', fontFamily: 'var(--font-jb-mono)' }}
            >
              Dhruv Shricharan
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>

            {/* Projects dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="relative flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-colors duration-200 group"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <span className="group-hover:text-[var(--cream)] transition-colors duration-200">Projects</span>
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={14} style={{ color: 'var(--tertiary)' }} />
                </motion.div>
                <span
                  className="absolute left-4 right-4 bottom-1 h-px origin-left transition-transform duration-300"
                  style={{
                    background: 'var(--gold)',
                    transform: dropdownOpen ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 top-full mt-3 w-80 rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(20,18,16,0.92)',
                      backdropFilter: 'blur(24px) saturate(160%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                      border: '1px solid rgba(201,169,110,0.16)',
                      boxShadow:
                        '0 24px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset',
                    }}
                  >
                    {/* Top hairline */}
                    <div className="hairline-gold" />
                    <div className="p-2">
                      <div
                        className="px-3 py-2 mb-1 text-xs tracking-widest uppercase"
                        style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
                      >
                        Case Studies
                      </div>
                      {projects.map((p, i) => (
                        <motion.div
                          key={p.slug}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.16 }}
                        >
                          <Link
                            href={`/projects/${p.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="group flex items-start gap-3 px-3 py-3 rounded-xl transition-all duration-150 hover:translate-x-1"
                            style={{ background: 'transparent' }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(201,169,110,0.06)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'transparent';
                            }}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-medium truncate" style={{ color: 'var(--cream)' }}>
                                  {p.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    color: 'var(--gold)',
                                    background: 'rgba(201,169,110,0.1)',
                                    fontFamily: 'var(--font-jb-mono)',
                                  }}
                                >
                                  {p.tag}
                                </span>
                                <span className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                                  {p.desc}
                                </span>
                              </div>
                            </div>
                            <ExternalLink
                              size={12}
                              className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                              style={{ color: 'var(--gold)' }}
                            />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div
                      className="px-4 py-3 flex items-center justify-between"
                      style={{ borderTop: '1px solid var(--border-subtle)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--tertiary)' }}>
                        {projects.length} projects
                      </span>
                      <Link
                        href="/projects"
                        className="text-xs flex items-center gap-1 transition-colors duration-150 hover:brightness-125"
                        style={{ color: 'var(--gold)' }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        View all →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/contact">Contact</NavLink>

            <a
              href="/Dhruv_Shricharan_Resume.pdf"
              download="Dhruv_Shricharan_Resume.pdf"
              className="btn-shine ml-3 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #E4C07A 0%, #C9A96E 55%, #B8924A 100%)',
                color: 'var(--bg)',
                boxShadow: '0 4px 16px rgba(201,169,110,0.22)',
              }}
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(15,13,11,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(201,169,110,0.14)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              <MobileLink href="/" onClick={() => setMobileOpen(false)}>
                Home
              </MobileLink>
              <div
                className="px-3 py-1.5 text-xs tracking-widest uppercase mt-2"
                style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}
              >
                Projects
              </div>
              {projects.map((p) => (
                <MobileLink key={p.slug} href={`/projects/${p.slug}`} onClick={() => setMobileOpen(false)}>
                  <span style={{ color: 'var(--cream)' }}>{p.title}</span>
                  <span className="ml-2 text-xs" style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}>
                    {p.tag}
                  </span>
                </MobileLink>
              ))}
              <MobileLink href="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </MobileLink>
              <a
                href="/Dhruv_Shricharan_Resume.pdf"
                download="Dhruv_Shricharan_Resume.pdf"
                className="mt-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-center"
                style={{
                  background: 'linear-gradient(135deg, #E4C07A 0%, #C9A96E 55%, #B8924A 100%)',
                  color: 'var(--bg)',
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-lg text-sm transition-colors duration-200 group hover:text-[var(--cream)]"
      style={{ color: 'var(--muted)' }}
    >
      {children}
      <span
        className="absolute left-4 right-4 bottom-1 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: 'var(--gold)' }}
      />
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors duration-150"
      style={{ color: 'var(--muted)' }}
    >
      {children}
    </Link>
  );
}
