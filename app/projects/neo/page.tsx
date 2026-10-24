import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList } from '@/components/projects/ProjectSection';

const COLOR = '#E90A79';
const BG = 'rgba(233,10,121,0.07)';

export const metadata = {
  title: 'Neo — Dhruv Shricharan',
};

export default function NeoPage() {
  return (
    <ProjectLayout
      title="Neo"
      subtitle="An SEO and GEO content platform that writes, publishes and tracks client blogs, and measures whether Google and AI assistants actually mention the client. Built to replace a paid subscription, running on the team's own Claude plans."
      period="2026"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      repos={[{ url: 'https://github.com/thecozycod3r/neo', label: 'thecozycod3r/neo', private: true }]}
      tags={[
        { label: 'SEO + GEO', color: COLOR, bg: BG },
        { label: 'AI Workflows', color: '#6A3FD6', bg: 'rgba(106,63,214,0.07)' },
        { label: 'Internal Product', color: '#0F8A5C', bg: 'rgba(15,138,92,0.07)' },
      ]}
    >
      <ProjectSection label="The Problem" title="A monthly bill for a tool we could not change.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          DAM sold SEO and GEO (getting cited by ChatGPT, Gemini and Perplexity) on a third-party content tool. It worked, but it was a monthly bill for a tool DAM could not change, and the team needed reports it could edit before they went to a client.
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          The brief I set myself: match it feature for feature, in DAM&apos;s own brand, so anyone with a Claude account can use it and everyone sees every client&apos;s work.
        </p>
      </ProjectSection>

      <ProjectSection label="The Solution" title="A shared hub, with the work done on the team's own Macs.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          The website and database are shared; the heavy writing runs on small &lsquo;runners&rsquo; installed on team members&apos; Macs, each using that person&apos;s Claude plan. The site queues a job, the first free runner picks it up, and the result lands back in the hub for review. No company API key, no per-seat bill.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard icon="✍️" title="Articles, Brief to Draft" desc="Keyword → outline (stops for human review) → article with internal and external links, brand-matched banner image, then a draft straight into the client's Webflow or Squarespace." color={COLOR} bg={BG} />
          <FeatureCard icon="🤖" title="AI Visibility Tracking" desc="Weekly checks of tracked prompts across ChatGPT, Gemini, Perplexity and Google AI: is the client named, which pages are cited, which competitors keep showing up, and the sentiment of each answer." color="#6A3FD6" bg="rgba(106,63,214,0.07)" />
          <FeatureCard icon="📊" title="Rank Tracking + Search Console" desc="Keyword ranks, GSC and GA4 in one Insights view, with alerts when a keyword moves and a weekly owner report scheduled automatically." color="#0F8A5C" bg="rgba(15,138,92,0.07)" />
          <FeatureCard icon="🔧" title="Audits and Content Refresh" desc="Technical and domain SEO audits turn into a fix list; old posts get a refresh plan built from the page's own text and the keywords it should rank for." color="#A86A00" bg="rgba(168,106,0,0.07)" />
          <FeatureCard icon="📄" title="Editable Client Reports" desc="Monthly reports are documents the team edits in the browser, then downloads as Word or PDF. Numbers come from the data; AI only writes the commentary." color="#D2361F" bg="rgba(210,54,31,0.07)" />
          <FeatureCard icon="💬" title="Ask Neo" desc="A chat drawer on every page (⌘K) that answers questions about a client and can start real jobs: write an article, refresh a page, run a report, add keywords." color={COLOR} bg={BG} />
        </div>
      </ProjectSection>

      <ProjectSection label="Judgement Calls" title="What made it safe to hand to a team.">
        <BulletList color={COLOR} items={[
          'Signed releases. Every runner holds a service key, so runners install only updates signed with a key that never leaves my machine, and refuse downgrades. A forged release was tested and ignored.',
          'Parity measured, not claimed. I surveyed the original tool screen by screen, scored a feature matrix and closed gaps until every must-have was covered (about 93% overall parity).',
          'Better than the original where it was wrong: article extraction picks the real body instead of the first card on the page, and brand searches count knowledge panels and map packs as ranking.',
          'Cheap models for cheap steps. Small labelling steps run on a local model with a Claude fallback; writing always stays on Claude.',
        ]} />
      </ProjectSection>

      <ProjectSection label="Tech Stack" title="Python runners, static web, Postgres hub.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Python" color={COLOR} />
          <TechBadge name="Claude Code" color="#6A3FD6" />
          <TechBadge name="Supabase (Postgres + RLS)" color="#0F8A5C" />
          <TechBadge name="Vanilla JS" />
          <TechBadge name="Vercel" />
          <TechBadge name="DataForSEO" color="#A86A00" />
          <TechBadge name="Search Console + GA4 APIs" />
          <TechBadge name="Webflow + Squarespace" />
          <TechBadge name="Playwright" />
          <TechBadge name="Ed25519 signing" color="#D2361F" />
        </div>
      </ProjectSection>

      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="₹0" label="Per-seat cost" sub="Runs on team Claude plans" color={COLOR} />
          <StatCard value="~93%" label="Feature parity" sub="Every must-have covered" color="#0F8A5C" />
          <StatCard value="4" label="AI engines tracked" sub="ChatGPT, Gemini, Perplexity, Google" color="#6A3FD6" />
          <StatCard value="5" label="Clients live" sub="Including DAM itself" color="#A86A00" />
        </div>
        <BulletList color={COLOR} items={[
          'The SEO team writes, reviews and publishes from one place, and every teammate sees every client.',
          'Client reports are edited before they are sent, instead of exported and patched by hand.',
          'GEO is measured week to week, so “are we showing up in ChatGPT?” has an answer with sources.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
