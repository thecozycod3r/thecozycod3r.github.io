import { Suit, isRed, type SuitName } from './Suit';

/* Corner index: a value over a small pip, repeated upside down opposite. */
export function Index({ value, suit }: { value: string; suit: SuitName }) {
  const cls = isRed(suit) ? ' red' : '';
  return (
    <>
      <span className={`pc-idx${cls}`}><b>{value}</b><Suit s={suit} /></span>
      <span className={`pc-idx br${cls}`}><b>{value}</b><Suit s={suit} /></span>
    </>
  );
}

export function Back() {
  return (
    <span className="pc-back">
      <Suit s="spade" />
    </span>
  );
}

/* A plain card: index and one large pip. `down` rests it face down. */
export function Card({ value, suit, down, className = '', twoSided = true }: { value: string; suit: SuitName; down?: boolean; className?: string; twoSided?: boolean }) {
  return (
    <span className={`pc ${down ? 'is-down ' : ''}${className}`} aria-hidden="true">
      <span className="pc-flip">
        <span className="pc-face">
          <Index value={value} suit={suit} />
          <Suit s={suit} className={`pc-pip${isRed(suit) ? ' red' : ''}`} />
        </span>
        {twoSided && <Back />}
      </span>
    </span>
  );
}

/* The portrait as a court card: the same photograph twice, the second turned
   end over end, split on the diagonal like a king or a jack. */
export function Court({ className = '', twoSided = false }: { className?: string; twoSided?: boolean }) {
  return (
    <span className={`pc ${className}`}>
      <span className="pc-flip">
        <span className="pc-face" role="img" aria-label="Dhruv Shricharan, drawn as a court card">
          <Index value="D" suit="spade" />
          <span className="court-frame" aria-hidden="true">
            <span className="court-half" />
            <span className="court-half b" />
          </span>
        </span>
        {twoSided && <Back />}
      </span>
    </span>
  );
}
