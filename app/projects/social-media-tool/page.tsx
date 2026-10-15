import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';

const COLOR = '#A86A00';
const BG = 'rgba(168,106,0,0.07)';

export const metadata = {
  title: 'Social Media Planning Tool — Dhruv Shricharan',
};

export default function SocialMediaToolPage() {
  return (
    <ProjectLayout
      title="Social Media Planning Tool"
      subtitle="Replaced a fragmented Slack and WhatsApp approval chain with a structured, end-to-end content platform — built with AI assistance, shipped to production."
      period="2025"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      repos={[{ url: 'https://github.com/thecozycod3r/social-media-dash', private: true }]}
      tags={[
        { label: 'Product', color: COLOR, bg: BG },
        { label: 'Full-Stack', color: '#2343F5', bg: 'rgba(35,67,245,0.07)' },
        { label: 'AI-Assisted', color: '#6A3FD6', bg: 'rgba(106,63,214,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="A workflow built on chaos.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          The social media team at DAM operated with zero structure. Creating content meant: Social media manager creates a mood board → sends to WhatsApp → manager approves (or forgets) → sends to copywriter → sends to designer → back to manager → finally to the client → someone manually posts it.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Everything lived in Slack threads and WhatsApp messages that scrolled off. Things got lost. Deadlines were missed. Nobody knew where any piece of content was in the pipeline.
        </p>

        {/* Pain points visual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { icon: '💬', pain: 'Approval chains across Slack + WhatsApp', result: 'Content lost in message threads' },
            { icon: '⏳', pain: 'No visibility into pipeline status', result: 'Missed deadlines, duplicated work' },
            { icon: '📅', pain: 'Manual posting by the social media manager', result: 'Error-prone, time-wasting' },
          ].map(p => (
            <div key={p.icon} className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-2xl mb-3">{p.icon}</p>
              <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--cream)' }}>{p.pain}</p>
              <p className="text-xs" style={{ color: 'var(--tertiary)' }}>{p.result}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* The solution */}
      <ProjectSection label="The Solution" title="A single platform for every step.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I built a custom social media planning and approval platform using AI-assisted development (Claude), Supabase as the backend, and Vercel for deployment. The goal: a single source of truth for every piece of content in flight, from ideation to post.
        </p>

        {/* Real app screenshots */}
        <div className="space-y-6 mb-8">
          <Screenshot
            src="/screenshots/social-calendar.jpg"
            alt="Social media planning tool — calendar view with multi-client switcher"
            caption="Calendar view at app.digitaladvantagemedia.com — left sidebar lists every client, the calendar shows scheduled posts per day, and the bottom pill confirms a live Meta API connection. Client names blurred."
            width={1800}
            height={1169}
          />
          <Screenshot
            src="/screenshots/social-post.jpg"
            alt="Social media tool — post detail with internal and client approval workflows"
            caption="Post detail — separate Internal Approval (Pending → In Review → Approved → Rejected) and Client Approval (Not Sent → Awaiting Client → Approved → Rejected) tracks, with creative preview, caption, scheduled date, platform toggle (FB/IG/Both), and an audit trail of client feedback. The actual creative is blurred."
            width={1800}
            height={996}
            light
          />
        </div>

        <details className="mb-3">
          <summary
            className="text-xs cursor-pointer mb-3 select-none"
            style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}
          >
            ▾ View illustrative wireframe
          </summary>
        <div
          className="w-full rounded-2xl mb-3 overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D2361F' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#A86A00' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0F8A5C' }} />
            <div className="flex-1 mx-4 h-5 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <div className="h-full flex items-center px-2">
                <span className="text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>app.digitaladvantage.media/content</span>
              </div>
            </div>
          </div>

          {/* App layout */}
          <div className="flex h-72">
            {/* Sidebar */}
            <div className="w-44 flex-shrink-0 p-3 flex flex-col gap-1" style={{ borderRight: '1px solid var(--border)' }}>
              {['📅  Calendar', '🖼  Mood Board', '✅  Approvals', '📊  Analytics', '⚙️  Settings'].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs"
                  style={{
                    background: i === 0 ? BG : 'transparent',
                    color: i === 0 ? COLOR : 'var(--muted)',
                    border: i === 0 ? `1px solid ${COLOR}33` : '1px solid transparent',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Calendar view */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--cream)', fontFamily: 'var(--font-mono)' }}>April 2025</span>
                <div className="flex gap-1">
                  {['Week', 'Month'].map((v, i) => (
                    <span key={v} className="text-xs px-2 py-0.5 rounded" style={{ background: i === 1 ? BG : 'transparent', color: i === 1 ? COLOR : 'var(--muted)' }}>{v}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                  <div key={d} className="text-center text-xs py-1" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>{d}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 1;
                  const hasPost = [2, 5, 9, 12, 16, 19, 23].includes(day);
                  const isPending = [5, 12].includes(day);
                  return (
                    <div key={i} className="aspect-square rounded flex flex-col items-center justify-center text-xs relative"
                      style={{ background: day < 0 || day > 29 ? 'transparent' : 'var(--bg-card)', color: 'var(--muted)' }}>
                      {day >= 0 && day <= 29 && <span>{day + 1}</span>}
                      {hasPost && <div className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: isPending ? '#D2361F' : COLOR }} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status panel */}
            <div className="w-48 p-3 flex flex-col gap-2" style={{ borderLeft: '1px solid var(--border)' }}>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--cream)' }}>In Pipeline</p>
              {[
                { title: 'Real estate reel', stage: 'Designer', color: '#2343F5' },
                { title: 'Hotel campaign', stage: 'Client review', color: COLOR },
                { title: 'Brand refresh', stage: 'Copywriter', color: '#6A3FD6' },
                { title: 'Q2 campaign', stage: 'Scheduled', color: '#0F8A5C' },
              ].map(item => (
                <div key={item.title} className="p-2 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--cream)' }}>{item.title}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: item.color + '1a', color: item.color }}>{item.stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </details>
      </ProjectSection>

      {/* Features */}
      <ProjectSection label="Features" title="Everything the team needed, nothing it didn't.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <FeatureCard
            icon="📅"
            title="Content Calendar"
            desc="Visual calendar view showing all scheduled, in-review, and published content. Team can see the full month at a glance and spot gaps before they become problems."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="🖼"
            title="In-App Mood Board"
            desc="Creatives can build mood boards directly in the tool instead of sending image dumps over WhatsApp. Everything stays attached to the content brief."
            color="#2343F5"
            bg="rgba(35,67,245,0.07)"
          />
          <FeatureCard
            icon="✅"
            title="Multi-Stage Approval Flow"
            desc="Structured flow: Manager → Copywriter → Designer → Manager → Client. Each stage has a clear owner. Content can't skip stages or get lost in a thread."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
          <FeatureCard
            icon="📲"
            title="Automated Publishing"
            desc="Once approved, content posts automatically to Instagram and Facebook via the Meta API on the scheduled date. No manual posting, no missed slots."
            color="#6A3FD6"
            bg="rgba(106,63,214,0.07)"
          />
        </div>

        {/* Approval flow diagram */}
        <div className="p-6 rounded-2xl mb-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>Approval Flow</p>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-5 pb-2">
            {[
              { stage: '01', label: 'Draft', sublabel: 'Social Manager', color: '#2343F5' },
              { stage: '02', label: 'Manager', sublabel: 'Internal sign-off', color: COLOR },
              { stage: '03', label: 'Copywriter', sublabel: 'Copy review', color: '#6A3FD6' },
              { stage: '04', label: 'Designer', sublabel: 'Visual approval', color: '#0F8A5C' },
              { stage: '05', label: 'Client', sublabel: 'Final sign-off', color: '#D2361F' },
              { stage: '06', label: 'Published', sublabel: 'Auto via Meta API', color: '#0F8A5C' },
            ].map((s, i, arr) => (
              <div key={s.stage} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono-custom font-medium mb-2"
                    style={{ background: s.color + '18', border: `1px solid ${s.color}44`, color: s.color }}>
                    {s.stage}
                  </div>
                  <p className="text-xs font-medium text-center" style={{ color: 'var(--cream)' }}>{s.label}</p>
                  <p className="text-xs text-center" style={{ color: 'var(--tertiary)' }}>{s.sublabel}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-6 h-px flex-shrink-0" style={{ background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </ProjectSection>

      {/* Tech stack */}
      <ProjectSection label="Tech Stack" title="Lightweight, scalable, AI-assisted.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Supabase" color="#0F8A5C" />
          <TechBadge name="Vercel" color="#2343F5" />
          <TechBadge name="Next.js" color="#6A3FD6" />
          <TechBadge name="Meta API (Instagram + Facebook)" color={COLOR} />
          <TechBadge name="Claude AI" color="#D2361F" />
          <TechBadge name="GitHub" />
          <TechBadge name="TypeScript" />
          <TechBadge name="PostgreSQL (via Supabase)" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          The entire product was built using AI-assisted development (vibe coding with Claude). Supabase handled auth, the database, and real-time updates. Vercel provided instant deployments. The Meta API enabled automated publishing to both Instagram and Facebook without manual intervention.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="0" label="Lost briefs" sub="Single source of truth" color={COLOR} />
          <StatCard value="100%" label="Automated posts" sub="No more manual publishing" color="#0F8A5C" />
          <StatCard value="6" label="Approval stages" sub="Fully tracked and visible" color="#2343F5" />
          <StatCard value="↓" label="Missed deadlines" sub="Pipeline visibility eliminated delays" color="#6A3FD6" />
        </div>
        <BulletList color={COLOR} items={[
          'Eliminated fragmented Slack and WhatsApp approval chains — replaced with a single, tracked workflow.',
          'The social media manager no longer manually posts content; the Meta API handles it on schedule.',
          'Every team member can see where every piece of content is in the pipeline at any time.',
          'Mood boards, briefs, and approvals all live in one place — attached to the content, not lost in messages.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
