import Link from 'next/link';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList } from '@/components/projects/ProjectSection';

const COLOR = '#2416A5';
const BG = 'rgba(36,22,165,0.07)';

export const metadata = {
  title: 'Tempo — Dhruv Shricharan',
};

export default function TempoPage() {
  return (
    <ProjectLayout
      title="Tempo"
      subtitle="An in-house task manager that replaced Asana for the whole agency: client boards, automatic routing to the right specialist, approval statuses that ping the right Slack channel, and reports on late work, all on a free database tier."
      period="2026"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      repos={[{ url: 'https://github.com/thecozycod3r/tempo', label: 'thecozycod3r/tempo', private: true }]}
      tags={[
        { label: 'Operations', color: COLOR, bg: BG },
        { label: 'Full-stack', color: '#0F8A5C', bg: 'rgba(15,138,92,0.07)' },
        { label: 'Slack', color: '#6A3FD6', bg: 'rgba(106,63,214,0.07)' },
      ]}
    >
      <ProjectSection label="The Problem" title="Asana worked. We just didn't own it.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I had already rolled Asana out company-wide (<Link href="/projects/asana-ops/" className="ink-link">the Asana story</Link>), with rules that routed every task to the right person. The rules were tailor-made and the team trusted them. But pricing grew with every seat, and every change meant working around someone else&apos;s product.
        </p>
        <p className="text-base leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          My first redesign tried to improve the workflow. The team pushed back, so I studied the live Asana rules one by one and rebuilt them as they were. Improvements became opt-in switches, not defaults.
        </p>
      </ProjectSection>

      <ProjectSection label="The Solution" title="The same workflow, owned outright.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard icon="🧭" title="Roster-Driven Routing" desc="Each client has a roster: account manager, Meta, Google, SEO, creative. A task assigned to a role lands on the right person automatically, and edits go back to the client's strategist." color={COLOR} bg={BG} />
          <FeatureCard icon="🔔" title="Statuses That Talk" desc="The agency's own 11 statuses. Moving a task to Out for Approval notifies the account manager and posts in the client's Slack channel through a Tempo bot." color="#6A3FD6" bg="rgba(106,63,214,0.07)" />
          <FeatureCard icon="🧹" title="Tidy Up" desc="One page of late work and approvals stuck five working days or more, with one-click Done, New date or On hold, and Undo. Ages count working days and skip holidays." color="#0F8A5C" bg="rgba(15,138,92,0.07)" />
          <FeatureCard icon="📈" title="Team Report" desc="Completed work per person and team over time, visible only to founders and the creative lead. Completed tasks are logged before the 15-day auto-bin, so history survives." color="#A86A00" bg="rgba(168,106,0,0.07)" />
        </div>
      </ProjectSection>

      <ProjectSection label="Judgement Calls" title="Rules in the database, not the browser.">
        <BulletList color={COLOR} items={[
          'Five access levels, from founder to team member, enforced by database triggers and row-level security. A member can comment and move status; only managers can reassign or edit.',
          'Copy before you improve. Matching the old tool exactly made the switch a non-event for the team.',
          'Free tier on purpose. About 55 MB of data a year against a 500 MB limit, with creatives kept as Drive links, and a documented path to a paid plan if it ever gets close.',
          'Live Asana boards were imported like-for-like, so the switch-over did not lose open work.',
        ]} />
      </ProjectSection>

      <ProjectSection label="Tech Stack" title="Next.js on Postgres.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Next.js 16" color={COLOR} />
          <TechBadge name="Supabase (Postgres, RLS, pg_cron)" color="#0F8A5C" />
          <TechBadge name="Slack API" color="#6A3FD6" />
          <TechBadge name="Vercel" />
          <TechBadge name="TypeScript" />
          <TechBadge name="SQL migrations + RLS tests" color="#A86A00" />
        </div>
      </ProjectSection>

      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="29" label="Client boards" sub="Each with its own Slack channel" color={COLOR} />
          <StatCard value="11" label="Agency statuses" sub="Matched to the old workflow" color="#0F8A5C" />
          <StatCard value="$0" label="Monthly database cost" sub="Free tier, sized for years" color="#6A3FD6" />
          <StatCard value="5" label="Access levels" sub="Enforced in the database" color="#A86A00" />
        </div>
        <BulletList color={COLOR} items={[
          'The agency runs on a tool it owns, with no per-seat licence.',
          'Late work and stuck approvals surface on one page instead of in a weekly chase.',
          'Feedback from the team ships in days: the creative lead asked for a people view and working-day ages, and both went live the same week.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
