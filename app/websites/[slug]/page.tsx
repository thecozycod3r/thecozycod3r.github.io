import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, TechBadge, BulletList } from '@/components/projects/ProjectSection';
import { websites, getWebsite } from '@/data/websites';

export function generateStaticParams() {
  return websites.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getWebsite(slug);
  return { title: site ? `${site.name} website — Dhruv Shricharan` : 'Websites — Dhruv Shricharan' };
}

export default async function WebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getWebsite(slug);
  if (!site) notFound();

  const i = websites.findIndex((w) => w.slug === slug);
  const next = websites[(i + 1) % websites.length];
  const { color, bg } = site;

  return (
    <ProjectLayout
      title={site.name}
      subtitle={site.summary}
      period={site.year}
      company={`${site.kind}, ${site.location}`}
      color={color}
      accentBg={bg}
      back={{ href: '/websites/', label: 'All websites' }}
      tags={[{ label: 'Website', color, bg }, { label: site.role, color, bg }]}
    >
      <div className="mb-14 -mt-4 flex flex-wrap items-center gap-3">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[15px] px-5 py-2.5 rounded-full font-medium transition-colors hover:bg-[var(--ink)]"
          style={{ color: '#fff', background: 'var(--cobalt)' }}
        >
          Visit {site.urlLabel} <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-4 md:gap-6 items-start mb-16">
        <Frame src={`/websites/${site.slug}-desktop.jpg`} alt={`${site.name} homepage on desktop`} ratio="1440 / 900" caption="Desktop" sizes="(min-width: 1080px) 760px, 75vw" />
        <Frame src={`/websites/${site.slug}-mobile.jpg`} alt={`${site.name} homepage on a phone`} ratio="780 / 1688" caption="Phone" sizes="(min-width: 1080px) 250px, 25vw" />
      </div>

      <ProjectSection label="The brief" title="What the site had to do.">
        <p className="text-[17px] leading-[1.65] max-w-[64ch]" style={{ color: 'var(--ink-2)' }}>
          {site.brief}
        </p>
      </ProjectSection>

      <ProjectSection label="Design language" title="How it looks, and why.">
        <div className="mb-12">
          <BulletList items={site.language} color={color} />
        </div>

        <h3 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--ink)' }}>Palette</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {site.palette.map((s) => (
            <div key={s.hex}>
              <div className="h-20 rounded-[4px]" style={{ background: s.hex, border: '1px solid var(--rule)' }} />
              <p className="text-[14px] mt-2" style={{ color: 'var(--ink)' }}>{s.name}</p>
              <p className="text-[12px] font-mono-custom" style={{ color: 'var(--ink-3)' }}>{s.hex}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[16px] font-semibold mb-1" style={{ color: 'var(--ink)' }}>Typography</h3>
        <ul>
          {site.type.map((t) => (
            <li key={t.face} className="py-5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6" style={{ borderBottom: '1px solid var(--rule)' }}>
              <div>
                <p className="text-[13px]" style={{ color: 'var(--ink-3)' }}>{t.role}</p>
                <p className="font-display font-bold text-[22px] leading-tight" style={{ color: 'var(--ink)' }}>{t.face}</p>
              </div>
              <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>{t.why}</p>
            </li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection label="Decisions" title="Why it works the way it does.">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          {site.decisions.map((d) => (
            <li key={d.title} className="pt-4" style={{ borderTop: `3px solid ${color}` }}>
              <h4 className="text-[17px] font-semibold mb-2" style={{ color: 'var(--ink)' }}>{d.title}</h4>
              <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>{d.body}</p>
            </li>
          ))}
        </ul>
      </ProjectSection>

      <ProjectSection label="Built with" title="Stack.">
        <div className="flex flex-wrap gap-2">
          {site.stack.map((s) => (
            <TechBadge key={s} name={s} />
          ))}
        </div>
      </ProjectSection>

      <Link href={`/websites/${next.slug}/`} className="group block py-6" style={{ borderTop: '2px solid var(--ink)' }}>
        <p className="text-[14px] mb-1" style={{ color: 'var(--ink-3)' }}>Next website</p>
        <p className="display-tight font-extrabold inline-flex items-start gap-2 group-hover:text-[var(--cobalt)] transition-colors" style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: 'var(--ink)' }}>
          {next.name} <ArrowUpRight size={32} className="mt-2" style={{ color: 'var(--cobalt)' }} />
        </p>
      </Link>
    </ProjectLayout>
  );
}

function Frame({ src, alt, ratio, caption, sizes }: { src: string; alt: string; ratio: string; caption: string; sizes: string }) {
  return (
    <figure>
      <div className="relative w-full overflow-hidden rounded-[4px]" style={{ aspectRatio: ratio, border: '1px solid var(--rule)', background: 'var(--paper-2)', boxShadow: '0 18px 40px -24px rgba(11,27,58,0.35)' }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
      <figcaption className="text-[13px] mt-2" style={{ color: 'var(--ink-3)' }}>{caption}</figcaption>
    </figure>
  );
}
