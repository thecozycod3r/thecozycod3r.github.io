import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList } from '@/components/projects/ProjectSection';

const COLOR = '#2343F5';
const BG = 'rgba(35,67,245,0.07)';

export const metadata = {
  title: 'Cerno — Dhruv Shricharan',
};

export default function AnalyticsDashboardPage() {
  return (
    <ProjectLayout
      title="Cerno"
      subtitle="One place where every client's ad spend, leads and sales outcomes meet. A cloud data pipeline across Meta, Google and client CRMs feeds a dashboard, AI insights, automated monthly reports and alerts. It began as DAM's internal analytics tool and is now one platform for staff, clients and self-serve businesses."
      period="2026"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      repos={[{ url: 'https://github.com/thecozycod3r/DAMClaude', label: 'thecozycod3r/DAMClaude (Cerno app)', private: true }, { url: 'https://github.com/thecozycod3r/Claude_Automations', label: 'thecozycod3r/Claude_Automations (pipeline)', private: true }]}
      tags={[
        { label: 'Analytics', color: COLOR, bg: BG },
        { label: 'Data Engineering', color: '#0F8A5C', bg: 'rgba(15,138,92,0.07)' },
        { label: 'AI Insights', color: '#6A3FD6', bg: 'rgba(106,63,214,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="Spend in one tab, leads in another.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Account managers at DAM ran close to thirty client accounts. Spend lived in Meta Ads Manager and Google Ads. Leads lived in each client&apos;s own Google Sheet, every one with different columns, date formats and status words. Whether a lead was relevant, visited the site or booked lived in a third place again.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          So the question every client actually asks — &ldquo;what did my money buy?&rdquo; — took an afternoon of copy-paste to answer, and the monthly report was rebuilt by hand every month.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '🧩', pain: 'Three sources per client, none joined', result: 'Cost per qualified lead was guesswork' },
            { icon: '📝', pain: 'Monthly reports assembled by hand', result: 'Hours per client, numbers that drifted' },
            { icon: '🔕', pain: 'Nobody watching accounts overnight', result: 'Broken campaigns found days late' },
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
      <ProjectSection label="The Solution" title="A pipeline first, a dashboard second.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I built the data layer before the screens. A nightly cloud job pulls every account from the ad platforms and every client&apos;s lead sheet, cleans and joins them, and publishes one mart per client. Everything else — the dashboard, the insights, the reports, the alerts — reads from those marts, so no two views can disagree on a number.
        </p>

        {/* Pipeline diagram */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>Data Flow</p>
          <div className="flex flex-wrap items-start gap-x-2 gap-y-5 pb-2">
            {[
              { stage: '01', label: 'Extract', sublabel: 'Meta · Google · CRM sheets', color: COLOR },
              { stage: '02', label: 'Clean', sublabel: 'Dates, statuses, columns', color: '#A86A00' },
              { stage: '03', label: 'Join', sublabel: 'Spend × lead outcomes', color: '#6A3FD6' },
              { stage: '04', label: 'Mart', sublabel: 'One per client', color: '#0F8A5C' },
              { stage: '05', label: 'Serve', sublabel: 'Dashboard · reports · alerts', color: '#D2361F' },
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
            icon="📈"
            title="Performance Dashboard"
            desc="Spend, leads, cost per lead and funnel outcomes per client, with free date-range comparison and creative-level views. Staff and client logins see only what they are scoped to."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="💡"
            title="Insights That Do Arithmetic, Not Guessing"
            desc="An Insights tab opens on up to four act / watch / working cards computed from plain thresholds — spend with zero results, cost 1.5× the average, an engine 20% cheaper. &lsquo;Ask why&rsquo; then hands the card to AI with the right dataset."
            color="#6A3FD6"
            bg="rgba(106,63,214,0.07)"
          />
          <FeatureCard
            icon="📄"
            title="One-Click Monthly Reports"
            desc="Generates the client's monthly Word report. The pipeline computes every figure; AI only writes the words, and a check rejects any number the model invents."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
          <FeatureCard
            icon="🚨"
            title="Overnight Anomaly Alerts"
            desc="Each campaign is compared with its own trailing 7 days — spend spikes, silent delivery, cost-per-lead jumps — and a Slack digest lands every morning with deep links into the ad account."
            color="#D2361F"
            bg="rgba(210,54,31,0.07)"
          />
          <FeatureCard
            icon="🔎"
            title="Competitor Ads"
            desc="Pulls competitors' live ads from the Meta and Google ad libraries on demand and summarises the angles they are running, inside the client's own view."
            color="#A86A00"
            bg="rgba(168,106,0,0.07)"
          />
          <FeatureCard
            icon="🗂"
            title="Client Brief"
            desc="Each client's strategy brief lives in the tool. AI drafts it from the website, call notes or an old deck; an account manager approves each section before anything downstream reads it."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
        </div>
      </ProjectSection>

      {/* Platform */}
      <ProjectSection label="One Platform" title="From internal tool to product.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Clients kept asking for the view the account managers had, so Cerno became one platform with one login. Staff, client logins and businesses that sign up on their own all use the same site; what each person sees follows the email they have proven, not a separate deployment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            icon="🔐"
            title="Access Follows Identity"
            desc="Any sign-in method works, but agency-level access needs a confirmed address. Each client login is scoped to its own accounts, checked server-side on every request."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="🧭"
            title="Self-Serve Onboarding"
            desc="A business names itself, connects its own Google Ads and Meta accounts through OAuth, and gets the same dashboard the agency uses, filled by the same pipeline."
            color="#0F8A5C"
            bg="rgba(15,138,92,0.07)"
          />
          <FeatureCard
            icon="📅"
            title="Week on Week"
            desc="Any campaign, ad set or ad as eight whole Monday-to-Sunday weeks side by side. A client asked for it; it shipped to staff and client views together."
            color="#6A3FD6"
            bg="rgba(106,63,214,0.07)"
          />
          <FeatureCard
            icon="🔍"
            title="SEO Next to Paid"
            desc="Search Console and GA4 sit beside the ad data, and a panel matches paid search terms to organic rankings to show where SEO would lower the cost of paid."
            color="#A86A00"
            bg="rgba(168,106,0,0.07)"
          />
        </div>
      </ProjectSection>

      {/* Judgement calls */}
      <ProjectSection label="Judgement Calls" title="The decisions that made it trustworthy.">
        <BulletList color={COLOR} items={[
          'Numbers come from code, words from AI. A model never computes a figure that reaches a client — reports are reconciled against the raw lead data before release (58 of 58 client-months matched exactly).',
          'Alerts tuned on real data, not defaults. DAM campaigns average under one lead a day, so a naive "spent money, zero leads" rule fired on most healthy campaigns. Lead-volume gates and a 2× threshold cut noise to about ten alerts a day across fifteen clients.',
          'A green job is not proof. An early cloud run reported success while silently publishing empty data. I added guards that refuse to publish when fewer than half the clients built, and a daily freshness watchdog that judges data age, not run status.',
          'Knowing when not to ship. An ad-level verdict engine works for e-commerce clients but lead-gen data was too thin to judge individual ads — so I scoped it to sales accounts and documented what data would unlock the rest.',
        ]} />
      </ProjectSection>

      {/* Tech stack */}
      <ProjectSection label="Tech Stack" title="Python pipeline, Next.js front end.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="Python + pandas" color={COLOR} />
          <TechBadge name="Parquet" color="#0F8A5C" />
          <TechBadge name="Meta Marketing API" color="#6A3FD6" />
          <TechBadge name="Google Ads API" color="#A86A00" />
          <TechBadge name="Google Sheets API" color="#D2361F" />
          <TechBadge name="GitHub Actions" />
          <TechBadge name="Next.js" />
          <TechBadge name="Vercel" />
          <TechBadge name="Supabase Storage" />
          <TechBadge name="Claude + Gemini" />
          <TechBadge name="Slack Webhooks" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          Extraction and transforms run as a scheduled GitHub Actions job; the site is a Next.js app on Vercel reading published marts from storage. Built with AI-assisted development, with every change going local → dev → production.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="What actually changed.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="28" label="Client accounts" sub="Refreshed every morning" color={COLOR} />
          <StatCard value="21" label="Monthly reports" sub="Generated, not hand-built" color="#0F8A5C" />
          <StatCard value="41%" label="Faster build" sub="26 → 15 min, same output" color="#6A3FD6" />
          <StatCard value="100%" label="Reconciled" sub="Reports vs raw lead data" color="#A86A00" />
        </div>
        <BulletList color={COLOR} items={[
          'Account managers answer "what did my money buy?" from one screen instead of three exports.',
          'Monthly client reports went from a manual rebuild to a button, with numbers that cannot drift from the dashboard.',
          'Broken or runaway campaigns surface the next morning in Slack, not at month end.',
          'Cut the nightly build time by about 40% by fixing the slowest transforms and running clients in parallel — verified byte-identical output before shipping.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
