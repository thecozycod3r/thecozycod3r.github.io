import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Motion from '@/components/deck/Motion';
import { Suit, isRed, type SuitName } from '@/components/deck/Suit';
import { Card, Index, Back } from '@/components/deck/Card';
import { EMAIL, projects, offClock } from '@/data/profile';

interface Tag { label: string; color: string; bg: string }
interface Repo { url: string; label?: string; private?: boolean }
interface Live { url: string; label: string }
interface Media { video?: string; poster: string }
/** A small card in the row of other pages. `image` makes it a picture card. */
export interface MoreCard { href: string; label: string; image?: string }

interface Props {
  title: string;
  subtitle: string;
  period: string;
  company: string;
  tags: Tag[];
  color: string;
  accentBg: string;
  repos?: Repo[];
  live?: Live;
  back?: { href: string; label: string };
  /** Hero media; case studies fall back to the footage mapped from their title. */
  media?: Media;
  /** Override the "next" link (website pages pass the next website). */
  next?: { href: string; label: string; kicker: string };
  /** Website pages: the site's own colours, printed as the card drawn in the hero. */
  swatch?: { colors: string[]; caption: string };
  /** Override the row of other pages under the "next" link. */
  more?: { heading: string; cards: MoreCard[] };
  children: React.ReactNode;
}

/* Tool footage / screenshots per case study, keyed by title. */
const MEDIA: Record<string, Media> = {
  Cerno: { video: '/media/cerno.mp4', poster: '/media/posters/cerno.jpg' },
  Neo: { video: '/media/neo.mp4', poster: '/media/posters/neo.jpg' },
  Tempo: { video: '/media/tempo.mp4', poster: '/media/posters/tempo.jpg' },
  'DAM Creative Studio': { video: '/media/studio.mp4', poster: '/media/posters/studio.jpg' },
  'A.R.T.H.U.R.': { video: '/media/arthur.mp4', poster: '/media/posters/arthur.jpg' },
  'Table Night': { video: '/media/tablenight.mp4', poster: '/media/posters/tablenight.jpg' },
  'P&L Dashboard': { poster: '/screenshots/pl-overview.jpg' },
  'Asana Operations Overhaul': { poster: '/screenshots/asana-board.jpg' },
};

/* Reading order for "next case study": the Work list, then the side projects. */
const ORDER = [
  ...projects.map((p) => ({ href: `/projects/${p.slug}/`, label: p.title })),
  ...offClock.filter((o) => o.href).map((o) => ({ href: o.href!, label: o.what })),
];

/* Case-study page titles that differ from their Work-list titles. */
const ALIAS: Record<string, string> = { 'Social Media Planning Tool': 'Social Media Planner' };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
const matches = (a: string, b: string) => norm(a).includes(norm(b)) || norm(b).includes(norm(a));

function mediaFor(title: string, explicit?: Media): Media | undefined {
  if (explicit) return explicit;
  if (/social media/i.test(title)) return { poster: '/screenshots/social-calendar.jpg' };
  // Page titles are sometimes longer than the names the footage is filed under.
  const key = Object.keys(MEDIA).find((k) => k === title) ?? Object.keys(MEDIA).find((k) => matches(k, title));
  return key ? MEDIA[key] : undefined;
}

/* The card a page belongs to: its suit, the figure printed in the corner and
   what that figure counts. Side projects are not in the hand, so they draw
   the ace of spades. */
function cardFor(href: string | undefined): { value: string; suit: SuitName; caption?: string } {
  const p = projects.find((x) => href === `/projects/${x.slug}/`);
  return p ? { value: p.stats[p.corner].v, suit: p.suit, caption: p.stats[p.corner].l } : { value: 'A', suit: 'spade' };
}

/* The title, a word at a time so it can rise on load. Whole words rather
   than letters, so the pairs inside them keep their kerning. */
function Rising({ text }: { text: string }) {
  return (
    <span aria-hidden="true">
      {text.split(' ').map((word, w) => (
        <span key={w} className="rise"><span>{word}</span></span>
      ))}
    </span>
  );
}

export default function ProjectLayout({ title, subtitle, period, company, tags, repos, live, back = { href: '/#work', label: 'All work' }, media, next, swatch, more, children }: Props) {
  const m = mediaFor(title, media);
  const at = ORDER.findIndex((o) => matches(ALIAS[title] ?? title, o.label));
  const n = next ?? { ...ORDER[(at + 1) % ORDER.length], kicker: 'Next case study' };
  const here = cardFor(at >= 0 ? ORDER[at].href : undefined);
  const there = cardFor(n.href);
  const rest: { heading: string; cards: MoreCard[] } = more ?? {
    heading: 'The rest of the work',
    cards: ORDER.filter((o, i) => i !== at && o.href !== n.href),
  };

  return (
    <div className="felt flex min-h-full flex-col">
      <Motion />
      <Navbar />
      <main className="flex-1">
        <header className={`sub-hero felt${m ? '' : ' no-media'}`} data-subhero>
          <div className="wrap">
            <Link href={back.href} className="sub-back"><ArrowLeft size={17} /> {back.label}</Link>
            <p className="sub-meta"><Suit s={here.suit} />{company}, {period}</p>
            <h1 className="sub-title display" aria-label={title}><Rising text={title} /></h1>

            <div className="sub-row">
              <div className="sub-lede" data-late>
                <p>{subtitle}</p>
                <ul className="sub-tags">
                  {tags.map((t) => <li key={t.label} className="tag">{t.label}</li>)}
                </ul>

                {(live || (repos && repos.length > 0)) && (
                  <div className="sub-links">
                    {live && (
                      <a href={live.url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                        {live.label} <ArrowUpRight size={17} />
                      </a>
                    )}
                    {repos?.map((r) => {
                      const name = r.url.replace('https://github.com/', '');
                      const href = r.private
                        ? `mailto:${EMAIL}?subject=${encodeURIComponent(`Code access request: ${name}`)}&body=${encodeURIComponent(`Hi Dhruv,\n\nI saw ${title} on your portfolio and would like to look at the code (${name}). My GitHub username is: \n\nThanks!`)}`
                        : r.url;
                      return (
                        <a key={r.url} href={href} {...(r.private ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="ink-link">
                          {r.private ? <Lock size={14} className="shrink-0" /> : null}
                          {r.private ? `Request access: ${r.label ?? name}` : `Source: ${r.label ?? name}`}
                          {r.private ? null : <ArrowUpRight size={14} />}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* The card this page was drawn as, on top of the pile it came from. */}
              <div className="sub-draw" aria-hidden="true">
                <span className="pc is-down sub-under"><span className="pc-flip"><span className="pc-face" /><Back /></span></span>
                <span className="sub-drawn" data-draw>
                  <span className="pc">
                    <span className="pc-flip">
                      {swatch ? (
                        <span className="pc-face pc-swatch">
                          <span className="sw-bands">{swatch.colors.map((c) => <i key={c} style={{ background: c }} />)}</span>
                          <span className="sw-cap">{swatch.caption}</span>
                        </span>
                      ) : (
                        <span className="pc-face">
                          <Index value={here.value} suit={here.suit} />
                          <Suit s={here.suit} className={`pc-pip${isRed(here.suit) ? ' red' : ''}`} />
                          {here.caption && <span className="pc-cap">{here.caption}</span>}
                        </span>
                      )}
                      <Back />
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {m && (
            <div className="sub-media-wrap">
              <div className="wrap">
                <div className="sub-media" data-setdown>
                  <div>
                    {m.video ? (
                      <video data-src={m.video} poster={m.poster} muted loop playsInline preload="none" aria-hidden />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.poster} alt={`${title}, screenshot`} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Paper for the long read. Sections count up as a run in this page's suit. */}
        <div className="stock">
          <div className="reading" data-suit={here.suit}>{children}</div>
        </div>

        {/* Next card, then the rest of the hand */}
        <section className="next flood">
          <div className="wrap">
            <Link href={n.href} className="next-link">
              <div>
                <p className="next-kicker">{n.kicker}</p>
                <p className="next-title display">{n.label.replace(' & ', ' &\u00a0')}</p>
              </div>
              <Card value={there.value} suit={there.suit} down />
            </Link>

            {rest.cards.length > 0 && (
              <nav className="more" aria-label={rest.heading}>
                <p className="more-head">{rest.heading}</p>
                <ul className="more-row">
                  {rest.cards.map((c) => {
                    const k = cardFor(c.href);
                    return (
                      <li key={c.href}>
                        <Link href={c.href} className="more-card">
                          <span className="pc">
                            <span className="pc-flip">
                              {c.image ? (
                                <span className="pc-face pc-pic">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={c.image} alt="" loading="lazy" />
                                  <span className="mc-title">{c.label}</span>
                                </span>
                              ) : (
                                <span className="pc-face">
                                  <Index value={k.value} suit={k.suit} />
                                  <span className="mc-title">{c.label}</span>
                                </span>
                              )}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
