import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './utils/gsapConfig';
import { useNexusStore } from './store/useNexusStore';

// Components
import { LoadingScreen } from './components/dom/LoadingScreen';
import { CustomCursor } from './components/dom/CustomCursor';
import { Navbar } from './components/dom/Navbar';
import { ThreeDScene } from './components/3d/ThreeDScene';
import { HeroSection } from './components/dom/HeroSection';
import { DimensionSection } from './components/dom/DimensionSection';
import { JourneySection } from './components/dom/JourneySection';
import { InteractiveSection } from './components/dom/InteractiveSection';

export function App() {
  const setScrollProgress = useNexusStore((s) => s.setScrollProgress);
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Inertial Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const handleScroll = (e) => {
      const progress = e.progress !== undefined ? e.progress : e.scroll / (e.limit || 1);
      setScrollProgress(progress);
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis from GSAP's central RAF ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Initial recalculation after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setScrollProgress]);

  return (
    <div className="relative min-h-screen bg-void text-chrome-silver selection:bg-neon-cyan/20 selection:text-neon-cyan overflow-x-hidden">
      {/* 1. Global Custom Cursor with Morphing Ring */}
      <CustomCursor />

      {/* 2. Cybernetic Preloader */}
      <LoadingScreen />

      {/* 3. Minimal Top Navigation */}
      <Navbar />

      {/* 4. Decoupled 3D Scene Layer */}
      <ThreeDScene />

      {/* 5. DOM Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Section 0: Hero Section */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 1: Dimension Section (Pinned Full-Screen Scrub) */}
        <DimensionSection />

        {/* Section 2: Journey Section (Horizontal Storytelling Track) */}
        <JourneySection />

        {/* Section 3: Interactive Section (3D Spotlight Cards & Magnetic Controls) */}
        <InteractiveSection />
      </main>
    </div>
  );
}

export default App;
