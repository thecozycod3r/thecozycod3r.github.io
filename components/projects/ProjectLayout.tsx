import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/night/MotionRoot';
import { Chars } from '@/components/night/text';
import { EMAIL, projects, offClock } from '@/data/profile';

interface Tag { label: string; color: string; bg: string }
interface Repo { url: string; label?: string; private?: boolean }
interface Live { url: string; label: string }
interface Media { video?: string; poster: string }

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
  'Asana Operations Overhaul': { poster: '/screenshots/asana-myndwell.jpg' },
};

/* Reading order for "next case study": the Work list, then the side projects. */
const ORDER = [
  ...projects.map((p) => ({ href: `/projects/${p.slug}/`, label: p.title })),
  ...offClock.filter((o) => o.href).map((o) => ({ href: o.href!, label: o.what })),
];

function mediaFor(title: string, explicit?: Media): Media | undefined {
  if (explicit) return explicit;
  if (MEDIA[title]) return MEDIA[title];
  if (/social media/i.test(title)) return { poster: '/screenshots/social-calendar.jpg' };
  return undefined;
}

/* Case-study page titles that differ from their Work-list titles. */
const ALIAS: Record<string, string> = { 'Social Media Planning Tool': 'Social Media Planner' };

function nextFor(pageTitle: string) {
  const title = ALIAS[pageTitle] ?? pageTitle;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
  const i = ORDER.findIndex((o) => norm(title).includes(norm(o.label)) || norm(o.label).includes(norm(title)));
  const n = ORDER[(i + 1) % ORDER.length];
  return { ...n, kicker: 'Next case study' };
}

export default function ProjectLayout({ title, subtitle, period, company, tags, color, repos, live, back = { href: '/#work', label: 'All work' }, media, next, children }: Props) {
  const m = mediaFor(title, media);
  const n = next ?? nextFor(title);

  return (
    <div className="night flex min-h-full flex-col">
      <MotionRoot />
      <Navbar />
      <main className="flex-1">
        {/* ── Night hero ── */}
        <header className="relative overflow-hidden pt-28 md:pt-36 pb-14 md:pb-20">
          <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(55% 60% at 80% 10%, ${color}40, transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(111,137,255,0.14), transparent 70%)` }} />
          <div aria-hidden className="grid-night absolute inset-0 opacity-60" />
          <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
            <Link href={back.href} className="hero-fade inline-flex min-h-11 items-center gap-1.5 text-[14px] mb-8 hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink-2)', ['--d' as string]: '0.1s' }}>
              <ArrowLeft size={15} /> {back.label}
            </Link>

            <div className="hero-fade flex items-center gap-3 mb-6" style={{ ['--d' as string]: '0.15s' }}>
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 18px ${color}` }} aria-hidden />
              <p className="font-mono-custom text-[13px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink-2)' }}>
                {company} · {period}
              </p>
            </div>

            <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(56px, 11vw, 168px)' }}>
              <Chars text={title} />
            </h1>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <p className="hero-fade text-[18px] md:text-[22px] leading-[1.5] max-w-[50ch]" style={{ ['--d' as string]: '0.6s' }}>
                {subtitle}
              </p>
              <div className="hero-fade flex flex-wrap items-center gap-2 lg:justify-end lg:max-w-[360px]" style={{ ['--d' as string]: '0.75s' }}>
                {tags.map((t) => (
                  <span key={t.label} className="text-[13px] px-3 py-1 rounded-full" style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)', background: 'var(--sheet)' }}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            {(live || (repos && repos.length > 0)) && (
              <div className="hero-fade mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]" style={{ ['--d' as string]: '0.85s' }}>
                {live && (
                  <a data-magnetic href={live.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium" style={{ background: 'var(--signal)', color: '#0B1B3A' }}>
                    {live.label} <ArrowUpRight size={15} />
                  </a>
                )}
                {repos?.map((r) => {
                  const name = r.url.replace('https://github.com/', '');
                  const href = r.private
                    ? `mailto:${EMAIL}?subject=${encodeURIComponent(`Code access request: ${name}`)}&body=${encodeURIComponent(`Hi Dhruv,\n\nI saw ${title} on your portfolio and would like to look at the code (${name}). My GitHub username is: \n\nThanks!`)}`
                    : r.url;
                  return (
                    <a key={r.url} href={href} {...(r.private ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="inline-flex min-h-11 items-center gap-1.5 ink-link">
                      {r.private ? <Lock size={13} className="shrink-0" /> : null}
                      {r.private ? `Request access: ${r.label ?? name}` : `Source: ${r.label ?? name}`}
                      {r.private ? null : <ArrowUpRight size={13} />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {m && (
            <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 mt-14 md:mt-20">
              <div data-clip className="relative aspect-[16/10] overflow-hidden rounded-[20px] border" style={{ borderColor: 'var(--rule)', background: 'var(--paper-2)', boxShadow: `0 24px 56px -32px ${color}88` }}>
                <div className="absolute inset-0">
                  {m.video ? (
                    <video data-src={m.video} poster={m.poster} muted loop playsInline preload="none" aria-hidden className="h-full w-full object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.poster} alt={`${title}, screenshot`} className="h-full w-full object-cover object-top" />
                  )}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ── Light body for long reading ── */}
        <div className="day">
          <div className="max-w-[1080px] mx-auto px-4 md:px-8 py-16 md:py-24">{children}</div>
        </div>

        {/* ── Next ── */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(111,137,255,0.22), transparent 70%)' }} />
          <Link href={n.href} className="group relative block max-w-[1320px] mx-auto px-4 md:px-8 py-20 md:py-28">
            <p className="font-mono-custom text-[12px] tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--signal)' }}>{n.kicker}</p>
            <span className="display-tight font-extrabold flex items-start gap-3 min-w-0" style={{ fontSize: 'clamp(44px, 9vw, 140px)' }}>
              <span className="sr-only">{n.label}</span>
              <span aria-hidden className="min-w-0">
                {n.label.split(' ').map((word, w, all) => {
                  const offset = all.slice(0, w).join(' ').length + (w ? 1 : 0);
                  return (
                    <span key={w}>
                      <span className="wave inline-block whitespace-nowrap">
                        {[...word].map((c, i) => (
                          <span key={i} style={{ ['--i' as string]: offset + i }}>{c}</span>
                        ))}
                      </span>
                      {w < all.length - 1 ? ' ' : null}
                    </span>
                  );
                })}
              </span>
              <ArrowUpRight aria-hidden className="mt-[0.12em] h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" style={{ color: 'var(--cobalt)' }} />
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
