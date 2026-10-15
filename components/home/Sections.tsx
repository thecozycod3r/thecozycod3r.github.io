import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { projects, roles, toolkit, languages, education, offClock, EMAIL, LINKEDIN, RESUME } from '@/data/profile';
import { websites } from '@/data/websites';

function SectionHead({ id, title, aside }: { id: string; title: string; aside?: React.ReactNode }) {
  return (
    <div id={id} className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-5 mb-2" style={{ borderBottom: '2px solid var(--ink)' }}>
      <h2 className="display-tight font-extrabold" style={{ fontSize: 'clamp(48px, 8vw, 104px)', color: 'var(--ink)' }}>
        {title}
      </h2>
      {aside && <div className="text-[15px] max-w-[42ch] md:text-right" style={{ color: 'var(--ink-2)' }}>{aside}</div>}
    </div>
  );
}

/* ── Selected work: an index of case studies ── */
export function Work() {
  return (
    <section className="pt-4 pb-16 md:pb-24">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <SectionHead id="work" title="Work" aside="Six things I designed and shipped. Each case study covers the problem, the build and what changed." />
        <ul>
          {projects.map((p) => (
            <li key={p.slug} style={{ borderBottom: '1px solid var(--rule)' }}>
              <Link
                href={`/projects/${p.slug}/`}
                className="group grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_200px] gap-x-8 gap-y-3 py-7 md:py-8 transition-colors hover:bg-[var(--sheet)] -mx-3 px-3 rounded-[4px]"
              >
                <div>
                  <h3 className="font-display font-bold text-[28px] md:text-[34px] leading-[1.05] tracking-tight flex items-start gap-2" style={{ color: 'var(--ink)' }}>
                    <span className="group-hover:text-[var(--cobalt)] transition-colors">{p.title}</span>
                    <ArrowUpRight size={22} className="mt-1.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--cobalt)' }} />
                  </h3>
                  <p className="text-[14px] mt-2" style={{ color: 'var(--ink-3)' }}>
                    {p.context}, {p.year}
                  </p>
                </div>
                <p className="text-[16px] leading-[1.55] max-w-[52ch]" style={{ color: 'var(--ink-2)' }}>
                  {p.line}
                </p>
                <dl className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-2">
                  {p.stats.map((s) => (
                    <div key={s.l}>
                      <dt className="font-mono-custom text-[20px] leading-none font-medium" style={{ color: 'var(--ink)' }}>{s.v}</dt>
                      <dd className="text-[13px] mt-1" style={{ color: 'var(--ink-3)' }}>{s.l}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Websites ── */
export function Websites() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--sheet)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <SectionHead
          id="websites"
          title="Websites"
          aside={<>Sites for a heritage club, a coffee estate, a villa, a studio and a travel brand. <Link href="/websites/" className="ink-link">How each one was designed</Link></>}
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10 mt-8">
          {websites.map((w, i) => (
            <li key={w.slug} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <Link href={`/websites/${w.slug}/`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]" style={{ border: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
                  <Image
                    src={`/websites/${w.slug}-desktop.jpg`}
                    alt={`${w.name} homepage`}
                    fill
                    sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-[20px] leading-tight group-hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink)' }}>
                      {w.name}
                    </h3>
                    <p className="text-[14px]" style={{ color: 'var(--ink-3)' }}>{w.kind}, {w.location}</p>
                  </div>
                  <span className="flex shrink-0 mt-1.5" aria-hidden>
                    {w.palette.slice(0, 4).map((s) => (
                      <span key={s.hex} className="w-3.5 h-3.5 -ml-1 first:ml-0 rounded-full" style={{ background: s.hex, boxShadow: '0 0 0 2px var(--sheet)' }} />
                    ))}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Experience: a real timeline, newest first ── */
export function Experience() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <SectionHead id="experience" title="Experience" aside="Five roles since 2020, from data pipelines to a founders' office." />
        <ol>
          {roles.map((r) => (
            <li key={r.company} className="grid grid-cols-1 md:grid-cols-[120px_minmax(0,1fr)] gap-x-8 py-8" style={{ borderBottom: '1px solid var(--rule)' }}>
              <p className="display-tight font-extrabold text-[40px] md:text-[48px] mb-3 md:mb-0" style={{ color: 'var(--rule)' }} aria-hidden>
                {r.start}
              </p>
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-6">
                  <h3 className="font-display font-bold text-[24px] md:text-[28px] leading-tight tracking-tight" style={{ color: 'var(--ink)' }}>
                    {r.company}
                  </h3>
                  {r.period !== r.start && <p className="text-[14px] shrink-0" style={{ color: 'var(--ink-3)' }}>{r.period}</p>}
                </div>
                <p className="text-[15px] mt-1" style={{ color: 'var(--ink-2)' }}>
                  {r.role}, {r.place}
                </p>
                <p className="text-[18px] leading-snug mt-4 max-w-[60ch]" style={{ color: 'var(--ink)' }}>
                  {r.headline}
                </p>

                {r.results.length > 0 && (
                  <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[760px]">
                    {r.results.map((x) => (
                      <div key={x.l} className="pl-3" style={{ borderLeft: '2px solid var(--cobalt)' }}>
                        <dt className="font-mono-custom text-[22px] leading-none font-medium" style={{ color: 'var(--ink)' }}>{x.v}</dt>
                        <dd className="text-[13px] mt-1.5 leading-snug" style={{ color: 'var(--ink-3)' }}>{x.l}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <details className="role mt-5">
                  <summary className="inline-flex items-center gap-1.5 text-[14px] font-medium" style={{ color: 'var(--cobalt)' }}>
                    <Plus size={15} className="chev" /> What I did
                  </summary>
                  <ul className="mt-4 space-y-2.5 max-w-[68ch]">
                    {r.did.map((d) => (
                      <li key={d} className="text-[15px] leading-[1.6] pl-4 relative" style={{ color: 'var(--ink-2)' }}>
                        <span className="absolute left-0 top-[11px] w-1.5 h-px" style={{ background: 'var(--ink-3)' }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[13px] font-mono-custom" style={{ color: 'var(--ink-3)' }}>
                    {r.tools.join(', ')}
                  </p>
                </details>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Toolkit, education, life outside work ── */
export function About() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <SectionHead id="toolkit" title="Toolkit" aside={languages} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-8">
          {toolkit.map((g) => (
            <div key={g.group}>
              <h3 className="font-display font-bold text-[18px] mb-3" style={{ color: 'var(--ink)' }}>{g.group}</h3>
              <ul className="space-y-1.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px]" style={{ color: 'var(--ink-2)' }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-16 md:mt-20">
          <div>
            <h3 className="font-display font-bold text-[24px] tracking-tight pb-3 mb-1" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}>Education</h3>
            <ul>
              {education.map((e) => (
                <li key={e.school} className="py-4 flex justify-between gap-6" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <div>
                    <p className="text-[16px] font-semibold" style={{ color: 'var(--ink)' }}>{e.school}</p>
                    <p className="text-[15px]" style={{ color: 'var(--ink-2)' }}>{e.what}</p>
                  </div>
                  <p className="text-[14px] shrink-0" style={{ color: 'var(--ink-3)' }}>{e.when}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-[24px] tracking-tight pb-3 mb-1" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}>Off the clock</h3>
            <ul>
              {offClock.map((o) => (
                <li key={o.what} className="py-4 grid grid-cols-[140px_1fr] gap-4" style={{ borderBottom: '1px solid var(--rule)' }}>
                  <p className="text-[16px] font-semibold" style={{ color: 'var(--ink)' }}>{o.what}</p>
                  <p className="text-[15px]" style={{ color: 'var(--ink-2)' }}>{o.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32" style={{ background: 'var(--ink)', color: 'var(--sheet)' }}>
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <p className="text-[17px] md:text-[19px] max-w-[46ch]" style={{ color: '#B9C3D6' }}>
          Hiring for growth, operations or a founders&apos; office, or need one of these systems built? Write to me.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-6 inline-block display-tight font-extrabold transition-colors hover:text-[var(--signal)]"
          style={{ fontSize: 'clamp(40px, 7.4vw, 104px)', lineHeight: 1 }}
        >
          {EMAIL.split('@')[0]}
          <wbr />@{EMAIL.split('@')[1]}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-white hover:text-[var(--ink)]" style={{ border: '1px solid #4A5878' }}>
            LinkedIn
          </a>
          <a href={RESUME} download className="px-5 py-2.5 rounded-full text-[15px] font-medium transition-colors hover:bg-white hover:text-[var(--ink)]" style={{ border: '1px solid #4A5878' }}>
            Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}
