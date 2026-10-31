import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Sparkles, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useNexusStore } from '../../store/useNexusStore';

export const HeroSection = () => {
  const setCursor = useNexusStore((s) => s.setCursor);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 max-w-7xl mx-auto z-10 pointer-events-none">
      {/* Top Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <Badge variant="cyan">SYS // ARCHITECTURE ACTIVE</Badge>
          <span className="hidden sm:inline font-mono text-[11px] text-chrome-dark tracking-widest">
            PORT: 3000 // PROTOCOL: R3F-LENIS
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-chrome-mute">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span>RENDER ENGINE: WEBGL2</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-neon-purple" />
            <span>TOPOLOGY: LIQUID CHROME</span>
          </div>
        </div>
      </div>

      {/* Center Monumental Headline */}
      <div className="my-auto flex flex-col items-center text-center py-16 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="font-mono text-xs md:text-sm text-neon-cyan tracking-ultra uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-neon-cyan" />
            <span>EXPERIMENTAL SPATIAL MEDIUM</span>
            <span className="w-8 h-[1px] bg-neon-cyan" />
          </div>

          <h1
            onMouseEnter={() => setCursor('hover', 'NEXUS')}
            onMouseLeave={() => setCursor('default')}
            className="font-display font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-chrome-silver to-white/20 select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            NEXUS
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-sm md:text-lg text-chrome-mute tracking-wide leading-relaxed font-light">
            Transcending conventional web interfaces through autonomous liquid-metal
            geometry, real-time spatial physics, and synchronized multi-dimensional orchestration.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={Terminal}
              cursorLabel="ENTER"
              onClick={() => handleScroll('dimension')}
            >
              INITIALIZE TRAVERSAL
            </Button>
            <Button
              variant="secondary"
              size="lg"
              cursorLabel="TEST"
              onClick={() => handleScroll('interactive')}
            >
              LAUNCH PLAYGROUND
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom HUD Bar & Scroll Cue */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5 pointer-events-auto">
        <div className="flex items-center gap-6 font-mono text-[11px] text-chrome-dark">
          <div>
            <span className="text-chrome-mute">COORD: </span>
            <span className="text-chrome-silver">37°46'N 122°25'W</span>
          </div>
          <div>
            <span className="text-chrome-mute">DIMENSION: </span>
            <span className="text-neon-cyan">01 // TACHYON</span>
          </div>
        </div>

        <button
          onClick={() => handleScroll('dimension')}
          onMouseEnter={() => setCursor('hover', 'SCROLL')}
          onMouseLeave={() => setCursor('default')}
          className="flex items-center gap-3 text-xs font-mono text-chrome-mute hover:text-neon-cyan transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase">SCROLL TO TRAVERSE</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon-cyan group-hover:bg-neon-cyan/10 transition-all">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
};

