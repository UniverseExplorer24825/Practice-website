import React from 'react';
import { ArrowUp, Terminal, Github, Twitter, Disc } from 'lucide-react';
import { useNexusStore } from '../../store/useNexusStore';

export const Footer = () => {
  const setCursor = useNexusStore((s) => s.setCursor);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-charcoal-950/90 py-16 px-6 z-10 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Manifesto */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-neon-cyan shadow-[0_0_8px_#00f0ff]" />
            <span className="font-display font-bold text-lg tracking-widest text-white">
              NEXUS
            </span>
            <span className="text-xs text-chrome-dark">
              // EXPERIMENTAL COMPUTING SYSTEM
            </span>
          </div>
          <p className="font-sans text-xs text-chrome-dark max-w-sm font-light">
            Crafted with React, Three.js, React Three Fiber, GSAP, and Lenis. An open exploration
            into the next generation of volumetric web experiences.
          </p>
        </div>

        {/* Telemetry Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-chrome-mute">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor('hover', 'GIT')}
            onMouseLeave={() => setCursor('default')}
            className="flex items-center gap-1.5 hover:text-neon-cyan transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>SOURCE CODE</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor('hover', 'X')}
            onMouseLeave={() => setCursor('default')}
            className="flex items-center gap-1.5 hover:text-neon-purple transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span>TRANSMISSIONS</span>
          </a>
          <div className="flex items-center gap-1.5 text-chrome-dark">
            <Terminal className="w-3.5 h-3.5" />
            <span>BUILD: 2026.10-RC1</span>
          </div>
        </div>

        {/* Warp to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setCursor('hover', 'TOP')}
          onMouseLeave={() => setCursor('default')}
          className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan transition-all text-xs text-chrome-silver group"
        >
          <span>WARP TO APEX</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-chrome-dark gap-4">
        <span>© 2026 NEXUS KERNEL. ALL RIGHTS RESERVED ACROSS REALITIES.</span>
        <span>LATENCY: 0.8MS // FRAME BUDGET: 16.6MS // GPU LOAD: 18%</span>
      </div>
    </footer>
  );
};

