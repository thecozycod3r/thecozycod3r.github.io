'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RESUME, EMAIL } from '@/data/profile';
import { Suit } from '@/components/deck/Suit';

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/websites/', label: 'Websites' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <nav className="nav-in wrap" aria-label="Main">
        <Link href="/" className="nav-mark" onClick={() => setOpen(false)}>
          <Suit s="spade" />
          Dhruv Shricharan
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <a href={RESUME} download className="btn" style={{ background: 'var(--stock-hi)', color: 'var(--felt-deep)' }}>
            Download résumé
          </a>
        </div>

        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-sheet" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="nav-sheet" className="nav-sheet">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 mt-4">
            <a href={RESUME} download className="btn" style={{ background: 'var(--stock-hi)', color: 'var(--felt-deep)' }}>Download résumé</a>
            <a href={`mailto:${EMAIL}`} className="btn" style={{ boxShadow: 'inset 0 0 0 1.5px currentColor' }}>Email me</a>
          </div>
        </div>
      )}
    </header>
  );
}
