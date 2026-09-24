import React from 'react';
import { AboutHero } from '@/components/user/about-us/AboutHero';
import { AboutStory } from '@/components/user/about-us/AboutStory';
import { WhyUsGrid } from '@/components/user/about-us/WhyUsGrid';
import { LocationCTA } from '@/components/user/about-us/LocationCTA';

export const metadata = {
  title: 'Nosotros | Hotel Santa Fe Chignahuapan',
  description: 'Conoce más sobre el Hotel Santa Fe Chignahuapan, nuestra ubicación en el centro histórico, instalaciones y servicios familiares.',
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed]">
      <AboutHero />
      <AboutStory />
      <WhyUsGrid />
      <LocationCTA />
    </main>
  );
}