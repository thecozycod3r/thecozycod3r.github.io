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
    url: 'https://yercaudclub.com/',
    urlLabel: 'yercaudclub.com',
    role: 'Design, build and research',
    summary:
      'A hill club founded in 1897, with no website of its own. Rebuilt from a tariff card, a souvenir booklet and the club’s own photographs into a four-page site for members, affiliates and guests, now live on the club’s own domain.',
    brief:
      'The club had a printed tariff card, a dark red YC crest and a stack of WhatsApp photographs. Members of 18 affiliated clubs had no way to check visiting rates, and guests had no way to learn what the club actually offers. The site had to feel as old as the institution without feeling dusty.',
    color: '#7A0D19',
    bg: 'rgba(122,13,25,0.07)',
    palette: [
      { name: 'Night', hex: '#0E0C0C' },
      { name: 'Panel', hex: '#171414' },
      { name: 'Yercaud red', hex: '#5A0812' },
      { name: 'Cream', hex: '#ECDCC8' },
      { name: 'Rule', hex: '#2C2627' },
    ],
    type: [
      { role: 'Display', face: 'Cutive', why: 'The crest’s own lettering is a typewriter slab serif. Cutive is the closest open face, so every headline reads in the same voice as the club’s logo and stationery.' },
      { role: 'Text', face: 'Manrope', why: 'A quiet geometric sans so rates, timings and tables stay legible at small sizes. The typewriter face is kept to headings, where it can carry character without tiring the eye.' },
    ],
    language: [
      'Near-black from header to footer, chosen by the club after seeing light, stone and dark versions side by side.',
      'Yercaud red, sampled from the crest, appears only on things you can press: buttons, the selected tab, the member/guest switch.',
      'The crest stands alone in the header as the home button, with no box or wordmark competing with it.',
      'Photography runs edge to edge; every facility and chamber is shown with the club’s own pictures, not stock.',
    ],
    decisions: [
      { title: 'Every number comes from the club', body: 'Rates, the 18 affiliations and the founding year are taken from the 2026 tariff card. Where public sources disagreed (an old phone number, a street name the club no longer uses), the club’s word won.' },
      { title: 'Designed with the club, round by round', body: 'Three directions went to the club: the original cream, a stone-toned version in the crest’s typeface, and red on black. Their feedback — cleaner header, less red at the bottom, keep the typewriter headings — shaped the final site.' },
      { title: 'A member/guest switch instead of two tables', body: 'Chamber tariffs differ for members and guests. One toggle swaps every price on the page, so nobody has to read across a dense grid to find their row.' },
      { title: 'Real pages, not a single-page app', body: 'Each page is prerendered to static HTML at build time, so it loads instantly on hill-station mobile data and every section is indexable by search engines.' },
      { title: 'History, written from the souvenir', body: 'The /history page was written from the club’s own souvenir booklet, so the story is theirs, not a template’s.' },
    ],
    stack: ['React', 'Vite', 'Static prerender', 'WebP pipeline', 'GitHub Pages', 'Custom domain'],
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
      'A fifth-generation estate growing coffee under native shade since the late 1800s. The site positions them as what they are — a producer selling green coffee to roasters — not another café brand.',
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
      { role: 'Display', face: 'Libre Caslon Display', why: 'Caslon was the everyday type of colonial-era print in India when the estate was founded, in the late 1800s. At headline size it reads like an estate ledger or a planters’ notice: sharp, high-contrast and rarely seen on modern sites.' },
      { role: 'Italic & small heads', face: 'Libre Caslon Text', why: 'The Display cut has no italic and its hairlines thin out below about 24px, so quotes, press lines and small headings drop to the sturdier Text cut of the same family.' },
      { role: 'Text', face: 'Libre Franklin', why: 'A plain American gothic of the same era, for the facts a buyer scans: altitude, certification, process, lot type.' },
    ],
    language: [
      'Dark, forest-floor palette taken from under the canopy: near-black ink, moss and a cream that reads like unbleached paper.',
      'Two warm accents from the crop itself — cherry red for ripe coffee cherries, honey for the wild honey the estate also sells.',
      'Editorial layout with very large headlines and long, generous line lengths, closer to a magazine feature than a shop.',
      'Small uppercase fact strip (SINCE THE 1800s · 3,400 FT MSL · RAINFOREST ALLIANCE) so proof sits next to the promise.',
    ],
    decisions: [
      { title: '“Enquire about lots”, not “Shop”', body: 'They sell green coffee in bulk. A cart would have been the wrong promise, so every call to action is an enquiry that lands in the estate’s inbox.' },
      { title: 'Only verified facts', body: 'Founding year, altitude, shade trees, Rainforest Alliance certification and the CoffeeReview blind cupping all come from the estate’s own documents. Nothing was written to sound impressive.' },
      { title: 'Reviews from real visits', body: 'The estate’s Google reviews are about visiting, not drinking the coffee, so they are quoted on the Visit page with the reviewers’ names rather than used as product praise.' },
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
      { title: 'Facts confirmed with the owner', body: 'Bedrooms, the nightly rate and breakfast were confirmed one by one with the owner before launch; anything still unconfirmed stayed off the page.' },
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
    role: 'Revamp, member login and motion, with the Unravel team',
    summary:
      'A travel company that sells short trips built around one remarkable stay. With the Unravel team I rebuilt the site so each trip, called an Original, reads like an itinerary with a price, and added a members’ area for Unravel Access.',
    brief:
      'Unravel sells experiences such as three nights in a Jaipur jeweller’s haveli or a weekend at a Pune vineyard, priced per couple. The old site described places; it had to show what the days actually look like, what is included and what it costs, give frequent travellers a reason to sign up, and keep a separate offer for companies booking staff travel.',
    color: '#FF6A1A',
    bg: 'rgba(255,106,26,0.07)',
    palette: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Ink', hex: '#222222' },
      { name: 'Ember', hex: '#FF6A1A' },
      { name: 'Grey', hex: '#717171' },
      { name: 'Mist', hex: '#F7F7F7' },
    ],
    type: [
      { role: 'Everything', face: 'Plus Jakarta Sans', why: 'One family from 400 to 800 for headlines, prices and body copy. Headlines italicise their second half (“Experiences across India”, “Live in the jeweller’s house”), which gives the voice a travel-writing lilt without a second typeface.' },
      { role: 'Labels', face: 'Plus Jakarta Sans, spaced capitals', why: 'Short eyebrows such as “UNRAVEL ORIGINALS · INDIA” and “THE JOURNEY” sit above each section, so a long page still scans in seconds.' },
    ],
    language: [
      'White pages, ink type and large, warm hotel photography in rounded cards; the photos do the selling.',
      'One ember orange, used only where you act or where value is shown: the main buttons, the day markers of an itinerary and the “Included” labels.',
      'A loader where the U rolls in like an unspooling thread and sets the wordmark down behind it, the brand name animated.',
      'Unravel Access gets its own dark panel with a metallic member card, the one place the page goes dark.',
    ],
    decisions: [
      { title: 'Every Original is an itinerary', body: 'Each trip page lays the days out on a thread, from “Day one · Arrival” to “Until next time”, followed by what is included, the neighbourhood and an FAQ, so a visitor can picture the trip before asking about it.' },
      { title: 'Price up front, asked for once', body: 'Cards show a “from” price per couple, and each trip has a sticky reservation card with the price, a “Get my exact price” request, a WhatsApp option and the cancellation terms.' },
      { title: 'A real login for members', body: 'Unravel Access runs on Supabase Auth: sign in or create an account, a member dashboard and member trips, with an admin panel for the team.' },
      { title: 'No map where the address is private', body: 'An area map was tried on trip pages and then removed. The neighbourhood is described in words, and the exact address is shared on confirmation.' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Supabase Auth', 'Framer Motion', 'GSAP'],
  },
];

export const getWebsite = (slug: string) => websites.find((w) => w.slug === slug);
