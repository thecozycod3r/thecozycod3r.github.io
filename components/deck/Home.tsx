import Link from 'next/link';
import { ArrowUpRight, ArrowDown, Plus } from 'lucide-react';
import {
  systemMap, projects, roles, toolkit, languages, education, offClock,
  EMAIL, LINKEDIN, GITHUB, RESUME,
} from '@/data/profile';
import { websites } from '@/data/websites';
import { Suit, isRed, type SuitName } from './Suit';
import { Card, Court, Index, Back } from './Card';

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/* Real tool footage where it exists, a screenshot where it does not. */
const projectMedia: Record<string, { video?: string; poster: string }> = {
  'analytics-dashboard': { video: '/media/cerno.mp4', poster: '/media/posters/cerno.jpg' },
  neo: { video: '/media/neo.mp4', poster: '/media/posters/neo.jpg' },
  tempo: { video: '/media/tempo.mp4', poster: '/media/posters/tempo.jpg' },
  'creative-studio': { video: '/media/studio.mp4', poster: '/media/posters/studio.jpg' },
  'social-media-tool': { poster: '/screenshots/social-calendar.jpg' },
  'pl-dashboard': { poster: '/screenshots/pl-overview.jpg' },
  'asana-ops': { poster: '/screenshots/asana-board.jpg' },
};

/* The cards that are not projects: they fill out the deck during the deal
   and end up face down in the pile beside the name. */
const REST: [string, SuitName][] = [
  ['9', 'spade'], ['K', 'heart'], ['3', 'club'], ['J', 'diamond'], ['7', 'spade'], ['Q', 'club'], ['2', 'heart'],
  ['10', 'spade'], ['5', 'diamond'], ['8', 'club'], ['A', 'heart'], ['6', 'diamond'], ['4', 'spade'], ['J', 'club'],
];

function Rise({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="rise"><span>{c}</span></span>
      ))}
    </>
  );
}

/* ── 1. The deal ──────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section data-hero className="hero felt">
      <div className="hero-in wrap">
        <div className="hero-top">
          <h1 className="hero-name display">
            <span className="sr-only">Dhruv Shricharan</span>
            <span aria-hidden className="ln"><Rise text="Dhruv" /></span>
            <span aria-hidden className="ln"><Rise text="Shricharan" /></span>
          </h1>

          <div className="hero-deck">
            {REST.map(([v, s], k) => (
              <span key={k} className="hc" data-role="rest" style={{ '--k': k } as Vars}>
                <span className="hc-move"><span className="hc-tilt"><Card value={v} suit={s} down /></span></span>
              </span>
            ))}
            <span className="hc" data-role="court" style={{ '--k': REST.length } as Vars}>
              <span className="hc-move"><span className="hc-tilt"><Court twoSided /></span></span>
            </span>
          </div>
        </div>

        <div className="hero-foot">
          <div className="hero-copy">
            <p data-late>
              I build the systems a growing business runs on: how it finds clients, delivers the work, and knows whether it is making money.
            </p>
            <div className="hero-cta" data-late>
              <Link href="#work" className="btn btn-solid">See the work <ArrowDown size={17} /></Link>
              <a href={RESUME} download className="btn btn-line">Download résumé</a>
            </div>
          </div>

          <div className="hero-hand">
            {projects.map((p, i) => {
              const c = p.stats[p.corner];
              return (
                <Link key={p.slug} href={`/projects/${p.slug}/`} className="hc" data-role="hand" style={{ '--i': i } as Vars} aria-label={`${p.title}: ${c.v} ${c.l}`}>
                  <span className="hc-move">
                    <span className="hc-tilt">
                      <span className="pc">
                        <span className="pc-flip">
                          <span className="pc-face">
                            <Index value={c.v} suit={p.suit} />
                            <span className="hf-win">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={projectMedia[p.slug].poster.replace(/(\/media\/posters\/[^.]+)\.jpg$/, '$1-sm.jpg')} alt="" width={320} height={200} />
                            </span>
                            <span className="hf-title">
                              {p.title}
                              <span className="hf-label">{c.l}</span>
                            </span>
                          </span>
                          <Back />
                        </span>
                      </span>
                    </span>
                  </span>
                </Link>
              );
            })}
            <p className="hand-note" data-late><b>Pick a card.</b> Each one is something I shipped.</p>
          </div>
        </div>

        <ul className="hero-suits" data-late>
          {systemMap.map((s) => (
            <li key={s.stage}>
              <Link href="#system"><Suit s={s.suit} />{s.stage}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 2. Four suits ────────────────────────────────────────────────── */
export function System() {
  return (
    <section id="system" className="band felt">
      <div className="wrap">
        <header className="head">
          <h2 className="display">One business, four questions.</h2>
          <p>Each stage asks one question. Under it, what I built so the answer is a number, not a guess.</p>
        </header>
        <ol className="suits" data-deal>
          {systemMap.map((s) => (
            <li key={s.stage} className="suit">
              <span data-dealcard><Card value="A" suit={s.suit} /></span>
              <div>
                <p className="suit-stage">{s.stage}</p>
                <h3 className="suit-q">{s.question}</h3>
              </div>
              <ul className="suit-nodes">
                {s.nodes.map((n) => (
                  <li key={n.name}>
                    {n.href ? (
                      <Link href={n.href} className="node">
                        <strong>{n.name}<ArrowUpRight size={17} aria-hidden /></strong>
                        <span>{n.note}</span>
                      </Link>
                    ) : (
                      <div className="node">
                        <strong>{n.name}</strong>
                        <span>{n.note}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 3. Work: seven cards, gone through one at a time ─────────────── */
export function Work() {
  return (
    <section id="work" className="band felt deep">
      <div className="wrap">
        <header className="head">
          <h2 className="display">Seven things I shipped.</h2>
          <p>Company code is private; every case study covers the problem, the build and what changed.</p>
        </header>
        <div className="jobs" data-jobs>
          {projects.map((p, i) => {
            const m = projectMedia[p.slug];
            const c = p.stats[p.corner];
            const other = p.stats[p.corner === 0 ? 1 : 0];
            return (
              <article key={p.slug} className="job" style={{ '--i': i } as Vars}>
                <div className="job-media">
                  {m.video ? (
                    <video data-src={m.video} poster={m.poster} muted loop playsInline preload="none" aria-hidden />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.poster} alt="" loading="lazy" />
                  )}
                </div>
                <div className="job-text">
                  <div className={`job-idx${isRed(p.suit) ? ' red' : ''}`}>
                    <b className="num">{c.v}</b>
                    <Suit s={p.suit} />
                    <small>{c.l}</small>
                  </div>
                  <h3 className="display">
                    <Link href={`/projects/${p.slug}/`} className="job-link">{p.title}</Link>
                  </h3>
                  <p className="job-line">{p.line}</p>
                  <div className="job-more">
                    {other ? <p><b>{other.v}</b>{other.l}</p> : <span />}
                    <span className="job-go" aria-hidden>Read the case study <ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Websites ──────────────────────────────────────────────────── */
export function Sites() {
  return (
    <section id="websites" className="band felt">
      <div className="wrap">
        <header className="head">
          <h2 className="display">Sites with a point of view.</h2>
          <p>Built end to end for real clients, each in its own design language. Open one to see the design decisions behind it.</p>
        </header>
        <ul className="sites" data-spread>
          {websites.map((w) => (
            <li key={w.slug} className="site" style={{ '--site': w.color } as Vars}>
              <div className="site-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/websites/${w.slug}-mobile.jpg`} alt="" loading="lazy" />
              </div>
              <h3><Link href={`/websites/${w.slug}/`}>{w.name}</Link><i aria-hidden /></h3>
              <p>{w.kind}, {w.location}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-center">
          <Link href="/websites/" className="btn btn-line">Compare all five side by side</Link>
        </p>
      </div>
    </section>
  );
}

/* ── 5. Statement, experience, toolkit: the paper stretch ─────────── */
export function Record() {
  return (
    <div className="stock">
      <section className="band">
        <div className="wrap">
          <p className="statement">
            Most of what slows a growing business down is not strategy. It is the follow-up nobody sent, the report built by hand every Monday, the number nobody trusts. I find those, and I build the thing that makes them go away.
          </p>
        </div>
      </section>

      <section id="experience" className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <header className="head">
            <h2 className="display">Five roles since 2020.</h2>
            <p>From data pipelines to a founders&apos; office: the through-line is turning messy operations into systems.</p>
          </header>
          <div className="roles">
            {roles.map((r, i) => {
              // "Mars Inc., via Mu Sigma": the employer of record goes to the line below.
              const [company, via] = r.company.split(', via ');
              return (
              <details key={r.company} className="role" open={i === 0}>
                <summary>
                  <span className="role-when num">{r.period}</span>
                  <span className="role-co display">{company}</span>
                  <span className="role-title">{r.role}{via ? ` via ${via}` : ''}, {r.place}</span>
                  <span className="role-plus" aria-hidden><Plus size={20} /></span>
                </summary>
                <div className="role-body">
                  <p className="role-lede">{r.headline}</p>
                  {r.results.length > 0 && (
                    <dl className="role-results">
                      {r.results.map((x) => (
                        <div key={x.l}>
                          <dt className="num">{x.v}</dt>
                          <dd>{x.l}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="role-did">
                    {r.did.map((d) => (
                      <li key={d}><Suit s="diamond" />{d}</li>
                    ))}
                  </ul>
                  <p className="role-tools">{r.tools.join(', ')}</p>
                </div>
              </details>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="kit-h" className="band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="kit-h" className="sr-only">Toolkit</h2>
          <div className="kit">
            {toolkit.map((g) => (
              <div key={g.group}>
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── 6. About ─────────────────────────────────────────────────────── */
export function About() {
  return (
    <section id="about" className="band felt">
      <div className="wrap about">
        <figure className="about-card">
          <span className="tiltable" data-tilt><Court /></span>
          <figcaption className="about-cap">
            Founders&apos; Office at Digital Advantage Media. Before that, Decision Scientist for Mars Inc.
          </figcaption>
        </figure>

        <div>
          <header className="head">
            <h2 className="display">Off the clock.</h2>
          </header>
          <ul className="off">
            {offClock.map((o) => (
              <li key={o.what}>
                {o.href ? (
                  <Link href={o.href} className="row">
                    <strong>{o.what}<ArrowUpRight size={21} aria-hidden /></strong>
                    <span>{o.detail}</span>
                  </Link>
                ) : (
                  <div className="row">
                    <strong>{o.what}</strong>
                    <span>{o.detail}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <dl className="school">
            {education.map((e) => (
              <div key={e.school}>
                <dt>{e.school}</dt>
                <dd>{e.what}, {e.when}</dd>
              </div>
            ))}
          </dl>
          <p className="langs">{languages}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 7. Contact ───────────────────────────────────────────────────── */
const DEALT: { v: string; s: SuitName; x: string; y: string; r: string; down?: boolean }[] = [
  { v: 'A', s: 'spade', x: '58%', y: '-34px', r: '-14deg' },
  { v: '', s: 'spade', x: '70%', y: '-58px', r: '9deg', down: true },
  { v: 'K', s: 'heart', x: '82%', y: '-22px', r: '-6deg' },
  { v: '', s: 'spade', x: '91%', y: '34px', r: '21deg', down: true },
  { v: 'A', s: 'diamond', x: '44%', y: '-76px', r: '17deg' },
  { v: '', s: 'spade', x: '94%', y: '46%', r: '-12deg', down: true },
];

export function Contact() {
  return (
    <section id="contact" className="contact flood">
      <div className="scatter" aria-hidden data-scatter>
        {DEALT.map((d, i) => (
          <span key={i} data-dealt style={{ left: d.x, top: d.y, rotate: d.r } as Vars}>
            <Card value={d.v || '2'} suit={d.s} down={d.down} />
          </span>
        ))}
      </div>
      <div className="wrap" style={{ position: 'relative' }}>
        <h2 className="display">
          <a href={`mailto:${EMAIL}`} aria-label={`Deal me in. Email ${EMAIL}`}>Deal me in.</a>
        </h2>
        <div className="contact-foot">
          <p>
            Hiring for growth, operations or a founders&apos; office, or have a system that needs building? Write to me.
          </p>
          <div className="contact-cta">
            <a href={`mailto:${EMAIL}`} className="btn btn-solid">{EMAIL}</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-line">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn btn-line">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
