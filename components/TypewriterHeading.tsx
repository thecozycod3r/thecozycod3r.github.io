'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Props {
  prefix: string;
  emphasis: string;
  size?: string;
  className?: string;
}

/**
 * Editorial heading: each word rises out of a mask, with the emphasis words
 * set in italic gold with a travelling sheen.
 */
export default function TypewriterHeading({ prefix, emphasis, size, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const words = [
    ...prefix.trim().split(/\s+/).map((w) => ({ w, em: false })),
    ...emphasis.trim().split(/\s+/).map((w) => ({ w, em: true })),
  ];

  return (
    <h2
      ref={ref}
      className={`font-display leading-[1.08] ${className ?? ''}`}
      style={{ fontSize: size ?? 'clamp(32px, 4vw, 52px)', color: 'var(--cream)', fontWeight: 400 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{
            paddingBottom: '0.12em',
            marginBottom: '-0.12em',
            paddingRight: word.em ? '0.06em' : undefined,
            marginRight: i < words.length - 1 ? '0.26em' : undefined,
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '112%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: i * 0.055, ease }}
            style={word.em ? { fontStyle: 'italic' } : undefined}
          >
            {word.em ? <span className="text-gold-shimmer">{word.w}</span> : word.w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
