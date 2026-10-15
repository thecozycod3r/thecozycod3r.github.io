import Image from 'next/image';

interface Props {
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const toSentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/* Two-column section: label and title on the left (sticky on desktop), content on the right */
export function ProjectSection({ label, title, children }: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-x-12 gap-y-5 pb-16 mb-16" style={{ borderBottom: '1px solid var(--rule)' }}>
      <div className="lg:sticky lg:top-20 self-start">
        <p className="text-[14px] font-medium mb-2" style={{ color: 'var(--cobalt)' }}>
          {toSentence(label)}
        </p>
        <h2 className="font-display font-bold text-[28px] md:text-[32px] leading-[1.1] tracking-tight" style={{ color: 'var(--ink)' }}>
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function StatCard({ value, label, sub }: { value: string; label: string; sub?: string; color: string }) {
  return (
    <div className="h-full pl-3 py-1" style={{ borderLeft: '2px solid var(--cobalt)' }}>
      <p className="font-mono-custom text-[24px] leading-tight font-medium mb-1.5 break-words" style={{ color: 'var(--ink)' }}>
        {value}
      </p>
      <p className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>
        {label}
      </p>
      {sub && (
        <p className="text-[13px] leading-snug mt-0.5" style={{ color: 'var(--ink-3)' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function FeatureCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string; bg: string }) {
  return (
    <div className="h-full p-5 rounded-[4px]" style={{ background: 'var(--sheet)', border: '1px solid var(--rule)', borderTop: `3px solid ${color}` }}>
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="text-[17px] leading-none" aria-hidden>{icon}</span>
        <h4 className="text-[16px] font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
          {title}
        </h4>
      </div>
      <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--ink-2)' }}>
        {desc}
      </p>
    </div>
  );
}

export function TechBadge({ name }: { name: string; color?: string }) {
  return (
    <span className="text-[13px] px-3 py-1 rounded-full inline-block font-mono-custom" style={{ color: 'var(--ink-2)', border: '1px solid var(--rule)', background: 'var(--sheet)' }}>
      {name}
    </span>
  );
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
      <div
        className="relative w-full overflow-hidden rounded-[4px]"
        style={{
          border: '1px solid var(--rule)',
          background: light ? '#FFFFFF' : 'var(--paper-2)',
          aspectRatio: `${width} / ${height}`,
          boxShadow: '0 1px 0 var(--rule), 0 18px 40px -24px rgba(11,27,58,0.35)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          className={fit === 'cover' ? 'object-cover object-top' : 'object-contain'}
        />
      </div>
      {caption && (
        <figcaption className="text-[13px] leading-snug mt-2.5 max-w-[70ch]" style={{ color: 'var(--ink-3)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function BulletList({ items }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="text-[16px] leading-[1.6] pl-5 relative max-w-[68ch]" style={{ color: 'var(--ink-2)' }}>
          <span className="absolute left-0 top-[12px] w-2.5 h-[2px]" style={{ background: 'var(--cobalt)' }} />
          {item}
        </li>
      ))}
    </ul>
  );
}
