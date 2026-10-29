import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MotionRoot from '@/components/night/MotionRoot';
import { Hero, Flow, Work, Sites, Statement, Experience, Toolkit, About, Contact } from '@/components/night/Home';

export default function Home() {
  return (
    <div className="night flex min-h-full flex-col">
      <MotionRoot />
      <Navbar />
      <main>
        <Hero />
        <Flow />
        <Work />
        <Sites />
        <Statement />
        <Experience />
        <Toolkit />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
