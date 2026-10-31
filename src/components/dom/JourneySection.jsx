import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import { Badge } from '../ui/Badge';
import { GitCommit, Zap, Compass, Disc3, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNexusStore } from '../../store/useNexusStore';

const milestones = [
  {
    phase: 'MILESTONE 01',
    code: 'GENESIS MATRIX',
    year: '2026.10',
    title: 'SEED ENTROPY CALIBRATION',
    description:
      'Synthesized the primal 3D mesh utilizing high-order spherical harmonics. Established stable GPU render loops with low-overhead WebGL state transitions.',
    metric: '4.8M VERTICES/SEC',
    status: 'OPTIMAL',
    icon: GitCommit,
    color: 'cyan',
  },
  {
    phase: 'MILESTONE 02',
    code: 'DIELECTRIC MORPH',
    year: '2026.11',
    title: 'CHROMIUM CONDENSATION',
    description:
      'Engineered non-linear viscosity shaders simulating liquid gallium. Integrated multi-light ray reflections with dual electric-blue and ultraviolet emission cones.',
    metric: 'IOR 1.8 // DIELECTRIC',
    status: 'ACTIVE',
    icon: Zap,
    color: 'purple',
  },
  {
    phase: 'MILESTONE 03',
    code: 'KINETIC ORCHESTRATION',
    year: '2026.12',
    title: 'INTERPOLATED SCROLL ENGINE',
    description:
      'Seamlessly coupled Lenis inertial damping with GSAP ScrollTrigger pipelines, enabling latency-free camera transformations that float across DOM landmarks.',
    metric: '120FPS SCRUB DAMPING',
    status: 'LOCKED',
    icon: Compass,
    color: 'cyan',
  },
  {
    phase: 'MILESTONE 04',
    code: 'ZERO-POINT CONVERGENCE',
    year: '2027.01',
    title: 'SPATIAL CONVERGENCE',
    description:
      'Unified DOM interface architecture with real-time WebGL canvas, unlocking hyper-responsive tactile feedback and generative auditory landscapes.',
    metric: 'FULL HARMONIC SYNC',
    status: 'SYNCHRONIZED',
    icon: Disc3,
    color: 'purple',
  },
];

export const JourneySection = () => {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const setCursor = useNexusStore((s) => s.setCursor);
  const setDistortion = useNexusStore((s) => s.setDistortion);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      // Main Horizontal Scrub Animation
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      // Background Parallax for Giant Milestone Numbers (Multi-plane effect)
      const numerals = gsap.utils.toArray('.journey-parallax-num');
      numerals.forEach((num) => {
        gsap.to(num, {
          x: -160,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative w-full h-[360vh] bg-transparent"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between pt-24 pb-12 overflow-hidden pointer-events-none"
      >
        {/* Top Section Header & Timeline Progress Bar */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-4 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Badge variant="purple">PHASE 02 // CHRONOLOGICAL SEQUENCE</Badge>
              <span className="hidden sm:inline font-mono text-[10px] text-chrome-dark tracking-widest">
                HORIZONTAL TRAVERSAL TRACK
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-chrome-mute">
              <span>TIMELINE SCRUB</span>
              <div className="w-24 sm:w-40 h-[2px] bg-charcoal-800 rounded-full overflow-hidden relative">
                <div
                  ref={progressBarRef}
                  className="w-full h-full bg-gradient-to-r from-neon-cyan via-white to-neon-purple origin-left scale-x-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center Horizontal Scrolling Track */}
        <div
          ref={trackRef}
          className="my-auto flex items-center gap-8 sm:gap-12 pl-6 sm:pl-16 pr-32 w-max pointer-events-auto"
        >
          {/* Intro Card */}
          <div className="w-[85vw] sm:w-[420px] flex-shrink-0 flex flex-col justify-center space-y-5 pr-4">
            <span className="font-mono text-xs text-neon-cyan tracking-ultra uppercase font-bold">
              // CHRONOLOGY MATRIX
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              THE TRAVERSAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-cyan">
                JOURNEY
              </span>
            </h2>
            <p className="font-sans text-sm text-chrome-mute leading-relaxed font-light">
              Scroll downward to pan horizontally through the timeline of volumetric spatial
              breakthroughs.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan pt-2">
              <span>EXPLORE PHASES</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          {/* 4 Storytelling Milestone Cards with Parallax Numbers */}
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.code}
                onMouseEnter={() => {
                  setCursor('hover', `0${idx + 1}`);
                  setDistortion(1.5);
                }}
                onMouseLeave={() => {
                  setCursor('default');
                  setDistortion(0.8);
                }}
                className="relative w-[85vw] sm:w-[480px] md:w-[540px] flex-shrink-0 glass-panel p-8 sm:p-10 border border-white/10 hover:border-neon-cyan/40 hover:bg-charcoal-900/90 transition-all duration-300 group overflow-hidden"
              >
                {/* Background Parallax Numeral */}
                <span className="journey-parallax-num absolute -right-6 -bottom-10 font-display font-black text-9xl sm:text-[11rem] text-white/[0.04] select-none pointer-events-none group-hover:text-neon-cyan/[0.06] transition-colors">
                  0{idx + 1}
                </span>

                {/* Card Header */}
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neon-cyan tracking-ultra font-bold uppercase">
                      {m.phase}
                    </span>
                    <span className="font-mono text-[10px] text-chrome-dark border border-white/5 px-2 py-0.5">
                      {m.year}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-chrome-mute group-hover:border-neon-cyan group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Milestone Code & Headline */}
                <div className="relative z-10 space-y-2">
                  <span className="font-mono text-[11px] text-chrome-dark tracking-widest uppercase block">
                    CODE: {m.code}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-neon-cyan transition-colors">
                    {m.title}
                  </h3>
                </div>

                {/* Narrative Description */}
                <p className="mt-4 font-sans text-sm text-chrome-mute leading-relaxed font-light relative z-10">
                  {m.description}
                </p>

                {/* Footer Telemetry */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between font-mono text-xs text-chrome-dark relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="text-chrome-silver">{m.metric}</span>
                  </div>
                  <span className="text-neon-cyan text-[10px] font-bold">{m.status}</span>
                </div>
              </div>
            );
          })}

          {/* Outro Convergence Teaser Card */}
          <div className="w-[85vw] sm:w-[380px] flex-shrink-0 glass-panel p-8 sm:p-10 border border-neon-purple/30 bg-charcoal-900/60 flex flex-col justify-center space-y-4">
            <Badge variant="purple">CONVERGENCE READY</Badge>
            <h3 className="font-display font-bold text-2xl text-white">
              RESONANCE ACHIEVED
            </h3>
            <p className="font-sans text-xs text-chrome-mute leading-relaxed font-light">
              All spatial coordinates are synchronized. Proceed to the tactile playground.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-neon-purple">
              <ShieldCheck className="w-4 h-4" />
              <span>QUANTUM LOCK ENGAGED</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] text-chrome-dark pointer-events-auto">
          <span>COORDINATE DRIFT: 0.00%</span>
          <span className="text-chrome-mute uppercase tracking-widest">
            SCROLL TO CONTINUE &darr;
          </span>
        </div>
      </div>
    </div>
  );
};
