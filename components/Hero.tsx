import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { systemMap, RESUME } from '@/data/profile';

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-end">
          <div>
            <p className="flex items-center gap-2 text-[14px] mb-6" style={{ color: 'var(--ink-2)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--signal)', boxShadow: '0 0 0 3px rgba(255,194,26,0.3)' }} />
              Bengaluru. Open to growth and founders&apos; office roles.
            </p>

            <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(76px, 15vw, 212px)', color: 'var(--ink)' }}>
              Dhruv
              <br />
              Shricharan
            </h1>

            <p className="mt-8 text-[19px] md:text-[22px] leading-[1.45] max-w-[34ch] md:max-w-[38ch]" style={{ color: 'var(--ink)' }}>
              I build the systems a growing business runs on: how it finds clients, delivers the work, and knows whether it is making money.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#work"
                className="px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-[var(--ink)]"
                style={{ background: 'var(--cobalt)', color: '#fff' }}
              >
                See the work
              </Link>
              <a
                href={RESUME}
                download
                className="px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:border-[var(--ink)]"
                style={{ border: '1px solid var(--rule)', color: 'var(--ink)' }}
              >
                Download résumé
              </a>
            </div>
          </div>

          <figure className="w-[150px] sm:w-[220px] lg:w-full">
            <div className="relative aspect-[9/11] overflow-hidden rounded-[4px]" style={{ background: 'var(--paper-2)' }}>
              <Image src="/dp.jpeg" alt="Dhruv Shricharan" fill priority sizes="280px" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-[13px]" style={{ color: 'var(--ink-3)' }}>
              Founders&apos; Office at Digital Advantage Media. Before that, Decision Scientist for Mars Inc.
            </figcaption>
          </figure>
        </div>

        <SystemMap />
      </div>
    </section>
  );
}

function SystemMap() {
  return (
    <div className="mt-16 md:mt-24 grid-paper rounded-[6px] p-5 md:p-8" style={{ border: '1px solid var(--rule)' }}>
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-8 md:mb-10">
        <h2 className="font-display font-bold text-[22px] md:text-[26px] tracking-tight" style={{ color: 'var(--ink)' }}>
          How an agency grows, and what I built for each part of it
        </h2>
        <p className="text-[14px]" style={{ color: 'var(--ink-3)' }}>
          Digital Advantage Media, 2025 – now
        </p>
      </div>

      <ol className="sysmap">
        <span className="sysmap-pulse" aria-hidden />
        {systemMap.map((s, i) => (
          <li key={s.stage} className="sysmap-stage">
            <span className="sysmap-dot" aria-hidden />
            <div className="sysmap-reveal" style={{ animationDelay: `${0.6 + i * 0.6}s` }}>
              <h3 className="font-display font-bold text-[20px] leading-tight" style={{ color: 'var(--ink)' }}>
                {s.stage}
              </h3>
              <p className="text-[14px] mt-1 mb-4" style={{ color: 'var(--ink-3)' }}>
                {s.question}
              </p>
              <ul className="flex flex-col gap-2">
                {s.nodes.map((n) => (
                  <li key={n.name}>
                    {n.href ? (
                      <Link
                        href={n.href}
                        className="group block rounded-[4px] px-3.5 py-3 transition-colors hover:border-[var(--cobalt)]"
                        style={{ background: 'var(--sheet)', border: '1px solid var(--rule)' }}
                      >
                        <span className="flex items-center justify-between gap-2 text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>
                          {n.name}
                          <ArrowUpRight size={16} className="shrink-0 transition-colors group-hover:text-[var(--cobalt)]" style={{ color: 'var(--ink-3)' }} />
                        </span>
                        <span className="block font-mono-custom text-[12px] leading-snug mt-1" style={{ color: 'var(--ink-2)' }}>
                          {n.note}
                        </span>
                      </Link>
                    ) : (
                      <div className="rounded-[4px] px-3.5 py-3" style={{ background: 'var(--sheet)', border: '1px dashed var(--rule)' }}>
                        <span className="block text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>
                          {n.name}
                        </span>
                        <span className="block font-mono-custom text-[12px] leading-snug mt-1" style={{ color: 'var(--ink-2)' }}>
                          {n.note}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 pt-5 text-[14px]" style={{ color: 'var(--ink-2)', borderTop: '1px solid var(--rule)' }}>
        Off the map: <Link href="/projects/arthur/" className="ink-link">A.R.T.H.U.R.</Link>, a voice assistant I built to run my own inbox.
      </p>
    </div>
  );
}
