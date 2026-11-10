import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { websites } from '@/data/websites';
import Motion from '@/components/deck/Motion';

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
    <div className="felt flex min-h-full flex-col">
      <Motion />
      <Navbar />
      <main className="flex-1">
        <header className="sub-hero felt no-media" data-subhero>
          <div className="wrap">
            <h1 className="sub-title display" style={{ fontSize: 'clamp(64px, 15vw, 236px)' }}><span className="rise"><span>Websites</span></span></h1>
            <div className="sub-lede" data-late style={{ marginTop: 'clamp(26px, 3.4vw, 44px)' }}>
              <p>Five sites for real businesses. Each page explains the design language of one site and the reasoning behind how it looks and works.</p>
            </div>
          </div>
        </header>

        <section className="felt" style={{ paddingBottom: 'clamp(80px, 11vw, 150px)' }}>
          <ul className="wrap shelf">
            {websites.map((w) => (
              <li key={w.slug}>
                <Link href={`/websites/${w.slug}/`} className="shelf-item" style={{ ['--site' as string]: w.color }}>
                  <div className="shelf-media" data-setdown>
                    <div>
                      <video data-hover data-src={`/media/${CLIP[w.slug]}.mp4`} poster={`/media/posters/${CLIP[w.slug]}.jpg`} muted loop playsInline preload="none" aria-hidden />
                    </div>
                    {/* The same site on a phone, as the card laid over the corner. */}
                    <span className="shelf-phone" aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/websites/${w.slug}-mobile.jpg`} alt="" loading="lazy" />
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] mb-3" style={{ color: 'var(--ink-2)' }}>{w.kind}, {w.location}</p>
                    <h2 className="display">{w.name}</h2>
                    <p className="text-[17px] leading-[1.55] mt-5 max-w-[52ch]" style={{ color: 'var(--ink-2)' }}>{w.summary}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="swatches" aria-hidden>
                        {w.palette.map((s) => <i key={s.hex} style={{ background: s.hex }} />)}
                      </span>
                      <span className="text-[14.5px]" style={{ color: 'var(--ink-3)' }}>
                        {new Intl.ListFormat('en-GB', { type: 'conjunction' }).format([...new Set(w.type.map((t) => t.face.split(',')[0]))])}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="stock band">
          <div className="wrap">
            <header className="head">
              <h2 className="display">How I approach a site.</h2>
            </header>
            <div className="tenets">
              {principles.map((p) => (
                <div key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
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
