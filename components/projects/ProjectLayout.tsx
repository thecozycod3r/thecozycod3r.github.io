import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EMAIL } from '@/data/profile';

interface Tag { label: string; color: string; bg: string }
interface Repo { url: string; label?: string; private?: boolean }
interface Live { url: string; label: string }

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
  children: React.ReactNode;
}

export default function ProjectLayout({ title, subtitle, period, company, tags, color, repos, live, back = { href: '/#work', label: 'All work' }, children }: Props) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <header className="pt-24 md:pt-32 pb-12 md:pb-16" style={{ borderBottom: '2px solid var(--ink)' }}>
          <div className="max-w-[1080px] mx-auto px-4 md:px-8">
            <Link href={back.href} className="inline-flex items-center gap-1.5 text-[14px] mb-10 hover:text-[var(--cobalt)] transition-colors" style={{ color: 'var(--ink-2)' }}>
              <ArrowLeft size={15} /> {back.label}
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} aria-hidden />
              <p className="text-[14px]" style={{ color: 'var(--ink-2)' }}>
                {company}, {period}
              </p>
            </div>

            <h1 className="display-tight font-extrabold" style={{ fontSize: 'clamp(52px, 10vw, 136px)', color: 'var(--ink)' }}>
              {title}
            </h1>

            <p className="mt-7 text-[18px] md:text-[21px] leading-[1.5] max-w-[46ch]" style={{ color: 'var(--ink)' }}>
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <span key={t.label} className="text-[13px] px-3 py-1 rounded-full" style={{ border: '1px solid var(--rule)', color: 'var(--ink-2)', background: 'var(--sheet)' }}>
                  {t.label}
                </span>
              ))}
            </div>

            {live && (
              <a
                href={live.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--cobalt)' }}
              >
                {live.label} <ArrowUpRight size={15} />
              </a>
            )}

            {repos && repos.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
                {repos.map((r) => {
                  const name = r.url.replace('https://github.com/', '');
                  const href = r.private
                    ? `mailto:${EMAIL}?subject=${encodeURIComponent(`Code access request: ${name}`)}&body=${encodeURIComponent(`Hi Dhruv,\n\nI saw ${title} on your portfolio and would like to look at the code (${name}). My GitHub username is: \n\nThanks!`)}`
                    : r.url;
                  return (
                    <a
                      key={r.url}
                      href={href}
                      {...(r.private ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="inline-flex items-center gap-1.5 ink-link"
                    >
                      {r.private ? <Lock size={13} /> : null}
                      {r.private ? `Request access to ${r.label ?? name}` : `Source: ${r.label ?? name}`}
                      {r.private ? null : <ArrowUpRight size={13} />}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        <div className="max-w-[1080px] mx-auto px-4 md:px-8 py-14 md:py-20">{children}</div>
      </main>
      <Footer />
    </>
  );
}
