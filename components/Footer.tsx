'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const marqueeWords = ['Growth', 'Data', 'Operations', 'Outbound', 'Analytics', 'Automation'];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-subtle)' }}
    >
      {/* ── Marquee strip ── */}
      <div className="py-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="marquee-mask">
          <div className="marquee-track" style={{ ['--marquee-duration' as string]: '36s' }}>
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="flex items-center shrink-0">
                <span
                  className="font-display italic whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    fontWeight: 400,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(201,169,110,0.28)',
                  }}
                >
                  {word}
                </span>
                <span className="mx-8 text-lg" style={{ color: 'var(--gold-dim)' }}>
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 80% at 50% 100%, rgba(201,169,110,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col items-center gap-9">
        {/* CTA heading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-center"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300, fontStyle: 'italic' }}
        >
          <span style={{ color: 'var(--cream)' }}>Let&apos;s build </span>
          <span className="text-gold-shimmer" style={{ fontWeight: 500 }}>
            something.
          </span>
        </motion.p>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <ContactCard
            href="mailto:dhruv.shricharan@hotmail.com"
            label="dhruv.shricharan@hotmail.com"
          />
          <ContactCard
            href="mailto:20dhruv.shricharan00@gmail.com"
            label="20dhruv.shricharan00@gmail.com"
          />

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/dhruv-shricharan-798b40186"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="btn-shine flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 backdrop-blur-sm"
            style={{ background: 'rgba(26,24,21,0.7)', border: '1px solid var(--border-subtle)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(96,165,250,0.45)';
              el.style.background = 'rgba(96,165,250,0.08)';
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = '0 12px 28px rgba(0,0,0,0.35), 0 0 24px rgba(96,165,250,0.12)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--border-subtle)';
              el.style.background = 'rgba(26,24,21,0.7)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = 'none';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#60A5FA' }}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </motion.div>

        {/* Divider + credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="flex flex-col items-center gap-3 pt-6 w-full"
        >
          <div className="hairline-gold w-full max-w-md" />
          <p className="text-xs pt-2" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Dhruv Shricharan — Bangalore, India
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function ContactCard({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      title={label}
      className="btn-shine group flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
      style={{ background: 'rgba(26,24,21,0.7)', border: '1px solid var(--border-subtle)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(201,169,110,0.4)';
        el.style.background = 'rgba(201,169,110,0.07)';
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = '0 12px 28px rgba(0,0,0,0.35), 0 0 24px rgba(201,169,110,0.1)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border-subtle)';
        el.style.background = 'rgba(26,24,21,0.7)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--gold)' }}
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      <span className="text-sm" style={{ color: 'var(--cream)', fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    </a>
  );
}
