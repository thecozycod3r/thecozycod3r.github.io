import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkillsSection from '@/components/SkillsSection';
import StickyExperience from '@/components/StickyExperience';
import EducationExtras from '@/components/EducationExtras';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <SkillsSection />
        <StickyExperience />
        <EducationExtras />
        <Footer />
      </main>
    </>
  );
}
