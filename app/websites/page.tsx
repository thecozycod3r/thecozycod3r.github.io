import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { websites } from '@/data/websites';

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
    <>
      <Navbar />
      <main className="flex-1">
        <header className="pt-24 md:pt-32 pb-12" style={{ borderBottom: '2px solid var(--ink)' }}>
          <div className="max-w-[1240px] mx-auto px-4 md:px-8">
            <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(64px, 13vw, 184px)', color: 'var(--ink)' }}>
              Websites
            </h1>
            <p className="mt-6 text-[18px] md:text-[21px] leading-[1.5] max-w-[48ch]" style={{ color: 'var(--ink)' }}>
              Five sites for real businesses. Each page explains the design language of one site and the reasoning behind how it looks and works.
            </p>
          </div>
        </header>

        <section className="max-w-[1240px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <ul className="flex flex-col gap-16 md:gap-20">
            {websites.map((w, i) => (
              <li key={w.slug}>
                <Link
                  href={`/websites/${w.slug}/`}
                  className={`group grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-6 lg:gap-12 items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]" style={{ border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
                    <Image
                      src={`/websites/${w.slug}-desktop.jpg`}
                      alt={`${w.name} homepage`}
                      fill
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] mb-3" style={{ color: 'var(--ink-3)' }}>
                      {w.kind}, {w.location}
                    </p>
                    <h2 className="font-display font-bold text-[36px] md:text-[44px] leading-[1.02] tracking-tight flex items-start gap-2 group-hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink)' }}>
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
                        {[...new Set(w.type.map((t) => t.face.split(',')[0]))].join(' and ')}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="py-14 md:py-20" style={{ background: 'var(--sheet)', borderTop: '1px solid var(--rule)' }}>
          <div className="max-w-[1240px] mx-auto px-4 md:px-8">
            <h2 className="font-display font-bold text-[28px] md:text-[34px] tracking-tight mb-8" style={{ color: 'var(--ink)' }}>
              How I approach a site
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((p) => (
                <div key={p.title} className="pt-4" style={{ borderTop: '2px solid var(--ink)' }}>
                  <p className="text-[16px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>{p.title}</p>
                  <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
