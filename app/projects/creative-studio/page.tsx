import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList } from '@/components/projects/ProjectSection';

const COLOR = '#6A3FD6';
const BG = 'rgba(106,63,214,0.07)';

export const metadata = {
  title: 'DAM Creative Studio — Dhruv Shricharan',
};

export default function CreativeStudioPage() {
  return (
    <ProjectLayout
      title="DAM Creative Studio"
      subtitle="An internal AI image and video studio for the creative team — seven generation models behind one composer, with client projects, spend controls, approvals and a UGC ad workflow. Written from a PRD, shipped to production."
      period="2026"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      tags={[
        { label: 'Product', color: COLOR, bg: BG },
        { label: 'Generative AI', color: '#D2361F', bg: 'rgba(210,54,31,0.07)' },
        { label: 'Full-Stack', color: '#2343F5', bg: 'rgba(35,67,245,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="Great models, no guardrails.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          The creative team wanted AI image and video for ad concepts, but using it meant personal logins on consumer apps. Nobody could see what had been spent or for which client, finished assets lived in downloads folders, and there was no step between &ldquo;generated&rdquo; and &ldquo;sent to client&rdquo;.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Video in particular is expensive per clip — a single long, high-resolution render can cost more than a day&apos;s budget — so open access without controls was not an option.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '💳', pain: 'Spend on personal accounts', result: 'No budget, no per-client cost' },
            { icon: '📂', pain: 'Assets scattered across laptops', result: 'Nothing reusable, nothing findable' },
            { icon: '🤔', pain: 'Which model for which job?', result: 'Trial and error, paid per attempt' },
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
      <ProjectSection label="The Solution" title="One studio, every model, every rupee tracked.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I wrote the PRD and architecture, then built the studio end to end. Every generation is priced before it runs, reserved against the company budget, queued, sent to the provider, and its output stored privately against a client and project — with an audit trail throughout.
        </p>

        {/* Generation lifecycle */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>Generation Lifecycle</p>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-5 pb-2">
            {[
              { stage: '01', label: 'Compose', sublabel: 'Model · prompt · refs', color: COLOR },
              { stage: '02', label: 'Estimate', sublabel: 'Priced up front', color: '#A86A00' },
              { stage: '03', label: 'Reserve', sublabel: 'Against budget', color: '#D2361F' },
              { stage: '04', label: 'Generate', sublabel: 'Queued dispatcher', color: '#2343F5' },
              { stage: '05', label: 'Store', sublabel: 'Private bucket', color: '#0F8A5C' },
              { stage: '06', label: 'Approve', sublabel: 'Before clients see it', color: COLOR },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FeatureCard
            icon="🎛"
            title="One Composer, Seven Models"
            desc="Image and video models behind a single interface. Attaching a start or end frame quietly switches a video model to its image-to-video variant, so the team picks a model, not an endpoint."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="💰"
            title="Spend Controls"
            desc="Every request is priced before it runs — including token-metered video models whose provider returns a formula rather than a price. Costs reserve against a company budget, and anything above a threshold asks for confirmation."
            color="#A86A00"
            bg="rgba(168,106,0,0.07)"
          />
          <FeatureCard
            icon="🔐"
            title="Roles and Access"
            desc="Google Workspace sign-in, invite-only. Admins, creatives and viewers, optionally scoped to named clients. Assets stay hidden from viewers until approved."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
          <FeatureCard
            icon="🎬"
            title="UGC Ad Workflow"
            desc="A playbook and script planner that breaks a UGC ad into clips: generate a consistent keyframe for each shot, then animate it — handing each prompt straight into the studio."
            color="#D2361F"
            bg="rgba(210,54,31,0.07)"
          />
          <FeatureCard
            icon="🧭"
            title="&lsquo;Which Model?&rsquo; Guide"
            desc="A public guide rendered from the same model catalogue the app runs on, so limits and parameters never go stale — only the judgement is hand-written."
            color="#2343F5"
            bg="rgba(35,67,245,0.07)"
          />
          <FeatureCard
            icon="✏️"
            title="Edit and Iterate"
            desc="Any generated image can be reopened as a reference for the next generation, with the original stored byte-for-byte and every output organised by client and project."
            color={COLOR}
            bg={BG}
          />
        </div>
      </ProjectSection>

      {/* Judgement calls */}
      <ProjectSection label="Judgement Calls" title="What I learned shipping it.">
        <BulletList color={COLOR} items={[
          'Simplified the architecture to fit the budget. The original design needed a separate queue server; I replaced it with a database-leased dispatcher so the whole product runs on one hosting platform at near-zero fixed cost.',
          'Tested live, not just in mocks. A paid QA pass across all seven models (about $1.40) caught a dispatcher that stalled under parallel load and a provider that returned receipts from a different host than it accepted jobs on — both fixed before the team relied on it.',
          'Fixed the problem users could not describe. The Generate button was disabled almost all day because it waited on a health signal that only a generation could produce. Redefined "offline" and made the button say exactly what was missing.',
          'Changed course when asked. Access went from domain auto-admit back to invite-only, and per-client budgets were removed in favour of one company budget, when the team found them more friction than control.',
        ]} />
      </ProjectSection>

      {/* Tech stack */}
      <ProjectSection label="Tech Stack" title="Production-grade, one platform.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Next.js" color={COLOR} />
          <TechBadge name="TypeScript" color="#2343F5" />
          <TechBadge name="PostgreSQL (Neon)" color="#0F8A5C" />
          <TechBadge name="Better Auth + Google SSO" color="#A86A00" />
          <TechBadge name="Cloudflare R2" color="#D2361F" />
          <TechBadge name="Higgsfield API" />
          <TechBadge name="Vercel" />
          <TechBadge name="Claude AI" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          Built with AI-assisted development from my own PRD. Integration tests drive the full path — client, project, generation, asset — as a non-admin user, and the provider guard is tested against lookalike hosts.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="7" label="AI models" sub="Image + video, one interface" color={COLOR} />
          <StatCard value="30" label="Client workspaces" sub="Assets filed by client" color="#0F8A5C" />
          <StatCard value="100%" label="Spend tracked" sub="Priced before it runs" color="#A86A00" />
          <StatCard value="~5s" label="Image turnaround" sub="Submit to stored asset" color="#2343F5" />
        </div>
        <BulletList color={COLOR} items={[
          'The creative team generates ad concepts in a company tool instead of personal accounts, with every rupee attributed to a client.',
          'Finished assets live in one private, searchable library rather than on individual laptops.',
          'The team has already used it to produce AI UGC video ads for a live client.',
          'Live at studio.digitaladvantagemedia.com behind company sign-in.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
