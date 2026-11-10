import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page not found — Dhruv Shricharan',
};

export default function NotFound() {
  return (
    <div className="felt flex min-h-full flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <header className="sub-hero felt no-media">
          <div className="wrap">
            <h1 className="sub-title display" style={{ fontSize: 'clamp(64px, 15vw, 236px)' }}>Misdeal.</h1>
            <div className="sub-lede" style={{ marginTop: 'clamp(26px, 3.4vw, 44px)' }}>
              <p>That page is not in the deck. It may have moved, or the link was mistyped.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-solid">Back to the table</Link>
                <Link href="/websites/" className="btn btn-line">See the websites</Link>
              </div>
            </div>
          </div>
        </header>
      </main>
      <Footer />
    </div>
  );
}
