'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RESUME, EMAIL } from '@/data/profile';

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/websites/', label: 'Websites' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-[border-color,background-color] duration-200"
      style={{
        background: scrolled || open ? 'rgba(232,235,239,0.92)' : 'transparent',
        backdropFilter: scrolled || open ? 'blur(10px)' : 'none',
        borderBottom: `1px solid ${scrolled || open ? 'var(--rule)' : 'transparent'}`,
      }}
    >
      <nav className="max-w-[1240px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-[17px] font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
          Dhruv Shricharan
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[14px]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink-2)' }}>
              {l.label}
            </Link>
          ))}
          <a
            href={RESUME}
            download
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors hover:bg-[var(--cobalt)]"
            style={{ background: 'var(--ink)', color: 'var(--sheet)' }}
          >
            Download résumé
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-[14px] font-medium px-3 py-1.5 rounded-full"
          style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden px-4 pb-5 pt-1">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href} style={{ borderTop: '1px solid var(--rule-soft)' }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3">
            <a href={RESUME} download className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'var(--ink)', color: 'var(--sheet)' }}>
              Download résumé
            </a>
            <a href={`mailto:${EMAIL}`} className="px-4 py-2 rounded-full text-sm font-medium" style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}>
              Email me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
