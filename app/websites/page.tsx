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
      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <section className="relative pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}>
              Websites · by cozycod3r
            </p>
            <h1 className="font-display mb-6" style={{ color: 'var(--cream)', fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 1, fontWeight: 400 }}>
              Sites built for <em style={{ color: 'var(--gold)' }}>real places.</em>
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 680 }}>
              A heritage club, a coffee estate, a pool villa, a creative studio and a travel brand. Each page below explains the design language of one site and the reasoning behind how it looks and works.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websites.map((w) => (
              <Link
                key={w.slug}
                href={`/websites/${w.slug}`}
                className="group block rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={`/websites/${w.slug}-desktop.jpg`}
                    alt={`${w.name} website`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {w.palette.slice(0, 5).map((s) => (
                      <span key={s.hex} className="w-3.5 h-3.5 rounded-full" style={{ background: s.hex, border: '1px solid rgba(255,255,255,0.12)' }} />
                    ))}
                    <span className="ml-2 text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}>
                      {w.type.map((t) => t.face).join(' · ')}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl mb-1 inline-flex items-center gap-2" style={{ color: 'var(--cream)', fontWeight: 400 }}>
                    {w.name}
                    <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: w.color }} />
                  </h2>
                  <p className="text-xs uppercase tracking-widest mb-4" style={{ color: w.color, fontFamily: 'var(--font-jb-mono)' }}>
                    {w.kind} · {w.location}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{w.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 md:px-10 pb-28">
          <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: 'var(--gold)', fontFamily: 'var(--font-jb-mono)' }}>
            How I approach a site
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="p-5 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--cream)' }}>{p.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
