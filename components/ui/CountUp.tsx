'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  /** Full display string, e.g. '₹5L+/mo', '1,000+', '30%'. First number animates. */
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/** Animates the first number found in `value` from 0 when scrolled into view. */
export default function CountUp({ value, duration = 1.6, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = value.match(/(\d[\d,]*(?:\.\d+)?)/);
  const [display, setDisplay] = useState(match ? value.replace(match[1], '0') : value);

  useEffect(() => {
    if (!inView || !match) return;
    const raw = match[1];
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    const hasComma = raw.includes(',');
    const start = performance.now() + delay * 1000;
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / (duration * 1000), 0), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      let cur: string = (target * eased).toFixed(decimals);
      if (hasComma) {
        cur = Number(cur).toLocaleString('en-IN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
      setDisplay(value.replace(raw, cur));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
