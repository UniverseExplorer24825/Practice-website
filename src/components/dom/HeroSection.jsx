import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Activity, Disc } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SplitText } from '../reactbits/SplitText';
import { DecryptedText } from '../reactbits/DecryptedText';
import { BlurText } from '../reactbits/BlurText';
import { useNexusStore } from '../../store/useNexusStore';

export const HeroSection = () => {
  const setCursor = useNexusStore((s) => s.setCursor);
  const setDistortion = useNexusStore((s) => s.setDistortion);

  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 max-w-7xl mx-auto z-10 select-none">
      {/* 1. Subtle Atmospheric Violet & Blue Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-neon-violet/15 via-neon-cyan/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* 2. Top Minimal Telemetry HUD */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full flex flex-wrap items-center justify-between gap-4 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <Badge variant="cyan">SYS // ONLINE</Badge>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-chrome-dark tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
            <DecryptedText
              text="KERNEL v2.4 // CHROMIUM MESH"
              speed={35}
              maxIterations={12}
              className="text-chrome-silver"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-chrome-mute">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span className="hidden md:inline">FREQ:</span>
            <span className="text-chrome-light">432.8 THZ</span>
          </div>
          <span className="text-white/20">/</span>
          <div className="flex items-center gap-2">
            <Disc className="w-3.5 h-3.5 text-neon-purple animate-spin-slow" />
            <span className="hidden md:inline">FIELD:</span>
            <span className="text-neon-purple">STABLE</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Center Monumental Headline & Narrative Reveal */}
      <div className="my-auto flex flex-col items-center text-center py-10 pointer-events-auto">
        {/* React Bits Decrypted Cybernetic Subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 px-3 py-1 border border-neon-cyan/20 bg-charcoal-900/60 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(0,240,255,0.1)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <DecryptedText
            text="DIMENSIONAL SPATIAL EXPERIENCE"
            speed={30}
            maxIterations={15}
            className="font-mono text-[10px] sm:text-xs tracking-ultra text-neon-cyan font-bold uppercase"
          />
        </motion.div>

        {/* Monumental Headline using React Bits SplitText */}
        <div
          onMouseEnter={() => {
            setCursor('hover', 'NEXUS');
            setDistortion(1.5);
          }}
          onMouseLeave={() => {
            setCursor('default');
            setDistortion(0.8);
          }}
          className="relative inline-block cursor-default group"
        >
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-chrome-silver to-white/25 select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]">
            <SplitText
              text="NEXUS"
              delay={80}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,60px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing={[0.22, 1, 0.36, 1]}
            />
          </h1>

          {/* Holographic underline beam */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60 shadow-[0_0_15px_#00f0ff]"
          />
        </div>

        {/* Editorial description using React Bits BlurText */}
        <div className="mt-8 max-w-xl mx-auto">
          <BlurText
            text="Transcending static interfaces with autonomous liquid-metal geometry, procedural GPU harmonics, and unified spatial orchestration."
            delay={35}
            direction="top"
            className="font-sans text-sm sm:text-base md:text-lg text-chrome-mute leading-relaxed font-light justify-center text-center"
          />
        </div>

        {/* Action Buttons with magnetic hover feedback */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Button
            variant="primary"
            size="lg"
            icon={Terminal}
            cursorLabel="ENTER"
            onClick={handleExploreClick}
            className="shadow-neon-cyan hover:shadow-neon-glow"
          >
            ENTER THE MATRIX
          </Button>

          <Button
            variant="secondary"
            size="lg"
            cursorLabel="HARMONIC"
            onClick={() => setDistortion(2.0)}
          >
            PULSE FREQUENCY
          </Button>
        </motion.div>
      </div>

      {/* 4. Bottom Scroll-To-Explore Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 pointer-events-auto"
      >
        <div className="flex items-center gap-6 font-mono text-[11px] text-chrome-dark">
          <div>
            <span className="text-chrome-mute">SPATIAL INDEX: </span>
            <span className="text-neon-cyan">00 // APEX</span>
          </div>
          <span className="hidden sm:inline text-white/10">|</span>
          <div className="hidden sm:block">
            <span className="text-chrome-mute">REFRACTION: </span>
            <span className="text-chrome-silver">CHROMIUM-108</span>
          </div>
        </div>

        <button
          onClick={handleExploreClick}
          onMouseEnter={() => setCursor('hover', 'SCROLL')}
          onMouseLeave={() => setCursor('default')}
          className="flex items-center gap-3 text-xs font-mono text-chrome-mute hover:text-neon-cyan transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-cyan group-hover:bg-neon-cyan/10 transition-all shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)]">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-neon-cyan" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
