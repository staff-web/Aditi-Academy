import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { ParallaxTechBackground } from '../components/ParallaxTechBackground';
import { TechnologyAnimation } from '../components/TechnologyAnimation';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustSection } from '../components/landing/TrustSection';
import { MilestonesSection } from '../components/landing/MilestonesSection';
import { ProgramsSection } from '../components/landing/ProgramsSection';
import { CareerBoostSection } from '../components/landing/CareerBoostSection';
import { EnterpriseSection } from '../components/landing/EnterpriseSection';
import { Footer } from '../components/Footer';
import { useRef } from 'react';

export function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Dark Theme and Animated Background */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <ParallaxTechBackground />
        <TechnologyAnimation />
        <HeroSection />
      </motion.section>

      {/* Remaining sections - Light Theme */}
      <div className="relative bg-white">
        <TrustSection />
        <MilestonesSection />
        <ProgramsSection />
        <CareerBoostSection />
        <EnterpriseSection />
        <Footer />
      </div>
    </div>
  );
}