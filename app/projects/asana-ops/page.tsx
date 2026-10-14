import Image from 'next/image';
import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';

const COLOR = '#60A5FA';
const BG = 'rgba(96,165,250,0.07)';

export const metadata = {
  title: 'Asana Operations Overhaul — Dhruv Shricharan',
};

export default function AsanaOpsPage() {
  return (
    <ProjectLayout
      title="Asana Operations Overhaul"
      subtitle="Turned a siloed, deadline-missing agency team into a coordinated operation — by implementing Asana company-wide with custom automation, workload visibility, and an integrated leave management system."
      period="2025"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      tags={[
        { label: 'Operations', color: COLOR, bg: BG },
        { label: 'Automation', color: '#C9A96E', bg: 'rgba(201,169,110,0.07)' },
        { label: 'Project Management', color: '#3FBF7F', bg: 'rgba(63,191,127,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="Four teams, zero coordination.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          When I audited DAM's operations, every function was running in isolation. The creatives didn't know what Google Ads needed. Account managers didn't know what the designers were working on. Deadlines were tracked in personal to-do apps, WhatsApp chats, and memory. Requirements were being missed. People were overloaded in silence while others had capacity.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          There was no single place to see who was working on what, when things were due, or how loaded each person was. Management was reactive — firefighting instead of planning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: '🏝', issue: 'Siloed teams', desc: 'Creatives, Ads, Account Mgmt — no cross-team visibility' },
            { icon: '❌', issue: 'Missed requirements', desc: 'Tasks falling through the cracks between handoffs' },
            { icon: '⚖️', issue: 'Unbalanced workloads', desc: 'No way to see who was overloaded or underutilised' },
            { icon: '📆', issue: 'No leave visibility', desc: 'Leave tracked via WhatsApp, not tied to project planning' },
          ].map(p => (
            <div key={p.icon} className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-2xl mb-3">{p.icon}</p>
              <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--cream)' }}>{p.issue}</p>
              <p className="text-xs leading-snug" style={{ color: 'var(--tertiary)' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* The build */}
      <ProjectSection label="The Build" title="Asana as the operating system.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I implemented Asana as the company-wide project management platform — not just as a task tracker, but as the operational nervous system of the business. Custom automation, two workload dashboards, and an integrated leave management system were built on top.
        </p>

        {/* Real workspace — client project list view */}
        <Screenshot
          src="/screenshots/asana-myndwell.jpg"
          alt="Asana client project board with tasks grouped by deliverable type"
          caption="Live client project — task pipeline grouped by team (Creative, Meta Ads, Google Ads, On Hold). Names, task titles, and client identifiers blurred for confidentiality."
          width={1800}
          height={1034}
        />
      </ProjectSection>

      {/* Features */}
      <ProjectSection label="Features" title="What was built on top of Asana.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <FeatureCard
            icon="⚡"
            title="Smart Auto-Assignment"
            desc="Custom rules auto-assign tasks to the right person based on project type and role — eliminating the need for managers to manually distribute work on every brief."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="📊"
            title="Dual Workload Dashboards"
            desc="Two dashboards built: one showing tasks by project (project workload view), one showing tasks by person (assignee workload view). Managers can rebalance in real time."
            color="#3FBF7F"
            bg="rgba(63,191,127,0.07)"
          />
          <FeatureCard
            icon="🔔"
            title="Slack + Email Notifications"
            desc="Automated notifications triggered by task status changes — team members know immediately when something lands in their queue or moves to the next stage."
            color="#C9A96E"
            bg="rgba(201,169,110,0.07)"
          />
          <FeatureCard
            icon="📅"
            title="Zapier Leave Tracker"
            desc="Employees submit leave via a Zapier-triggered form. Manager approves in one click. Approval triggers an email notification and the leave appears in a shared calendar — tied to project planning."
            color="#A78BFA"
            bg="rgba(167,139,250,0.07)"
          />
        </div>

        {/* Real leave calendar */}
        <div className="mb-6">
          <Screenshot
            src="/screenshots/asana-leaves.jpg"
            alt="Asana master leave calendar with approved time-off entries"
            caption="Master leave calendar — every approved request flows here automatically from the Zapier form, with reason tags (Vacation, Sick, WFH, Menstrual) and approval status. Employee names and personal comments blurred."
            width={1800}
            height={1032}
          />
        </div>

        {/* User journey */}
        <div className="p-6 rounded-2xl mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>The employee experience — five steps end-to-end</p>
          <div className="flex items-start gap-3 overflow-x-auto pb-2">
            {[
              { step: '01', icon: '📝', label: 'Employee submits', detail: 'Zapier form with dates + reason' },
              { step: '02', icon: '📬', label: 'Manager notified', detail: 'Email + Slack message sent' },
              { step: '03', icon: '✅', label: 'Manager approves', detail: 'One-click approval in email' },
              { step: '04', icon: '📧', label: 'Employee notified', detail: 'Confirmation email sent' },
              { step: '05', icon: '📅', label: 'Calendar updated', detail: 'Leave visible to all managers' },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex items-start gap-3 flex-shrink-0">
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2"
                    style={{ background: BG, border: `1px solid ${COLOR}44` }}>
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono-custom mb-1" style={{ color: COLOR }}>{s.step}</span>
                  <p className="text-xs font-medium text-center mb-0.5" style={{ color: 'var(--cream)' }}>{s.label}</p>
                  <p className="text-xs text-center" style={{ color: 'var(--tertiary)' }}>{s.detail}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="mt-5 w-6 h-px flex-shrink-0" style={{ background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Real Zapier wiring */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>Behind the scenes — actual Zapier wiring</p>
          <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              aspectRatio: '1800 / 884',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Image
              src="/screenshots/zapier-leave-flow.jpg"
              alt="Zapier multi-path workflow that handles WFH, Sick, Vacation, and Menstrual leave types — each with its own subtraction logic and Asana update step"
              fill
              sizes="(max-width: 900px) 100vw, 880px"
              className="object-contain"
            />
          </div>
          <p
            className="text-xs leading-snug mt-3"
            style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)', maxWidth: 720 }}
          >
            One trigger, four conditional paths. Each leave type subtracts the correct number of days from the right balance and writes back to Asana — no manual reconciliation.
          </p>
        </div>
      </ProjectSection>

      {/* Tech */}
      <ProjectSection label="Tech Stack" title="No-code automation on top of Asana.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Asana" color={COLOR} />
          <TechBadge name="Zapier" color="#C9A96E" />
          <TechBadge name="Slack" color="#A78BFA" />
          <TechBadge name="Asana Rules (native automation)" />
          <TechBadge name="Email (SMTP via Zapier)" />
          <TechBadge name="Google Calendar" color="#3FBF7F" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          The entire system was built without writing a single line of code. Asana's native rules engine handled task auto-assignment and status-triggered notifications. Zapier connected the leave form to Asana, Slack, and email. The workload dashboards were built using Asana's reporting tools with custom filters.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="A team that actually runs together.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="0" label="Missed requirements" sub="Since go-live" color={COLOR} />
          <StatCard value="Real-time" label="Workload visibility" sub="Rebalance instantly" color="#3FBF7F" />
          <StatCard value="4" label="Teams unified" sub="Creatives, Ads, Accounts, Mgmt" color="#C9A96E" />
          <StatCard value="Automated" label="Leave management" sub="No WhatsApp, no guesswork" color="#A78BFA" />
        </div>
        <BulletList color={COLOR} items={[
          'Cross-team silos eliminated — all four functions now operate from a single workspace with shared visibility.',
          'Zero requirements have been missed since go-live; auto-assignment means tasks never fall between the cracks.',
          'Managers can see and rebalance workloads in real time — Priya\'s overload becomes Dev\'s next task in minutes.',
          'Leave is now integrated into project planning; managers see upcoming leave before assigning deadlines.',
          'Slack and email notifications mean team members are never surprised by something landing in their queue.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
