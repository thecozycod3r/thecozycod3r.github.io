import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import {
  systemMap, projects, roles, toolkit, languages, education, offClock,
  EMAIL, LINKEDIN, GITHUB, RESUME,
} from '@/data/profile';
import { websites } from '@/data/websites';
import HeroCanvas from './HeroCanvas';
import { Chars, Words } from './text';

/* Media for each case study: real tool footage where it exists, a
   screenshot where it does not. All captured with the anonymiser. */
const projectMedia: Record<string, { video?: string; poster: string }> = {
  'analytics-dashboard': { video: '/media/cerno.mp4', poster: '/media/posters/cerno.jpg' },
  neo: { video: '/media/neo.mp4', poster: '/media/posters/neo.jpg' },
  tempo: { video: '/media/tempo.mp4', poster: '/media/posters/tempo.jpg' },
  'creative-studio': { video: '/media/studio.mp4', poster: '/media/posters/studio.jpg' },
  'social-media-tool': { poster: '/screenshots/social-calendar.jpg' },
  'pl-dashboard': { poster: '/screenshots/pl-overview.jpg' },
  'asana-ops': { poster: '/screenshots/asana-myndwell.jpg' },
};
const siteMedia: Record<string, string> = {
  'yercaud-club': 'site-yercaud',
  nandipura: 'site-nandipura',
  bhramari: 'site-bhramari',
  'anti-labs': 'site-antilabs',
  'unravel-experiences': 'site-unravel',
};

function Heading({ eyebrow, title, aside, id, compact }: { eyebrow: string; title: string; aside?: string; id?: string; compact?: boolean }) {
  return (
    <div id={id} className={`${compact ? 'mb-8 md:mb-10' : 'mb-10 md:mb-14'} grid gap-5 ${aside ? 'md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-12' : ''}`}>
      <div>
        <p className="font-mono-custom text-[12px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--eyebrow)' }}>
          {eyebrow}
        </p>
        <h2 data-split className="display-tight font-extrabold" style={{ fontSize: compact ? 'clamp(48px, 6.5vw, 96px)' : 'clamp(54px, 9vw, 128px)' }}>
          <Words text={title} />
        </h2>
      </div>
      {aside && (
        <p data-reveal className="text-[16px] max-w-[42ch] md:pb-3 md:border-l md:pl-5" style={{ color: 'var(--ink-2)', borderColor: 'var(--rule)' }}>
          {aside}
        </p>
      )}
    </div>
  );
}

const wrap = 'max-w-[1320px] mx-auto px-4 md:px-8';

/* ── 1. Hero ──────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative md:min-h-[100svh] overflow-hidden flex flex-col">
      {/* Glow under the canvas: what you see before WebGL, or without it */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 40%, rgba(111,137,255,0.22), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(255,194,26,0.08), transparent 70%)',
        }}
      />
      <HeroCanvas />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(to top, var(--paper), transparent)' }} />

      <div className={`${wrap} relative z-10 flex-1 flex flex-col justify-start md:justify-end pt-28 md:pt-28 pb-12 md:pb-14 w-full`}>
        <p className="hero-fade font-mono-custom text-[12px] md:text-[13px] tracking-[0.22em] uppercase mb-6" style={{ ['--d' as string]: '0.2s', color: 'var(--ink-2)' }}>
          Growth · data · operations — Bengaluru
        </p>

        <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(72px, 15.5vw, 236px)' }}>
          <span className="block"><Chars text="Dhruv" /></span>
          <span className="block"><Chars text="Shricharan" start={5} /></span>
        </h1>

        <div className="mt-8 md:mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="hero-fade text-[19px] md:text-[23px] leading-[1.45] max-w-[40ch]" style={{ ['--d' as string]: '0.75s' }}>
            I build the systems a growing business runs on: how it finds clients, delivers the work, and knows whether it is making money.
          </p>
          <div className="hero-fade flex flex-wrap gap-3" style={{ ['--d' as string]: '0.9s' }}>
            <Link data-magnetic href="#work" className="px-6 py-3 rounded-full text-[15px] font-medium inline-flex items-center gap-2" style={{ background: 'var(--cobalt)', color: '#071226' }}>
              See the work <ArrowDown size={16} />
            </Link>
            <a data-magnetic href={RESUME} download className="px-6 py-3 rounded-full text-[15px] font-medium" style={{ border: '1px solid var(--rule)' }}>
              Download résumé
            </a>
          </div>
        </div>

        <ol className="hero-fade mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-4 border-t pt-5" style={{ ['--d' as string]: '1.05s', borderColor: 'var(--rule)' }}>
          {systemMap.map((s, i) => (
            <li key={s.stage} className="flex items-center gap-3 text-[13px] font-mono-custom uppercase tracking-[0.14em]" style={{ color: 'var(--ink-2)' }}>
              <span className="stage-dot h-2 w-2 rounded-full" style={{ ['--i' as string]: i }} />
              {s.stage}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 2. The system, pinned ───────────────────────────────────────── */
export function Flow() {
  return (
    <section data-flow className="relative min-h-[100svh] flex flex-col justify-center py-24 lg:py-16">
      <div className={wrap + ' w-full'}>
        <Heading compact eyebrow="The system" title="One business, four questions." aside="Each stage asks one question. Under it, what I built so the answer is a number, not a guess." />
        <div className="relative">
          <div aria-hidden className="absolute left-0 right-0 top-[7px] h-px hidden lg:block" style={{ background: 'var(--rule)' }} />
          <div data-flow-line aria-hidden className="absolute left-0 right-0 top-[7px] h-px hidden lg:block origin-left" style={{ background: 'linear-gradient(90deg, var(--cobalt), var(--signal))' }} />
          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-8">
            {systemMap.map((s, i) => (
              <li key={s.stage} data-flow-stage className="relative">
                <span data-flow-dot className="hidden lg:block h-[15px] w-[15px] rounded-full border-2 mb-6" style={{ borderColor: 'var(--signal)', background: 'var(--paper)' }} />
                <p className="font-mono-custom text-[12px] tracking-[0.18em] uppercase" style={{ color: 'var(--ink-3)' }}>0{i + 1} · {s.stage}</p>
                <h3 className="font-display font-bold text-[24px] leading-[1.15] mt-2 mb-5" style={{ textWrap: 'balance' }}>{s.question}</h3>
                <ul className="space-y-2.5">
                  {s.nodes.map((n) => {
                    const inner = (
                      <>
                        <span className="font-semibold text-[16px] flex items-center gap-1.5">
                          {n.name} {n.href && <ArrowUpRight size={15} style={{ color: 'var(--cobalt)' }} />}
                        </span>
                        <span className="block text-[13.5px] leading-snug mt-0.5" style={{ color: 'var(--ink-2)' }}>{n.note}</span>
                      </>
                    );
                    return (
                      <li key={n.name} data-flow-node className="rounded-[10px] border px-4 py-3 transition-colors hover:border-[var(--cobalt)]" style={{ borderColor: 'var(--rule)', background: 'var(--sheet)' }}>
                        {n.href ? <Link href={n.href} className="block">{inner}</Link> : inner}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Work, as a horizontal reel ───────────────────────────────── */
export function Work() {
  return (
    <section data-reel id="work" className="relative overflow-hidden py-24">
      <div className={wrap + ' w-full'}>
        <Heading compact eyebrow="Selected work" title="Seven things I shipped." aside="Company code is private; every case study covers the problem, the build and what changed." />
      </div>
      <div data-reel-track className="reel-track max-w-[1320px] mx-auto px-4 md:px-8">
        {projects.map((p, i) => {
          const m = projectMedia[p.slug];
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              data-tilt
              className="group relative flex flex-col rounded-[18px] overflow-hidden border"
              style={{ borderColor: 'var(--rule)', background: 'var(--sheet)' }}
            >
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: 'var(--paper-2)' }}>
                {m?.video ? (
                  <video data-src={m.video} poster={m.poster} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m?.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                )}
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(400px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.14), transparent 60%)' }} />
                <span className="absolute left-4 top-4 font-mono-custom text-[12px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(7,18,38,0.72)', color: '#E8EBEF' }}>
                  0{i + 1} / 0{projects.length}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-bold text-[28px] md:text-[30px] leading-[1.05] tracking-tight">{p.title}</h3>
                  <ArrowUpRight size={26} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'var(--cobalt)' }} />
                </div>
                <p className="mt-3 mb-6 text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>{p.line}</p>
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t pt-5" style={{ borderColor: 'var(--rule)' }}>
                  {p.stats.map((s) => (
                    <div key={s.l}>
                      <dt data-count className="font-mono-custom text-[24px] leading-none">{s.v}</dt>
                      <dd className="text-[13px] mt-1.5" style={{ color: 'var(--ink-3)' }}>{s.l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ── 4. Websites ─────────────────────────────────────────────────── */
export function Sites() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-20">
      <div className={wrap}>
        <Heading id="websites" eyebrow="Websites" title="Sites with a point of view." aside="Built end to end for real clients, each in its own design language. Open one to see the design decisions behind it." />
        <ul className="grid gap-6 md:grid-cols-6">
          {websites.map((w, i) => (
            <li key={w.slug} data-reveal className={i < 2 ? 'md:col-span-3' : 'md:col-span-2'}>
              <Link href={`/websites/${w.slug}/`} data-tilt className="group block rounded-[18px] overflow-hidden border h-full" style={{ borderColor: 'var(--rule)', background: 'var(--sheet)' }}>
                <div className="relative overflow-hidden aspect-[16/10]">
                  <video data-hover data-src={`/media/${siteMedia[w.slug]}.mp4`} poster={`/media/posters/${siteMedia[w.slug]}.jpg`} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: w.color }} />
                </div>
                <div className="p-5 md:p-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-[22px] leading-tight">{w.name}</h3>
                    <p className="text-[14px] mt-1" style={{ color: 'var(--ink-3)' }}>{w.kind} · {w.location}</p>
                  </div>
                  <ArrowUpRight size={22} className="shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--cobalt)' }} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 5. Statement, lit by scroll ─────────────────────────────────── */
export function Statement() {
  const text =
    'Most of what slows a growing business down is not strategy. It is the follow-up nobody sent, the report built by hand every Monday, the number nobody trusts. I find those, and I build the thing that makes them go away.';
  return (
    <section className="pt-16 md:pt-20 pb-28 md:pb-40">
      <div className={wrap}>
        <p data-statement className="display-tight font-extrabold max-w-[18ch] md:max-w-[22ch]" style={{ fontSize: 'clamp(38px, 6.4vw, 92px)', lineHeight: 0.98 }}>
          {text.split(' ').map((w, i, all) => (
            <span key={i}>
              <span className="sw">{w}</span>
              {i < all.length - 1 ? ' ' : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ── 6. Experience timeline ──────────────────────────────────────── */
export function Experience() {
  return (
    <section className="py-24 md:py-32">
      <div className={wrap}>
        <Heading id="experience" eyebrow="Experience" title="Five roles since 2020." aside="From data pipelines to a founders' office: the through-line is turning messy operations into systems." />
        <div className="relative pl-8 md:pl-14">
          <div aria-hidden className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px" style={{ background: 'var(--rule)' }} />
          <div data-timeline-line aria-hidden className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px" style={{ background: 'linear-gradient(var(--cobalt), var(--signal))' }} />
          <ol className="space-y-16 md:space-y-20">
            {roles.map((r) => (
              <li key={r.company} data-reveal className="relative grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <span aria-hidden className="absolute -left-8 md:-left-14 top-1.5 h-[15px] w-[15px] rounded-full border-2" style={{ borderColor: 'var(--signal)', background: 'var(--paper)' }} />
                <div>
                  <p className="font-mono-custom text-[13px]" style={{ color: 'var(--signal)' }}>{r.period}</p>
                  <p className="text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>{r.place}</p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[28px] md:text-[34px] leading-[1.08] tracking-tight">{r.company}</h3>
                  <p className="text-[15px] mt-1" style={{ color: 'var(--ink-2)' }}>{r.role}</p>
                  <p className="text-[18px] md:text-[20px] mt-4 max-w-[52ch]">{r.headline}</p>
                  {r.results.length > 0 && (
                    <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-5">
                      {r.results.map((x) => (
                        <div key={x.l} className="border-t pt-3" style={{ borderColor: 'var(--rule)' }}>
                          <dt data-count className="font-mono-custom text-[28px] leading-none" style={{ color: 'var(--cobalt)' }}>{x.v}</dt>
                          <dd className="text-[13px] mt-2" style={{ color: 'var(--ink-3)' }}>{x.l}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="mt-6 space-y-2.5 max-w-[66ch]">
                    {r.did.map((d) => (
                      <li key={d} className="text-[15px] leading-[1.6] flex gap-3" style={{ color: 'var(--ink-2)' }}>
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--ink-3)' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono-custom text-[12px] leading-relaxed" style={{ color: 'var(--ink-3)' }}>{r.tools.join(' · ')}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── 7. Toolkit marquee ──────────────────────────────────────────── */
export function Toolkit() {
  const all = toolkit.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];
  return (
    <section aria-label="Toolkit" className="py-16 md:py-24 border-y overflow-hidden" style={{ borderColor: 'var(--rule)' }}>
      {rows.map((row, r) => (
        <div key={r} className="marquee-wrap py-2 md:py-3">
          <div className={`marquee ${r === 0 ? 'marquee-l' : 'marquee-r'}`}>
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0">
                {row.map((t) => (
                  <li key={t} className="display-tight font-extrabold whitespace-nowrap px-5 md:px-8 flex items-center gap-5 md:gap-8" style={{ fontSize: 'clamp(34px, 5.5vw, 76px)', color: r === 0 ? 'var(--ink)' : 'transparent', WebkitTextStroke: r === 1 ? '1.2px var(--ink-2)' : undefined }}>
                    {t}
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--signal)' }} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 8. About (the one light section) ────────────────────────────── */
export function About() {
  return (
    <section className="day py-24 md:py-36">
      <div className={wrap + ' grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 items-start'}>
        <figure className="lg:sticky lg:top-24">
          <div data-clip className="relative aspect-[9/11] overflow-hidden rounded-[18px]" style={{ background: 'var(--paper-2)' }}>
            <div data-parallax className="absolute -inset-y-[10%] inset-x-0">
              <Image src="/dp.jpeg" alt="Dhruv Shricharan in Kotor, Montenegro" fill sizes="(min-width:1024px) 520px, 100vw" className="object-cover" />
            </div>
          </div>
          <figcaption className="mt-3 text-[13px]" style={{ color: 'var(--ink-3)' }}>
            Founders&apos; Office at Digital Advantage Media. Before that, Decision Scientist for Mars Inc.
          </figcaption>
        </figure>

        <div>
          <Heading eyebrow="About" title="Off the clock." />
          <ul className="border-t" style={{ borderColor: 'var(--ink)' }}>
            {offClock.map((o) => {
              const row = (
                <>
                  <span className="font-display font-bold text-[22px] md:text-[26px] leading-tight flex items-center gap-2">
                    {o.what} {o.href && <ArrowUpRight size={20} style={{ color: 'var(--cobalt)' }} />}
                  </span>
                  <span className="text-[15px] md:max-w-[38ch] md:text-right" style={{ color: 'var(--ink-2)' }}>{o.detail}</span>
                </>
              );
              const cls = 'group relative flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-6 py-5 border-b';
              return (
                <li key={o.what} data-reveal>
                  {o.href ? (
                    <Link href={o.href} className={cls} style={{ borderColor: 'var(--rule)' }}>
                      {row}
                      <span aria-hidden className="absolute left-0 bottom-[-1px] h-[2px] w-0 group-hover:w-full transition-[width] duration-500" style={{ background: 'var(--cobalt)' }} />
                    </Link>
                  ) : (
                    <div className={cls} style={{ borderColor: 'var(--rule)' }}>{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <dl data-reveal className="mt-12 grid gap-6 sm:grid-cols-2">
            {education.map((e) => (
              <div key={e.school}>
                <dt className="font-semibold">{e.school}</dt>
                <dd className="text-[14px] mt-1" style={{ color: 'var(--ink-2)' }}>{e.what} · {e.when}</dd>
              </div>
            ))}
          </dl>
          <p data-reveal className="mt-6 text-[14px]" style={{ color: 'var(--ink-3)' }}>{languages}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 9. Contact ──────────────────────────────────────────────────── */
export function Contact() {
  const word = "Let's talk.";
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-44">
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(111,137,255,0.25), transparent 70%)' }} />
      <div className={wrap + ' relative'}>
        <p className="font-mono-custom text-[12px] tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--signal)' }}>Contact</p>
        <a href={`mailto:${EMAIL}`} className="wave display-tight font-extrabold block" style={{ fontSize: 'clamp(76px, 17vw, 260px)' }} aria-label={`Email ${EMAIL}`}>
          {[...word].map((c, i) => (
            <span key={i} aria-hidden style={{ ['--i' as string]: i }}>{c === ' ' ? ' ' : c}</span>
          ))}
        </a>
        <div data-reveal className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="text-[19px] md:text-[22px] max-w-[40ch]" style={{ color: 'var(--ink-2)' }}>
            Hiring for growth, operations or a founders&apos; office, or have a system that needs building? Write to me.
          </p>
          <div className="flex flex-wrap gap-3">
            <a data-magnetic href={`mailto:${EMAIL}`} className="px-6 py-3 rounded-full text-[15px] font-medium" style={{ background: 'var(--signal)', color: '#0B1B3A' }}>
              {EMAIL}
            </a>
            <a data-magnetic href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-[15px] font-medium" style={{ border: '1px solid var(--rule)' }}>LinkedIn</a>
            <a data-magnetic href={GITHUB} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full text-[15px] font-medium" style={{ border: '1px solid var(--rule)' }}>GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
