import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Work, Websites, Experience, About, Contact } from '@/components/home/Sections';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Work />
        <Websites />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
