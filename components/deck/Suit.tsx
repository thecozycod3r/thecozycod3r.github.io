export type SuitName = 'spade' | 'club' | 'heart' | 'diamond';

/* Drawn for this deck rather than borrowed from a font, so they render the
   same everywhere (no emoji substitution) and scale with the card. */
const PATHS: Record<SuitName, string> = {
  spade:
    'M50 3C62 22 97 40 97 63c0 14-10 24-23 24-8 0-15-4-19-10 1 9 6 16 14 20H31c8-4 13-11 14-20-4 6-11 10-19 10C13 87 3 77 3 63 3 40 38 22 50 3Z',
  heart:
    'M50 97C38 79 3 60 3 34 3 18 15 6 30 6c9 0 16 5 20 12 4-7 11-12 20-12 15 0 27 12 27 28 0 26-35 45-47 63Z',
  diamond: 'M50 2c8 18 25 36 41 48-16 12-33 30-41 48-8-18-25-36-41-48C25 38 42 20 50 2Z',
  club:
    'M50 5a22 22 0 0 1 19 33 22 22 0 1 1-14 37c1 9 6 17 14 22H31c8-5 13-13 14-22a22 22 0 1 1-14-37A22 22 0 0 1 50 5Z',
};

export const isRed = (s: SuitName) => s === 'heart' || s === 'diamond';

export function Suit({ s, className }: { s: SuitName; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
      <path d={PATHS[s]} />
    </svg>
  );
}
