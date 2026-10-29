import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { websites } from '@/data/websites';
import MotionRoot from '@/components/night/MotionRoot';
import { Chars, Words } from '@/components/night/text';

const CLIP: Record<string, string> = { 'yercaud-club': 'site-yercaud', nandipura: 'site-nandipura', bhramari: 'site-bhramari', 'anti-labs': 'site-antilabs', 'unravel-experiences': 'site-unravel' };

export const metadata = {
  title: 'Websites — Dhruv Shricharan',
  description: 'Websites designed and built by Dhruv Shricharan (cozycod3r): the design language behind each one and the reasoning for every choice.',
};

const principles = [
  { title: 'Identity comes from the place', body: 'Colours are sampled from the crest, the canopy, the brick path in the hero shot. Nothing is a template palette.' },
  { title: 'Only facts the client can stand behind', body: 'Rates, dates, certifications and reviews come from the client’s own documents. Unknowns stay off the page.' },
  { title: 'Built for the phone they will use', body: 'Static, prerendered pages, compressed images and motion that steps aside on slow connections or reduced-motion settings.' },
  { title: 'One clear next step', body: 'Each site ends in the action the business actually takes: a WhatsApp message, an enquiry, a call.' },
];

export default function WebsitesPage() {
  return (
    <div className="night flex min-h-full flex-col">
      <MotionRoot />
      <Navbar />
      <main className="flex-1">
        <header className="relative overflow-hidden pt-28 md:pt-40 pb-14 md:pb-20">
          <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(55% 60% at 75% 15%, rgba(111,137,255,0.25), transparent 70%), radial-gradient(35% 40% at 15% 85%, rgba(255,194,26,0.08), transparent 70%)' }} />
          <div aria-hidden className="grid-night absolute inset-0 opacity-60" />
          <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
            <p className="hero-fade font-mono-custom text-[12px] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--signal)', ['--d' as string]: '0.1s' }}>Websites · cozycod3r</p>
            <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(72px, 15vw, 230px)' }}>
              <Chars text="Websites" />
            </h1>
            <p className="hero-fade mt-8 text-[18px] md:text-[22px] leading-[1.5] max-w-[48ch]" style={{ ['--d' as string]: '0.55s' }}>
              Five sites for real businesses. Each page explains the design language of one site and the reasoning behind how it looks and works.
            </p>
          </div>
        </header>

        <section className="max-w-[1320px] mx-auto px-4 md:px-8 pb-24 md:pb-36">
          <ul className="flex flex-col gap-20 md:gap-28">
            {websites.map((w, i) => (
              <li key={w.slug} data-reveal>
                <Link
                  href={`/websites/${w.slug}/`}
                  className={`group grid grid-cols-1 gap-6 lg:gap-12 items-center ${i % 2 ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:[&>*:first-child]:order-2' : 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'}`}
                >
                  <div data-tilt className="relative aspect-[16/10] overflow-hidden rounded-[20px] border" style={{ borderColor: 'var(--rule)', background: 'var(--paper-2)', boxShadow: `0 24px 48px -32px ${w.color}` }}>
                    <video data-hover data-src={`/media/${CLIP[w.slug]}.mp4`} poster={`/media/posters/${CLIP[w.slug]}.jpg`} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    <span aria-hidden className="absolute left-5 top-5 font-mono-custom text-[12px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(7,18,38,0.72)', color: '#E8EBEF' }}>0{i + 1} / 0{websites.length}</span>
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: w.color }} />
                  </div>
                  <div>
                    <p className="text-[14px] mb-3" style={{ color: 'var(--ink-3)' }}>
                      {w.kind}, {w.location}
                    </p>
                    <h2 className="display-tight font-extrabold text-[54px] md:text-[72px] flex items-start gap-2 group-hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink)' }}>
                      {w.name}
                      <ArrowUpRight size={26} className="mt-1.5 shrink-0" style={{ color: 'var(--cobalt)' }} />
                    </h2>
                    <p className="text-[16px] leading-[1.6] mt-4 max-w-[52ch]" style={{ color: 'var(--ink-2)' }}>{w.summary}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="flex" aria-hidden>
                        {w.palette.map((s) => (
                          <span key={s.hex} className="w-5 h-5 -ml-1.5 first:ml-0 rounded-full" style={{ background: s.hex, boxShadow: '0 0 0 2px var(--paper)' }} />
                        ))}
                      </span>
                      <span className="text-[13px]" style={{ color: 'var(--ink-3)' }}>
                        {new Intl.ListFormat('en-GB', { type: 'conjunction' }).format([...new Set(w.type.map((t) => t.face.split(',')[0]))])}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="day py-20 md:py-28">
          <div className="max-w-[1320px] mx-auto px-4 md:px-8">
            <h2 data-split className="display-tight font-extrabold mb-12" style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}>
              <Words text="How I approach a site." />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((p) => (
                <div key={p.title} data-reveal className="pt-4" style={{ borderTop: '2px solid var(--ink)' }}>
                  <p className="text-[16px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>{p.title}</p>
                  <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
