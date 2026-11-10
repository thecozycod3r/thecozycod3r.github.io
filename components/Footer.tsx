import { EMAIL, LINKEDIN, GITHUB, RESUME } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="foot noir mt-auto">
      <div className="foot-in wrap">
        <p>Dhruv Shricharan, Bengaluru. Designed and built by me, as cozycod3r.</p>
        <ul>
          <li><a href={`mailto:${EMAIL}`}>Email</a></li>
          <li><a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={RESUME} download>Résumé</a></li>
        </ul>
      </div>
    </footer>
  );
}
