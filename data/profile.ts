export const EMAIL = 'dhruv.shricharan@hotmail.com';
export const LINKEDIN = 'https://linkedin.com/in/dhruv-shricharan-798b40186';
export const GITHUB = 'https://github.com/thecozycod3r';
export const RESUME = '/Dhruv_Shricharan_Resume.pdf';

/* ── System map: the business, left to right, with what I built at each stage ── */
export interface MapNode { name: string; note: string; href?: string }
export interface MapStage { stage: string; question: string; nodes: MapNode[] }

export const systemMap: MapStage[] = [
  {
    stage: 'Win clients',
    question: 'Where does the next client come from?',
    nodes: [
      { name: 'Outbound engine', note: '1,000+ emails a day, ₹5L+ a month in new retainers' },
    ],
  },
  {
    stage: 'Run the work',
    question: 'Who is doing what, and is it approved?',
    nodes: [
      { name: 'Tempo', note: 'Own task manager, replaced Asana', href: '/projects/tempo/' },
      { name: 'Social media planner', note: 'Brief to approval to auto-post', href: '/projects/social-media-tool/' },
      { name: 'Creative Studio', note: 'Seven AI models, every rupee tracked', href: '/projects/creative-studio/' },
      { name: 'Neo', note: 'SEO + GEO content, written and tracked', href: '/projects/neo/' },
    ],
  },
  {
    stage: 'Prove results',
    question: 'Did the ad spend turn into sales?',
    nodes: [
      { name: 'Cerno', note: 'Ads joined to CRM leads, for staff and clients', href: '/projects/analytics-dashboard/' },
    ],
  },
  {
    stage: 'Watch the money',
    question: 'Are we making money this week?',
    nodes: [
      { name: 'P&L dashboard', note: 'Monthly close became a weekly view', href: '/projects/pl-dashboard/' },
    ],
  },
];

/* ── Case studies ── */
export interface Project {
  slug: string;
  title: string;
  line: string;
  context: string;
  year: string;
  stats: { v: string; l: string }[];
}

export const projects: Project[] = [
  {
    slug: 'analytics-dashboard',
    title: 'Cerno',
    line: 'Meta, Google and client CRMs in one pipeline, feeding a dashboard, AI insights and monthly reports. One platform for staff, clients and self-serve businesses.',
    context: 'Digital Advantage Media',
    year: '2026',
    stats: [{ v: '28', l: 'client accounts' }, { v: '21', l: 'reports a month, generated' }],
  },
  {
    slug: 'neo',
    title: 'Neo',
    line: 'An SEO and GEO content platform: briefs to published drafts, rank and AI-visibility tracking, editable client reports. Replaced a paid tool.',
    context: 'Digital Advantage Media',
    year: '2026',
    stats: [{ v: '4', l: 'AI engines tracked' }, { v: '₹0', l: 'per-seat cost' }],
  },
  {
    slug: 'tempo',
    title: 'Tempo',
    line: 'The agency’s own task manager. Replaced Asana with the same routing rules, Slack approvals and late-work reports, on a free database tier.',
    context: 'Digital Advantage Media',
    year: '2026',
    stats: [{ v: '29', l: 'client boards' }, { v: '$0', l: 'monthly database cost' }],
  },
  {
    slug: 'creative-studio',
    title: 'Creative Studio',
    line: 'An internal AI image and video studio with client workspaces, spend limits, approvals and a UGC ad workflow. Written from a PRD, shipped to production.',
    context: 'Digital Advantage Media',
    year: '2026',
    stats: [{ v: '7', l: 'generation models' }, { v: '30', l: 'client workspaces' }],
  },
  {
    slug: 'social-media-tool',
    title: 'Social Media Planner',
    line: 'Replaced a Slack-and-WhatsApp approval chain with one platform: calendar, mood boards, six approval stages and automatic posting.',
    context: 'Digital Advantage Media',
    year: '2025',
    stats: [{ v: '6', l: 'approval stages' }, { v: '100%', l: 'posts published automatically' }],
  },
  {
    slug: 'pl-dashboard',
    title: 'P&L Dashboard',
    line: 'A live BigQuery and Looker Studio view of revenue, costs and margin that replaced the monthly spreadsheet.',
    context: 'Digital Advantage Media',
    year: '2025',
    stats: [{ v: 'Weekly', l: 'reporting, was monthly' }, { v: '10%+', l: 'costs found and cut' }],
  },
  {
    slug: 'asana-ops',
    title: 'Asana Operations',
    line: 'Company-wide project management with auto-assignment, workload dashboards, Slack alerts and a leave tracker.',
    context: 'Digital Advantage Media',
    year: '2025',
    stats: [{ v: '4', l: 'teams on one system' }, { v: '0', l: 'missed requirements' }],
  },
];

/* ── Experience (a real sequence, newest first) ── */
export interface Role {
  company: string;
  role: string;
  period: string;
  start: string;
  place: string;
  headline: string;
  results: { v: string; l: string }[];
  did: string[];
  tools: string[];
}

export const roles: Role[] = [
  {
    company: 'Digital Advantage Media',
    role: "Founders' Office, Growth Analyst",
    period: 'Oct 2025 – now',
    start: '2025',
    place: 'Bengaluru',
    headline: 'First growth hire. Built the outbound, reporting and operations stack from zero.',
    results: [
      { v: '₹5L+', l: 'monthly retainers closed via outbound' },
      { v: '5%', l: 'positive reply rate on cold email' },
      { v: 'Weekly', l: 'P&L reporting, was monthly' },
    ],
    did: [
      'Built an outbound system sending 1,000+ emails a day with ZAP Mail and Sending.ac warm-up, and a 30+ prospect CRM pipeline across four industries.',
      'Repositioned the agency from “digital marketing” to “growth partner”, with new ICPs, collateral and productised offers including conversational-AI CRO and SEO + GEO.',
      'Shipped internal software: a social media planner, an AI creative studio and a client analytics pipeline with AI insights and automated reports.',
      'Rolled out Asana company-wide with auto-assignment and workload dashboards, and an NPS programme with a 72-hour follow-up on detractors.',
    ],
    tools: ['Apollo', 'Sales Navigator', 'BigQuery', 'Looker Studio', 'Asana', 'Zapier', 'Supabase', 'Vercel', 'Meta API', 'Claude'],
  },
  {
    company: 'Mars Inc., via Mu Sigma',
    role: 'Decision Scientist',
    period: 'Jul 2023 – Oct 2025',
    start: '2023',
    place: 'Asia, Australia and Europe',
    headline: 'Supply-chain dashboards for planners on three continents.',
    results: [
      { v: '30%', l: 'faster discrepancy resolution (MTTR)' },
      { v: '1 hr', l: 'cut from the MRP pipeline run' },
      { v: '3', l: 'new markets onboarded' },
    ],
    did: [
      'MRP dashboard in Power BI with automated weekly refresh and PO batch matching.',
      'Customer MOS for in-transit stock, cover days and risk flags, rolled out to Serbia and Croatia during the JDA to Kinaxis migration.',
      'Magpie: raw material and packaging inventory health, safety cover and overdue POs across three new markets.',
      'Long-term demand planning on NSV trends and promotion impact; wrote the BRDs, FRDs and user stories for every rollout.',
    ],
    tools: ['Power BI', 'PySpark', 'Databricks', 'Azure Data Factory', 'SQL Server', 'Kinaxis'],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Machine Learning Intern',
    period: '2022',
    start: '2022',
    place: 'India',
    headline: 'Predictive-maintenance models the client adopted.',
    results: [{ v: '15%', l: 'accuracy gain on the LSTM model' }],
    did: [
      'Built LSTM models on industrial sensor data; feature engineering and tuning lifted accuracy 15%.',
      'Turned model output into client decks that explained confidence and limits, which got the models accepted.',
    ],
    tools: ['Python', 'TensorFlow', 'Keras', 'scikit-learn'],
  },
  {
    company: 'NASSCOM Centre of Excellence',
    role: 'Research Intern',
    period: '2021',
    start: '2021',
    place: 'Bengaluru',
    headline: 'Mapped 500+ Indian AI startups for EdTech research.',
    results: [{ v: '500+', l: 'startups catalogued' }],
    did: [
      'Catalogued the Indian AI and data-science startup landscape for sector reports and policy input.',
      'Supported Xperience AI, the CoE’s industry–startup matchmaking events.',
    ],
    tools: ['Research', 'Market mapping'],
  },
  {
    company: 'School of Fish Technologies',
    role: 'Intern',
    period: '2020',
    start: '2020',
    place: 'Bengaluru',
    headline: 'First job: data pipelines and beta testing.',
    results: [],
    did: [
      'Maintained B2C and B2B customer data pipelines in SQL.',
      'Ran beta tests and fed customer feedback into the product roadmap.',
    ],
    tools: ['SQL', 'User research'],
  },
];

/* ── Toolkit ── */
export const toolkit: { group: string; items: string[] }[] = [
  { group: 'Growth and sales', items: ['Apollo', 'LinkedIn Sales Navigator', 'ZAP Mail, Sending.ac', 'ICP frameworks', 'Cold calling', 'Deal negotiation', 'Contract drafting'] },
  { group: 'Data', items: ['SQL, Python, PySpark', 'BigQuery', 'Power BI, Looker Studio', 'Demand forecasting', 'Financial modelling', 'Anomaly detection'] },
  { group: 'Operations', items: ['Asana', 'Zapier', 'Zoho People and Payroll', 'NPS programmes', 'Resource planning'] },
  { group: 'Building', items: ['Next.js, React', 'Supabase', 'Vercel, GitHub Pages', 'Azure, Databricks, GCP', 'Meta and Google Ads APIs', 'Claude, Claude Code'] },
];

export const languages = 'English and Kannada fluently; basic Hindi, Spanish and Mandarin.';

export const education = [
  { school: 'The Chinese University of Hong Kong', what: 'BEng, Information Engineering', when: '2019 – 2023' },
  { school: "St. Joseph's Boys' High School, Bengaluru", what: 'ISC, Science', when: '2019' },
];

export const offClock: { what: string; detail: string; href?: string }[] = [
  { what: 'Table Night', detail: 'Fourteen multiplayer card and party games for your phone. Free to play.', href: '/projects/table-night/' },
  { what: 'A.R.T.H.U.R.', detail: 'A voice assistant for my Mac that runs my own inbox. Open source.', href: '/projects/arthur/' },
  { what: 'Basketball', detail: 'Represented CUHK; captained the team to a championship.' },
  { what: 'Tennis', detail: 'Club and university tournaments.' },
  { what: 'Travel', detail: '15+ countries across Asia and Europe.' },
  { what: 'Poker and card magic', detail: 'Probability on one hand, misdirection on the other.' },
];
