import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Compass } from 'lucide-react';
import { useNexusStore } from '../../store/useNexusStore';

export const Navbar = () => {
  const [time, setTime] = useState('');
  const soundEnabled = useNexusStore((s) => s.soundEnabled);
  const toggleSound = useNexusStore((s) => s.toggleSound);
  const setCursor = useNexusStore((s) => s.setCursor);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between border border-white/5 bg-charcoal-900/60 backdrop-blur-xl px-6 py-3 rounded-none md:rounded-full shadow-glass">
        {/* Brand / Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setCursor('hover', 'HOME')}
          onMouseLeave={() => setCursor('default')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-sm border border-neon-cyan/50 flex items-center justify-center bg-neon-cyan/10 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <span className="text-neon-cyan font-mono text-xs font-bold">⬡</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-widest text-white group-hover:text-neon-cyan transition-colors">
              NEXUS
            </span>
            <span className="font-mono text-[9px] text-chrome-dark tracking-widest">
              v2.4 // PROTOCOL
            </span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {[
            { label: '01. DIMENSION', target: 'dimension' },
            { label: '02. JOURNEY', target: 'journey' },
            { label: '03. INTERACT', target: 'interactive' },
            { label: '04. CONVERGE', target: 'final' },
          ].map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              onMouseEnter={() => setCursor('hover', 'GOTO')}
              onMouseLeave={() => setCursor('default')}
              className="text-chrome-mute hover:text-neon-cyan transition-colors relative py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Controls: Audio & Telemetry */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] text-chrome-mute bg-charcoal-800/80 px-3 py-1.5 border border-white/5">
            <Radio className="w-3 h-3 text-neon-cyan animate-pulse" />
            <span className="text-chrome-silver">{time}</span>
          </div>

          <button
            onClick={toggleSound}
            onMouseEnter={() => setCursor('hover', soundEnabled ? 'MUTE' : 'AUDIO')}
            onMouseLeave={() => setCursor('default')}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-charcoal-800/80 hover:border-neon-cyan hover:text-neon-cyan transition-all text-chrome-mute"
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-neon-cyan" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

