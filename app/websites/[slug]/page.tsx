import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';
import Footer from '@/components/Footer';
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
    <>
      <ProjectLayout
        title={site.name}
        subtitle={site.summary}
        period={site.year}
        company={`${site.kind} · ${site.location}`}
        color={color}
        accentBg={bg}
        back={{ href: '/websites', label: 'All websites' }}
        tags={[
          { label: 'Website', color, bg },
          { label: site.role, color: 'var(--gold)', bg: 'rgba(201,169,110,0.07)' },
        ]}
      >
        <div className="mb-16 flex flex-wrap items-center gap-3">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full"
            style={{ color: 'var(--bg)', background: color, fontWeight: 500 }}
          >
            Visit {site.urlLabel} <ArrowUpRight size={14} />
          </a>
        </div>

        <ProjectSection label="The Brief" title="What the site had to do.">
          <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--muted)', maxWidth: 680 }}>
            {site.brief}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-start">
            <Screenshot src={`/websites/${site.slug}-desktop.jpg`} alt={`${site.name} homepage on desktop`} caption="Desktop" badge={site.urlLabel === "Preview build" ? "Preview build" : "Live site"} width={1440} height={900} />
            <Screenshot src={`/websites/${site.slug}-mobile.jpg`} alt={`${site.name} homepage on a phone`} caption="Phone" badge={site.urlLabel === "Preview build" ? "Preview build" : "Live site"} width={780} height={1688} />
          </div>
        </ProjectSection>

        <ProjectSection label="Design Language" title="How it looks, and why.">
          <div className="mb-10">
            <BulletList items={site.language} color={color} />
          </div>

          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}>
            Palette
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
            {site.palette.map((s) => (
              <div key={s.hex} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-card)' }}>
                <div style={{ background: s.hex, height: 72 }} />
                <div className="px-3 py-2.5">
                  <p className="text-sm" style={{ color: 'var(--cream)' }}>{s.name}</p>
                  <p className="text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}>{s.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}>
            Typography
          </p>
          <div className="space-y-3">
            {site.type.map((t) => (
              <div key={t.face} className="p-5 rounded-xl grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color, fontFamily: 'var(--font-jb-mono)' }}>{t.role}</p>
                  <p className="font-display text-xl" style={{ color: 'var(--cream)' }}>{t.face}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t.why}</p>
              </div>
            ))}
          </div>
        </ProjectSection>

        <ProjectSection label="Decisions" title="Why everything is the way it is.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {site.decisions.map((d, n) => (
              <FeatureCard key={d.title} icon={String(n + 1).padStart(2, '0')} title={d.title} desc={d.body} color={color} bg={bg} />
            ))}
          </div>
        </ProjectSection>

        <ProjectSection label="Built With" title="Stack.">
          <div className="flex flex-wrap gap-2">
            {site.stack.map((s) => (
              <TechBadge key={s} name={s} color={color} />
            ))}
          </div>
        </ProjectSection>

        <Link
          href={`/websites/${next.slug}`}
          className="block p-6 rounded-2xl transition-colors duration-200"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-jb-mono)' }}>
            Next website
          </p>
          <p className="font-display text-2xl inline-flex items-center gap-2" style={{ color: 'var(--cream)' }}>
            {next.name} <ArrowUpRight size={18} style={{ color: next.color }} />
          </p>
        </Link>
      </ProjectLayout>
      <Footer />
    </>
  );
}
