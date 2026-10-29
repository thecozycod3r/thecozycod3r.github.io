/* Text that animates but reads fine without JS (CSS char rise; GSAP word lift).
   Characters are grouped per word in nowrap wrappers, so big titles break
   between words, never inside one ("Dash / board"). */
export function Chars({ text, start = 0 }: { text: string; start?: number }) {
  let i = start;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(' ').map((word, w, all) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((c) => (
                <span key={i} className="char-rise">
                  <span style={{ ['--i' as string]: i++ }}>{c}</span>
                </span>
              ))}
            </span>
            {w < all.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </>
  );
}

export function Words({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w inline-block overflow-hidden align-bottom pt-[0.16em] -mt-[0.16em] pb-[0.1em] -mb-[0.1em]">
            <span className="inline-block whitespace-nowrap">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}
