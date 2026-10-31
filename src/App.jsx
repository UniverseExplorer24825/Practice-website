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
import { FinalSection } from './components/dom/FinalSection';
import { Footer } from './components/dom/Footer';

export function App() {
  const setScrollProgress = useNexusStore((s) => s.setScrollProgress);
  const setActiveSection = useNexusStore((s) => s.setActiveSection);
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll Engine
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
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      const progress = e.progress !== undefined ? e.progress : e.scroll / (e.limit || 1);
      setScrollProgress(progress);
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // 3. Register ScrollTrigger markers for Section Activation
    const sections = [
      { id: 'hero', name: 'hero' },
      { id: 'dimension', name: 'dimension' },
      { id: 'journey', name: 'journey' },
      { id: 'interactive', name: 'interactive' },
      { id: 'final', name: 'final' },
    ];

    sections.forEach(({ id, name }) => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(name),
          onEnterBack: () => setActiveSection(name),
        });
      }
    });

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setScrollProgress, setActiveSection]);

  return (
    <div className="relative min-h-screen bg-void text-chrome-silver selection:bg-neon-cyan/20 selection:text-neon-cyan">
      {/* 1. Global Custom Cursor */}
      <CustomCursor />

      {/* 2. Loading Screen */}
      <LoadingScreen />

      {/* 3. Global HUD Navbar */}
      <Navbar />

      {/* 4. Fixed 3D Scene Layer (Decoupled from DOM) */}
      <ThreeDScene />

      {/* 5. DOM Overlay Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <div id="hero">
          <HeroSection />
        </div>

        <div id="dimension">
          <DimensionSection />
        </div>

        <div id="journey">
          <JourneySection />
        </div>

        <div id="interactive">
          <InteractiveSection />
        </div>

        <div id="final">
          <FinalSection />
        </div>
      </main>

      {/* 6. Technical Terminal Footer */}
      <Footer />
    </div>
  );
}

export default App;

