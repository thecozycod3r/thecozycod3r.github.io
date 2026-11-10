import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Motion from '@/components/deck/Motion';
import HeroDeal from '@/components/deck/HeroDeal';
import { Hero, System, Work, Sites, Record, About, Contact } from '@/components/deck/Home';

export default function Home() {
  return (
    <div className="felt flex min-h-full flex-col">
      <HeroDeal />
      <Motion />
      <Navbar />
      <main>
        <Hero />
        <System />
        <Work />
        <Sites />
        <Record />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
