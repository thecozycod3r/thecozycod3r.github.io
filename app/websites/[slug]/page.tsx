import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, TechBadge, BulletList } from '@/components/projects/ProjectSection';
import { websites, getWebsite } from '@/data/websites';

const CLIP: Record<string, string> = { 'yercaud-club': 'site-yercaud', nandipura: 'site-nandipura', bhramari: 'site-bhramari', 'anti-labs': 'site-antilabs', 'unravel-experiences': 'site-unravel' };

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
      live={{ url: site.url, label: `Visit ${site.urlLabel}` }}
      media={CLIP[site.slug] ? { video: `/media/${CLIP[site.slug]}.mp4`, poster: `/media/posters/${CLIP[site.slug]}.jpg` } : undefined}
      next={{ href: `/websites/${next.slug}/`, label: next.name, kicker: 'Next website' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-6 items-start mb-16">
        <Frame src={`/websites/${site.slug}-desktop.jpg`} alt={`${site.name} homepage on desktop`} ratio="1440 / 900" caption="Desktop" sizes="(min-width: 1080px) 760px, 75vw" />
        <div className="w-full max-w-[280px] mx-auto sm:max-w-none"><Frame src={`/websites/${site.slug}-mobile.jpg`} alt={`${site.name} homepage on a phone`} ratio="780 / 1688" caption="Phone" sizes="(min-width: 1080px) 250px, (min-width: 640px) 25vw, 280px" /></div>
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
            <li key={t.face} className="py-5 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 border-b border-[var(--rule)] last:border-b-0">
              <div>
                <p className="text-[13px]" style={{ color: 'var(--ink-3)' }}>{t.role}</p>
                {/* Specimen in the real face: Google Fonts with text= loads only these glyphs. */}
                <link rel="stylesheet" precedence="default" href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.face.split(',')[0].trim())}&text=${encodeURIComponent(t.face.split(',')[0].trim())}&display=swap`} />
                <p className="text-[24px] leading-tight" style={{ color: 'var(--ink)', fontFamily: `'${t.face.split(',')[0].trim()}', var(--font-plex-sans), serif` }}>{t.face.split(',')[0].trim()}</p>
                {t.face.includes(',') && <p className="text-[12px] mt-0.5" style={{ color: 'var(--ink-3)' }}>{t.face.split(',').slice(1).join(',').trim()}</p>}
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

    </ProjectLayout>
  );
}

function Frame({ src, alt, ratio, caption, sizes }: { src: string; alt: string; ratio: string; caption: string; sizes: string }) {
  return (
    <figure>
      <div data-clip className="relative w-full overflow-hidden rounded-[10px]" style={{ aspectRatio: ratio, border: '1px solid var(--rule)', background: 'var(--paper-2)', boxShadow: '0 18px 40px -24px rgba(11,27,58,0.35)' }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
      </div>
      <figcaption className="text-[13px] mt-2" style={{ color: 'var(--ink-3)' }}>{caption}</figcaption>
    </figure>
  );
}
