export interface Swatch { name: string; hex: string }
export interface Decision { title: string; body: string }

export interface Website {
  slug: string;
  name: string;
  kind: string;
  location: string;
  year: string;
  url: string;
  urlLabel: string;
  role: string;
  summary: string;
  brief: string;
  color: string;
  bg: string;
  palette: Swatch[];
  type: { role: string; face: string; why: string }[];
  language: string[];
  decisions: Decision[];
  stack: string[];
}

export const websites: Website[] = [
  {
    slug: 'yercaud-club',
    name: 'Yercaud Club',
    kind: 'Heritage members’ club',
    location: 'Yercaud, Tamil Nadu',
    year: '2026',
    url: 'https://thecozycod3r.github.io/yercaud-club/',
    urlLabel: 'thecozycod3r.github.io/yercaud-club',
    role: 'Design, build and research',
    summary:
      'A hill club founded in 1897, with no website of its own. Rebuilt from a tariff card, a souvenir booklet and the club’s own photographs into a four-page site for members, affiliates and guests.',
    brief:
      'The club had a printed tariff card, a burgundy crest and a handful of photographs. Members of 18 affiliated clubs had no way to check visiting rates, and guests had no way to learn what the club actually offers. The site had to feel as old as the institution without feeling dusty.',
    color: '#A33A4C',
    bg: 'rgba(163,58,76,0.07)',
    palette: [
      { name: 'Paper', hex: '#F8F7F4' },
      { name: 'Ink', hex: '#302D2A' },
      { name: 'Club burgundy', hex: '#701F2D' },
      { name: 'Tint', hex: '#E9DADB' },
      { name: 'Rule', hex: '#D8D3CC' },
    ],
    type: [
      { role: 'Display', face: 'Cormorant Garamond', why: 'A Garamond revival with the proportions of 19th-century print — the same era as the club. Italic used for one word per headline, the way an engraved invitation would.' },
      { role: 'Text', face: 'Manrope', why: 'A quiet geometric sans so rates, timings and tables stay legible at small sizes. The contrast keeps the serif feeling ceremonial rather than everywhere.' },
    ],
    language: [
      'Warm paper background and a single accent taken straight from the crest — burgundy appears only where you can act.',
      'Thin hairline rules and square-cornered buttons, borrowed from printed club stationery rather than app UI.',
      'Photography runs edge to edge; text sits on it only where the image is quiet.',
      'Uppercase, widely tracked eyebrows (“YERCAUD, TAMIL NADU”) do the job a letterhead would.',
    ],
    decisions: [
      { title: 'Every number comes from the club', body: 'Rates, the 18 affiliations and the founding year are taken from the 2026 tariff card. Where public sources disagreed (an old phone number on an affiliate’s site), the card won and the conflict was noted rather than guessed.' },
      { title: 'A member/guest switch instead of two tables', body: 'Chamber tariffs differ for members and guests. One toggle swaps every price on the page, so nobody has to read across a dense grid to find their row.' },
      { title: 'Real pages, not a single-page app', body: 'Each page is prerendered to static HTML at build time, so it loads instantly on hill-station mobile data and every section is indexable by search engines.' },
      { title: 'History, written from the souvenir', body: 'The /history page was written from the club’s own souvenir booklet, so the story is theirs, not a template’s.' },
    ],
    stack: ['React', 'Vite', 'Static prerender', 'WebP pipeline', 'GitHub Pages'],
  },
  {
    slug: 'nandipura',
    name: 'Nandipura & Indravally Estates',
    kind: 'Coffee estate, green coffee producer',
    location: 'Chikmagalur, Karnataka',
    year: '2026',
    url: 'https://nandipuracoffee.com/',
    urlLabel: 'nandipuracoffee.com',
    role: 'Strategy, design and build',
    summary:
      'A fifth-generation estate growing coffee under native shade since 1900. The site positions them as what they are — a producer selling green coffee to roasters — not another café brand.',
    brief:
      'The estate’s old domain was dead and its story lived in Instagram images of certificates. Most coffee sites are written for people buying a bag; Nandipura sells Arabica micro-lots and Robusta parchment to roasters and exporters. The site had to earn a buyer’s trust in one scroll.',
    color: '#D9A441',
    bg: 'rgba(217,164,65,0.07)',
    palette: [
      { name: 'Ink', hex: '#0B0E0A' },
      { name: 'Moss', hex: '#2C3526' },
      { name: 'Cream', hex: '#EFE9DC' },
      { name: 'Cherry', hex: '#C0442A' },
      { name: 'Honey', hex: '#D9A441' },
    ],
    type: [
      { role: 'Display', face: 'Fraunces', why: 'A soft, slightly wonky old-style serif — it reads as agricultural and handmade at large sizes, which suits a family estate better than a crisp luxury serif.' },
      { role: 'Text', face: 'Instrument Sans', why: 'Narrow and technical, for the facts a buyer scans: altitude, certification, process, lot type.' },
    ],
    language: [
      'Dark, forest-floor palette taken from under the canopy: near-black ink, moss and a cream that reads like unbleached paper.',
      'Two warm accents from the crop itself — cherry red for ripe coffee cherries, honey for the wild honey the estate also sells.',
      'Editorial layout with very large headlines and long, generous line lengths, closer to a magazine feature than a shop.',
      'Small uppercase fact strip (SINCE 1900 · 3,400 FT MSL · RAINFOREST ALLIANCE) so proof sits next to the promise.',
    ],
    decisions: [
      { title: '“Enquire about lots”, not “Shop”', body: 'They sell green coffee in bulk. A cart would have been the wrong promise, so every call to action is an enquiry that lands in the estate’s inbox.' },
      { title: 'Only verified facts', body: 'Founding year, altitude, shade trees, Rainforest Alliance certification and the 2002 CoffeeReview cupping all come from the estate’s own documents. Nothing was written to sound impressive.' },
      { title: 'Reviews from real visits', body: 'All 20 Google reviews were about visiting the estate, so they appear verbatim as a “Voices” section and feed review markup for search.' },
      { title: 'A journal for search', body: 'Long-form posts on process and lots give roasters something to find on Google and give the estate a place to publish harvest updates.' },
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Motion', 'Lenis', 'Vercel'],
  },
  {
    slug: 'bhramari',
    name: 'Bhramari',
    kind: 'Private pool villa',
    location: 'Sakleshpur, Karnataka',
    year: '2026',
    url: 'https://bhramarisakleshpur.com/',
    urlLabel: 'bhramarisakleshpur.com',
    role: 'Design, build, video and launch',
    summary:
      'A one-acre private pool villa inside a coffee estate. One page that sells a weekend: open the gates, walk the path, check a date, message the owner.',
    brief:
      'A three-bedroom villa rented as a whole, with bookings handled personally over WhatsApp. It needed to look as good as the place, load fast on a phone in the ghats, and turn interest into a WhatsApp message with the dates already filled in.',
    color: '#D07A4E',
    bg: 'rgba(208,122,78,0.07)',
    palette: [
      { name: 'Forest', hex: '#2C3026' },
      { name: 'Olive', hex: '#47493B' },
      { name: 'Paper', hex: '#FAF6EE' },
      { name: 'Terracotta', hex: '#A8512C' },
      { name: 'Clay', hex: '#E9B892' },
    ],
    type: [
      { role: 'Script', face: 'Sacramento', why: 'Chosen to match the hand-drawn logo, so the wordmark and the section labels feel written by the same hand.' },
      { role: 'Headings', face: 'Cormorant Garamond', why: 'Quiet, high-contrast serif that lets the photography lead.' },
      { role: 'Text', face: 'Jost', why: 'Clean geometric sans for details like rooms, rates and directions; set heavier on phones so it holds up outdoors.' },
    ],
    language: [
      'The hero is a 13-second silent loop that opens on the villa’s carved gates — the first thing a guest actually sees on arrival.',
      'Terracotta for the primary action, taken from the brick path in that same shot.',
      'Script used sparingly, as labels and the tagline, never for anything you have to read quickly.',
      'Forest greens and olive from the canopy, warm paper for the text sections. Generous dark overlays on video so white type passes contrast without flattening the image.',
    ],
    decisions: [
      { title: 'Booking is a WhatsApp message', body: 'The owner confirms every stay personally, so the form doesn’t pretend to take bookings. It opens WhatsApp with the dates, guests and name already written.' },
      { title: 'Motion that respects the visitor', body: 'Smooth-scrolling was removed after testing because it felt unnatural on phones. The hero video has a pause button that is remembered, and only Data Saver or slow connections skip it.' },
      { title: 'A separate portrait video for phones', body: 'Phones get a vertical crop of the loop and the right resolution for their screen, chosen after the page loads so the first paint stays under two seconds.' },
      { title: 'Facts confirmed with the owner', body: 'Bedrooms, nightly rate, breakfast and pet policy were confirmed one by one before launch; open questions stayed off the page.' },
    ],
    stack: ['HTML / CSS / JS', 'GSAP + ScrollTrigger', 'Video pipeline (ffmpeg)', 'WebP pipeline', 'GitHub Pages', 'Custom domain'],
  },
  {
    slug: 'anti-labs',
    name: 'Anti Labs Studios',
    kind: 'Creative studios + café',
    location: 'Bengaluru',
    year: '2026',
    url: 'https://thecozycod3r.github.io/anti-labs-preview/anti-light.html',
    urlLabel: 'Preview build',
    role: 'Reverse-engineering, design and build',
    summary:
      'A photo studio, a dance studio and a café under one roof. A pixel-accurate rebuild of their Squarespace site, plus two new pages designed in the same language.',
    brief:
      'Anti Labs had a striking Squarespace site for one studio and nothing for the other two. They wanted to own their code, keep the look exactly, and add pages for Anti Motion and Anti Dote that feel like they were always there.',
    color: '#E5484D',
    bg: 'rgba(229,72,77,0.07)',
    palette: [
      { name: 'Black', hex: '#0E0D0C' },
      { name: 'Bone', hex: '#F0F0F0' },
      { name: 'Signal red', hex: '#BB1122' },
      { name: 'Steel', hex: '#ABBCC4' },
      { name: 'Slate', hex: '#404C4F' },
    ],
    type: [
      { role: 'Display', face: 'Boldonse', why: 'Compressed, heavy and loud — it carries the brand on its own. Its tall ascenders need about 1.3 line-height or lines collide, which the original site had already worked out.' },
      { role: 'Text', face: 'Space Mono', why: 'Monospace body copy gives the studio a technical, darkroom feel and contrasts with the shouting display face.' },
      { role: 'UI', face: 'Space Grotesk', why: 'For navigation and small labels where mono would get cramped.' },
    ],
    language: [
      'Near-black canvas with type and imagery overlapping on a 24-column grid, so words sit inside photographs.',
      'One accent — a signal red — reserved for the active state and the line under the current page.',
      'Huge, centred display type punched through by cropped images.',
      'Navigation in small, spaced mono capitals so it never competes with the headlines.',
    ],
    decisions: [
      { title: 'Measured, not eyeballed', body: 'The Squarespace layout engine was reverse-engineered to 24 columns at 45.5px with a 12px gap on desktop and 8 columns on mobile. Every block matches the original to within one pixel, at exact page height, at both sizes.' },
      { title: 'Original fonts, self-hosted', body: 'The same font files the original serves, so the rebuild doesn’t subtly change character.' },
      { title: 'New pages from the same rules', body: 'Anti Motion and Anti Dote reuse the grid, type scale and overlap patterns instead of inventing new ones. Prices are left “on request” rather than made up for a real business.' },
      { title: 'A navigation the original lacked', body: 'The source shipped an empty nav. With four pages, the rebuild adds one that keeps the logo centred and retracts on scroll, just like the original header.' },
    ],
    stack: ['HTML / CSS / JS', 'Self-hosted fonts', 'Playwright pixel diffs', 'SEO audit gate', 'GitHub Pages'],
  },
  {
    slug: 'unravel-experiences',
    name: 'Unravel Experiences',
    kind: 'Curated luxury travel',
    location: 'India',
    year: '2026',
    url: 'https://unravelexperiences.com/',
    urlLabel: 'unravelexperiences.com',
    role: 'Revamp, member login and motion (with the Unravel team)',
    summary:
      'A travel brand that sells stays chosen for the experience they create. I led the revamp of the site: experiences told day by day, a member area for Unravel Access, and a loader that unspools the wordmark.',
    brief:
      'The original site listed trips the way a catalogue would. Unravel’s pitch is that the stay is the story — sleeping in a jeweller’s home, waking up on a farm. The revamp had to make each experience read like a journey and give members a reason to sign in.',
    color: '#FF7A10',
    bg: 'rgba(255,122,16,0.07)',
    palette: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ink', hex: '#0A0A0A' },
      { name: 'Ember', hex: '#FF6A1A' },
      { name: 'Saffron', hex: '#FF8A00' },
      { name: 'Blush', hex: '#FFF2E8' },
    ],
    type: [
      { role: 'Headlines', face: 'Neo-grotesque sans, light weight', why: 'Lighter, wider headlines about a third smaller than before — calmer, so the photographs do the selling.' },
      { role: 'Eyebrows', face: 'Widely tracked small caps', why: 'Short labels like “Introducing Unravel Originals” set the tone before the headline lands.' },
    ],
    language: [
      'White space and full-bleed landscape photography; ink type, pill-shaped buttons.',
      'A warm ember-to-saffron accent used only for perks and membership, so it always signals value.',
      'Experiences composed day by day, with a thread drawn down the page as you scroll through the journey.',
      'A loader where the “U” rolls in like a spool and lays the wordmark down behind it — the name, animated.',
    ],
    decisions: [
      { title: 'Day-by-day experiences', body: 'Each trip is laid out as a sequence of days with three photos per row, so a visitor can picture the trip instead of reading a list of inclusions.' },
      { title: 'Less, calmer type', body: 'Section padding cut by about 40% and headlines made lighter and smaller, after the first pass felt like it was shouting.' },
      { title: 'Unravel Access behind a real login', body: 'Membership runs on Supabase Auth with a member dashboard, wallet reveal and member trips, plus an admin panel for the team.' },
      { title: 'A real map, not a placeholder', body: 'The neighbourhood section shows a live Google map of the area rather than a drawn grid, without exposing the street address.' },
    ],
    stack: ['React', 'Next.js (migration)', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Supabase Auth'],
  },
];

export const getWebsite = (slug: string) => websites.find((w) => w.slug === slug);
