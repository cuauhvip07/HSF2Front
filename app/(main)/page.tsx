import HeroSection from '@/components/hero/HeroSection';
import FeaturedSections from '@/components/main/FeaturedSection';
import LocationSection from '@/components/main/LocationSection';
import QuestionsSection from '@/components/main/QuestionsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed]">
      <HeroSection />
      <FeaturedSections />
      <LocationSection/>
      <QuestionsSection/>
    </main>
  );
}