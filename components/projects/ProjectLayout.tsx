'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, FolderGit2, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Tag { label: string; color: string; bg: string }
interface Repo { url: string; label?: string; private?: boolean }

interface Props {
  title: string;
  subtitle: string;
  period: string;
  company: string;
  tags: Tag[];
  color: string;
  accentBg: string;
  repos?: Repo[];
  children: React.ReactNode;
}

export default function ProjectLayout({ title, subtitle, period, company, tags, color, accentBg, repos, children }: Props) {
  const words = title.split(' ');

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
          {/* Accent aurora */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="aurora-blob"
              style={{
                width: 700,
                height: 420,
                top: '-15%',
                left: '15%',
                background: `radial-gradient(circle, ${accentBg.replace('0.07', '0.16')} 0%, transparent 65%)`,
                animation: 'aurora-a 18s ease-in-out infinite',
              }}
            />
            <div
              className="aurora-blob"
              style={{
                width: 420,
                height: 320,
                top: '30%',
                right: '-5%',
                background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 65%)',
                animation: 'aurora-b 22s ease-in-out infinite',
              }}
            />
          </div>

          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(var(--cream) 1px, transparent 1px), linear-gradient(90deg, var(--cream) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse 90% 90% at 50% 0%, black 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 0%, black 30%, transparent 100%)',
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-10">
            {/* Back */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mb-10"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-full transition-all duration-200 group backdrop-blur-sm"
                style={{
                  color: 'var(--muted)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(20,18,16,0.5)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${color}55`;
                  el.style.color = 'var(--cream)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border-subtle)';
                  el.style.color = 'var(--muted)';
                }}
              >
                <ArrowLeft size={14} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
                Back to portfolio
              </Link>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="flex flex-wrap gap-2 mb-7"
            >
              {tags.map((t) => (
                <span
                  key={t.label}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    color: t.color,
                    background: t.bg,
                    border: `1px solid ${t.color}33`,
                    fontFamily: 'var(--font-mono)',
                    boxShadow: `0 0 16px ${t.color}14`,
                  }}
                >
                  {t.label}
                </span>
              ))}
              <span
                className="text-xs px-2.5 py-1 rounded-md"
                style={{ color: 'var(--muted)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}
              >
                {period}
              </span>
            </motion.div>

            {/* Title — per-word masked reveal */}
            <h1
              className="font-display leading-[1.02] mb-5"
              style={{ fontSize: 'clamp(40px, 7vw, 88px)', color: 'var(--cream)', fontWeight: 400 }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom"
                  style={{
                    paddingBottom: '0.12em',
                    marginBottom: '-0.12em',
                    marginRight: i < words.length - 1 ? '0.26em' : undefined,
                    paddingRight: i === words.length - 1 ? '0.06em' : undefined,
                  }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: '112%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.06, ease }}
                  >
                    {i === words.length - 1 ? (
                      <span className="italic" style={{ color }}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--muted)' }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="mt-5 flex items-center gap-3 text-sm"
              style={{ color: 'var(--tertiary)' }}
            >
              <span className="w-6 h-px" style={{ background: `${color}66` }} />
              {company}
            </motion.div>

            {repos && repos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.48, ease }}
                className="mt-6 flex flex-wrap items-center gap-2.5"
              >
                {repos.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={r.private ? 'Private repository: the code exists on GitHub but is not public' : 'View source on GitHub'}
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
                    style={{ color: 'var(--cream)', border: `1px solid ${color}44`, background: accentBg, fontFamily: 'var(--font-mono)' }}
                  >
                    <FolderGit2 size={13} style={{ color }} />
                    {r.label ?? r.url.replace('https://github.com/', '')}
                    {r.private ? (
                      <span className="inline-flex items-center gap-1" style={{ color: 'var(--tertiary)' }}>
                        <Lock size={11} /> private
                      </span>
                    ) : (
                      <ArrowUpRight size={12} style={{ color: 'var(--muted)' }} />
                    )}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="hairline-gold" />
        </div>

        {/* Page content */}
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">{children}</div>
      </main>
    </>
  );
}
