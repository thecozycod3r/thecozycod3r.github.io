import Image from 'next/image';
import { Suit } from '@/components/deck/Suit';

interface Props {
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const toSentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/* One section of a case study. Sections are a sequence (problem, build,
   outcome), so each is marked with the next card of the page's suit: the rank
   comes from a CSS counter and the pip from the suit set on `.reading`.
   The outcomes are laid out on the table rather than on paper. */
export function ProjectSection({ label, title, children }: Props) {
  const table = /^outcomes?$/i.test(label.trim());
  return (
    <section className={`sec${table ? ' sec-felt felt' : ''}`}>
      <div className="sec-in">
        <div className="sec-rail"><span className="rank" aria-hidden="true" /></div>
        <div className="sec-main">
          <p className="sec-label">{toSentence(label)}</p>
          <h2 className="sec-title">{title}</h2>
          <div className="sec-body">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* A result, printed as a card: the figure where the index goes. */
export function StatCard({ value, label, sub }: { value: string; label: string; sub?: string; color: string }) {
  // Words too long for a card's width are set smaller rather than broken.
  const long = value.split(/\s+/).some((w) => w.length > 6);
  return (
    <div className="stat">
      <p className={`num${long ? ' long' : ''}`}>{value}</p>
      <div className="stat-foot">
        <p className="stat-label">{label}</p>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

/* One visual system for every case study: no emoji, no per-card colours.
   `icon`, `color` and `bg` are still accepted so the case-study pages need no edits. */
export function FeatureCard({ title, desc }: { icon?: string; title: string; desc: string; color?: string; bg?: string }) {
  return (
    <div className="feature">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

/* A process, as a run of cards on a strip of felt: ace first. */
export function Flow({ title, steps }: { title?: string; steps: { label: string; sublabel?: string; detail?: string; [k: string]: unknown }[] }) {
  return (
    <div className="flow felt">
      {title && <p className="flow-title">{toSentence(title)}</p>}
      <ol className="flow-row">
        {steps.map((s) => (
          <li key={s.label} className="flow-card">
            <span className="rank-sm" aria-hidden="true" />
            <strong>{s.label}</strong>
            {(s.sublabel ?? s.detail) && <span>{s.sublabel ?? s.detail}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function TechBadge({ name }: { name: string; color?: string }) {
  return <span className="tag inline-block">{name}</span>;
}

export function Screenshot({
  src,
  alt,
  caption,
  width,
  height,
  fit = 'cover',
  light = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  fit?: 'cover' | 'contain';
  light?: boolean;
  badge?: string;
}) {
  return (
    <figure className="mb-3">
      <div className="shot" style={{ background: light ? '#FFFFFF' : 'var(--paper-2)', aspectRatio: `${width} / ${height}` }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 960px" className={fit === 'cover' ? 'object-cover object-top' : 'object-contain'} />
      </div>
      {caption && (
        <figcaption className="text-[14px] leading-snug mt-2.5 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function BulletList({ items }: { items: string[]; color: string }) {
  return (
    <ul className="bullets">
      {items.map((item, i) => (
        <li key={i}>
          <Suit s="diamond" />
          {item}
        </li>
      ))}
    </ul>
  );
}
