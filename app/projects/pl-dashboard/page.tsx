import ProjectLayout from '@/components/projects/ProjectLayout';
import { ProjectSection, StatCard, FeatureCard, TechBadge, BulletList, Screenshot } from '@/components/projects/ProjectSection';

const COLOR = '#0F8A5C';
const BG = 'rgba(15,138,92,0.07)';

export const metadata = {
  title: 'Financial P&L Dashboard — Dhruv Shricharan',
};

export default function PLDashboardPage() {
  return (
    <ProjectLayout
      title="Financial P&L Dashboard"
      subtitle="Built a live financial intelligence layer for DAM's leadership — replacing manual monthly spreadsheets with a real-time BigQuery + Looker Studio dashboard that compressed the reporting cycle and exposed where money was leaking."
      period="2025"
      company="Digital Advantage Media"
      color={COLOR}
      accentBg={BG}
      tags={[
        { label: 'Analytics', color: COLOR, bg: BG },
        { label: 'BigQuery', color: '#2343F5', bg: 'rgba(35,67,245,0.07)' },
        { label: 'Financial Modelling', color: '#A86A00', bg: 'rgba(168,106,0,0.07)' },
      ]}
    >
      {/* The problem */}
      <ProjectSection label="The Problem" title="Flying blind, once a month.">
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          When I joined DAM, the only financial visibility leadership had was a manually compiled spreadsheet — updated once a month, emailed around, and already outdated by the time anyone read it. There was no way to tell actuals from projections, no breakdown of where revenue was coming from, and no visibility into which cost lines were eating margin.
        </p>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          Decisions were being made on gut feel. Cost-sink areas were invisible. The leadership team had no live financial pulse.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: '📊', pain: 'Monthly reporting cycle', result: 'Decisions made on 30-day-old data' },
            { icon: '🔍', pain: 'No actuals vs. forecast view', result: "Couldn't tell if performance was on track" },
            { icon: '💸', pain: 'No cost-sink visibility', result: 'Margin erosion went undetected' },
          ].map(p => (
            <div key={p.icon} className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
              <span aria-hidden className="block h-0.5 w-6 mb-4" style={{ background: 'var(--cobalt)' }} />
              <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--cream)' }}>{p.pain}</p>
              <p className="text-xs" style={{ color: 'var(--tertiary)' }}>{p.result}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* Dashboard mockup */}
      <ProjectSection label="The Build" title="A live financial command centre.">
        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 680 }}>
          I built a centralised P&L dashboard in BigQuery (data warehouse + SQL modelling) and Looker Studio (visualisation). Data refreshes automatically on a weekly cadence — no manual input, no email chains.
        </p>

        {/* Real Looker Studio shots */}
        <div className="space-y-6 mb-8">
          <Screenshot
            src="/screenshots/pl-ratio-trends.jpg"
            alt="Looker Studio P&L ratio trends — actuals vs forecasted gauges and key efficiency ratios"
            caption="Ratio Trends — gauge dials show revenue and expense actuals against forecast caps, with five live efficiency ratios (Salaries-, Opex-, Marketing-, Misc-, Profit-to-revenue). Headline rupee values blurred."
            width={1800}
            height={1107}
            light
            fit="contain"
          />
          <Screenshot
            src="/screenshots/pl-overview.jpg"
            alt="Income and expenses overview with revenue, expense, profitability trends and category breakdown"
            caption="Income & Expense Overview — actuals (solid) vs forecast (dashed) for revenue, expenses, profitability, and an Expenses-by-Category bar chart. Y-axis values blurred; trend shapes intact."
            width={1800}
            height={1348}
            light
            fit="contain"
          />
          <Screenshot
            src="/screenshots/pl-breakdown.jpg"
            alt="Drill-down by expense category — employee cost, tech, welfare, rent"
            caption="Expense Breakdown — drill-down trends per cost line: Employee Cost, Tech, Welfare, Rent. The two cost-sink categories that drove the 10%+ optimisation target are visible here."
            width={1800}
            height={1346}
            light
            fit="contain"
          />
        </div>

        {/* Faux mockup retained for hero shape */}
        <details className="mb-3">
          <summary
            className="text-sm cursor-pointer mb-3 select-none min-h-11 py-3"
            style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}
          >
            View illustrative wireframe
          </summary>
        <div
          className="w-full rounded-2xl mb-3 overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#D2361F' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#A86A00' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0F8A5C' }} />
            <div className="flex-1 mx-4 h-5 rounded flex items-center px-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <span className="text-xs" style={{ color: 'var(--tertiary)', fontFamily: 'var(--font-mono)' }}>lookerstudio.google.com · DAM P&L Dashboard</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-5">
            {/* KPI row */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: 'Total Revenue', value: '₹18.4L', change: '+12%', up: true },
                { label: 'Gross Margin', value: '64%', change: '+3pp', up: true },
                { label: 'Opex Ratio', value: '38%', change: '-4pp', up: true },
                { label: 'Net Surplus', value: '₹4.8L', change: '+22%', up: true },
              ].map(kpi => (
                <div key={kpi.label} className="p-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{kpi.label}</p>
                  <p className="font-mono-custom text-xl font-medium mb-1" style={{ color: 'var(--cream)' }}>{kpi.value}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: COLOR, background: BG }}>{kpi.change} vs forecast</span>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-3 gap-3">
              {/* Revenue vs Forecast bar chart */}
              <div className="col-span-2 p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-xs font-medium mb-4" style={{ color: 'var(--cream)' }}>Revenue — Actuals vs. Forecast</p>
                <div className="flex items-end gap-2 h-28">
                  {[
                    { actual: 70, forecast: 65 },
                    { actual: 80, forecast: 75 },
                    { actual: 65, forecast: 78 },
                    { actual: 90, forecast: 82 },
                    { actual: 85, forecast: 80 },
                    { actual: 100, forecast: 88 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex items-end gap-0.5">
                      <div className="flex-1 rounded-t" style={{ height: `${bar.actual}%`, background: COLOR, opacity: 0.9 }} />
                      <div className="flex-1 rounded-t" style={{ height: `${bar.forecast}%`, background: 'var(--border)', opacity: 0.6 }} />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm" style={{ background: COLOR }} />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Actuals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm" style={{ background: 'var(--border)' }} />
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Forecast</span>
                  </div>
                </div>
              </div>

              {/* Opex breakdown donut */}
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-xs font-medium mb-4" style={{ color: 'var(--cream)' }}>Opex Breakdown</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Payroll', pct: 52, color: COLOR },
                    { label: 'Tools & SaaS', pct: 18, color: '#2343F5' },
                    { label: 'Ads spend', pct: 16, color: '#A86A00' },
                    { label: 'Other', pct: 14, color: 'var(--border)' },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.label}</span>
                        <span className="text-xs font-mono-custom" style={{ color: item.color }}>{item.pct}%</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: 'var(--border-subtle)' }}>
                        <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </details>
      </ProjectSection>

      {/* Features */}
      <ProjectSection label="Features" title="What the dashboard tracked.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <FeatureCard
            icon="📈"
            title="Actuals vs. Forecast"
            desc="Side-by-side view of actual revenue and expenses against projected figures — updated weekly so leadership always knows if they're on track."
            color={COLOR}
            bg={BG}
          />
          <FeatureCard
            icon="💰"
            title="Revenue Stream Breakdown"
            desc="Revenue split by client, service type (Google Ads, Meta Ads, SEO, CRO), and geography — identifying which streams were growing and which were flat."
            color="#A86A00"
            bg="rgba(168,106,0,0.07)"
          />
          <FeatureCard
            icon="📉"
            title="Opex Ratio Tracking"
            desc="Operating expense ratios tracked against revenue benchmarks — flagging when cost lines were growing faster than revenue."
            color="#2343F5"
            bg="rgba(35,67,245,0.07)"
          />
          <FeatureCard
            icon="🔍"
            title="Cost-Sink Identification"
            desc="Drill-down analysis of individual cost lines identified two categories consuming disproportionate margin — informing a 10%+ cost optimisation initiative."
            color="#D2361F"
            bg="rgba(210,54,31,0.07)"
          />
        </div>
      </ProjectSection>

      {/* Tech */}
      <ProjectSection label="Tech Stack" title="Built on Google Cloud.">
        <div className="flex flex-wrap gap-2 mb-6">
          <TechBadge name="BigQuery" color={COLOR} />
          <TechBadge name="Looker Studio" color="#2343F5" />
          <TechBadge name="SQL" color="#A86A00" />
          <TechBadge name="Google Cloud" />
          <TechBadge name="Scheduled Queries (auto-refresh)" />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: 640 }}>
          Data from multiple sources (CRM, invoicing, ad spend) was centralised into BigQuery using SQL data models. Looker Studio connected directly to BigQuery for live visualisations. Scheduled queries handled the weekly refresh automatically — no manual exports or CSV uploads.
        </p>
      </ProjectSection>

      {/* Outcomes */}
      <ProjectSection label="Outcomes" title="From monthly guesswork to weekly clarity.">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard value="Monthly → Weekly" label="Reporting cycle" sub="4x more frequent insights" color={COLOR} />
          <StatCard value="10%+" label="Cost optimisation" sub="Target identified via analysis" color="#A86A00" />
          <StatCard value="Live" label="P&L visibility" sub="Real-time actuals vs. forecast" color="#2343F5" />
          <StatCard value="0" label="Manual updates" sub="Fully automated refresh" color="#0F8A5C" />
        </div>
        <BulletList color={COLOR} items={[
          'Reporting cycle compressed from monthly to weekly — leadership now reviews financials every Friday.',
          'Identified two major cost-sink categories consuming disproportionate margin, informing a 10%+ cost optimisation initiative.',
          'Revenue stream breakdown enabled the leadership team to see which service lines were driving growth vs. dragging margin.',
          'Actuals vs. forecast view gave management a live pulse on financial performance — replacing gut-feel decisions with data.',
        ]} />
      </ProjectSection>
    </ProjectLayout>
  );
}
