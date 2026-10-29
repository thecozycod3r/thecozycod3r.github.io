import { EMAIL, LINKEDIN, GITHUB, RESUME } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ borderTop: '1px solid var(--rule)' }}>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-[13px]" style={{ color: 'var(--ink-3)' }}>
        <p>Dhruv Shricharan, Bengaluru. Designed and built by me, as cozycod3r.</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li><a className="inline-flex min-h-11 items-center hover:text-[var(--cobalt)]" href={`mailto:${EMAIL}`}>Email</a></li>
          <li><a className="inline-flex min-h-11 items-center hover:text-[var(--cobalt)]" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="inline-flex min-h-11 items-center hover:text-[var(--cobalt)]" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="inline-flex min-h-11 items-center hover:text-[var(--cobalt)]" href={RESUME} download>Résumé</a></li>
        </ul>
      </div>
    </footer>
  );
}
