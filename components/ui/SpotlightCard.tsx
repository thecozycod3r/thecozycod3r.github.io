'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Convert '#C9A96E' → '201, 169, 110' */
export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

interface Props {
  /** Accent as 'r, g, b' string. Use hexToRgb() for hex values. */
  rgb?: string;
  bg?: string;
  hoverBg?: string;
  /** Externally dim this card (e.g. when a sibling is hovered) */
  dimmed?: boolean;
  lift?: boolean;
  radius?: number;
  intensity?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onHoverChange?: (hovered: boolean) => void;
}

/**
 * Card with a mouse-tracking radial spotlight, glowing ring and lift on hover.
 * Rounding/padding come from `className`.
 */
export default function SpotlightCard({
  rgb = '201, 169, 110',
  bg = 'var(--bg-card)',
  hoverBg,
  dimmed = false,
  lift = true,
  radius = 340,
  intensity = 0.09,
  className = '',
  style,
  children,
  onHoverChange,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: hover ? hoverBg ?? bg : bg,
        opacity: dimmed && !hover ? 0.45 : 1,
        transform: lift && hover ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover
          ? `0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(${rgb}, 0.30), 0 0 44px rgba(${rgb}, 0.07)`
          : '0 0 0 1px var(--border-subtle)',
        ...style,
      }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => {
        setHover(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setHover(false);
        setPos({ x: -9999, y: -9999 });
        onHoverChange?.(false);
      }}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, ${intensity}), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
