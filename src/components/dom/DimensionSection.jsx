import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import { Badge } from '../ui/Badge';
import { Activity, Eye, Zap, Layers } from 'lucide-react';
import { useNexusStore } from '../../store/useNexusStore';

const dimensionData = [
  {
    num: '01',
    category: 'TOPOLOGICAL FLUID',
    headline: 'LIQUID MERCURY',
    subtitle: 'CONTINUOUS HARMONIC SURFACE',
    description:
      'Autonomous non-Euclidean vertex buffers deform in real-time on the GPU. Multi-frequency trigonometric algorithms generate organic wave displacement without latency.',
    metrics: [
      { label: 'METALNESS', value: '0.96' },
      { label: 'ROUGHNESS', value: '0.06' },
      { label: 'HARMONICS', value: '18.4 GHZ' },
    ],
    icon: Activity,
    color: 'cyan',
  },
  {
    num: '02',
    category: 'OPTICAL DISPERSION',
    headline: 'CRYSTALLINE REFRACTION',
    subtitle: 'DIELECTRIC LIGHT TRANSMISSION',
    description:
      'Simulating physical crystal optics with dynamic index of refraction (IOR 1.8). Dual-pass transmission shaders cast volumetric specular flares across the black void.',
    metrics: [
      { label: 'REFRACTION', value: 'IOR 1.82' },
      { label: 'TRANSMISSION', value: '95%' },
      { label: 'DISPERSION', value: 'SPECTRAL' },
    ],
    icon: Eye,
    color: 'purple',
  },
  {
    num: '03',
    category: 'QUANTUM HARMONIC',
    headline: 'ZERO-POINT RESONANCE',
    subtitle: 'COHERENT SPATIAL OSCILLATION',
    description:
      'Unified spatial matrix coupling observer kinetic input with procedural geometry. Fluid states oscillate between metallic fluidity and wireframe particle fields.',
    metrics: [
      { label: 'ENTROPY', value: 'NULL' },
      { label: 'COHERENCE', value: '99.8%' },
      { label: 'FIELD STATE', value: 'STABLE' },
    ],
    icon: Zap,
    color: 'cyan',
  },
];

export const DimensionSection = () => {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const panelsRef = useRef([]);
  const progressLineRef = useRef(null);
  const setCursor = useNexusStore((s) => s.setCursor);
  const setDistortion = useNexusStore((s) => s.setDistortion);
  const setCoreColor = useNexusStore((s) => s.setCoreColor);

  useGSAP(
    () => {
      const panels = panelsRef.current;
      if (!panels || panels.length === 0) return;

      // Master ScrollTrigger timeline for the pinned full-screen section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Update side progress line
            if (progressLineRef.current) {
              gsap.set(progressLineRef.current, { scaleY: p });
            }
            // Dynamic distortion and color shift through stages
            if (p < 0.33) {
              setCoreColor('#00f0ff');
            } else if (p < 0.66) {
              setCoreColor('#7928ca');
            } else {
              setCoreColor('#b800ff');
            }
          },
        },
      });

      // Initially set up panels: panel 0 visible, panels 1 and 2 below with opacity 0
      gsap.set(panels[0], { opacity: 1, y: 0 });
      gsap.set(panels[1], { opacity: 0, y: 80 });
      gsap.set(panels[2], { opacity: 0, y: 80 });

      // Animate Transition: Panel 0 -> Panel 1
      tl.to(panels[0], { opacity: 0, y: -60, duration: 1, ease: 'power2.inOut' }, 1)
        .fromTo(
          panels[1],
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' },
          1.2
        );

      // Animate Transition: Panel 1 -> Panel 2
      tl.to(panels[1], { opacity: 0, y: -60, duration: 1, ease: 'power2.inOut' }, 2.5)
        .fromTo(
          panels[2],
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.inOut' },
          2.7
        );

      // Hold Panel 2 slightly at the end
      tl.to({}, { duration: 0.8 });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="dimension"
      className="relative w-full h-[320vh] bg-transparent"
    >
      {/* Pinned Full-Screen Container */}
      <div
        ref={pinnedRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden pointer-events-none"
      >
        {/* Top Telemetry Header */}
        <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <Badge variant="cyan">PHASE 01 // DIMENSIONAL SHIFTS</Badge>
            <span className="hidden md:inline font-mono text-[10px] text-chrome-dark tracking-widest">
              PINNED SCROLL SCRUB // THREE STAGES
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-chrome-mute">
            <Layers className="w-3.5 h-3.5 text-neon-cyan" />
            <span>TOPOLOGY SEQUENCER</span>
          </div>
        </div>

        {/* Center Content Zone (Left-aligned to balance right-hand 3D object) */}
        <div className="relative my-auto w-full max-w-xl md:max-w-2xl min-h-[420px] flex items-center pointer-events-auto">
          {dimensionData.map((data, idx) => {
            const Icon = data.icon;
            return (
              <div
                key={data.num}
                ref={(el) => (panelsRef.current[idx] = el)}
                className="absolute inset-0 flex flex-col justify-center space-y-6"
              >
                {/* Background Parallax Numeral */}
                <span className="absolute -top-12 -left-8 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none">
                  {data.num}
                </span>

                {/* Category Pill */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-neon-cyan tracking-ultra uppercase">
                    STAGE {data.num} // {data.category}
                  </span>
                  <div className="h-[1px] w-12 bg-neon-cyan/40" />
                </div>

                {/* Oversized Progressive Headline */}
                <h2
                  onMouseEnter={() => {
                    setCursor('hover', data.num);
                    setDistortion(1.8);
                  }}
                  onMouseLeave={() => {
                    setCursor('default');
                    setDistortion(0.8);
                  }}
                  className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05]"
                >
                  {data.headline.split(' ')[0]} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
                    {data.headline.split(' ')[1]}
                  </span>
                </h2>

                <h4 className="font-mono text-xs text-chrome-dark tracking-widest uppercase">
                  {data.subtitle}
                </h4>

                <p className="font-sans text-sm sm:text-base text-chrome-mute leading-relaxed font-light max-w-lg">
                  {data.description}
                </p>

                {/* Technical HUD Metrics Row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 font-mono">
                  {data.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 border border-white/5 bg-charcoal-900/60 backdrop-blur-md"
                    >
                      <span className="block text-[9px] text-chrome-dark uppercase tracking-widest">
                        {m.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-chrome-silver">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned Footer & Progress Indicator */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-white/5 font-mono text-[11px] text-chrome-dark pointer-events-auto">
          <div className="flex items-center gap-6">
            <span>OBSERVER: ACTIVE</span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="hidden sm:inline">GPU SHADER: DYNAMIC_VERT_DISPLACE</span>
          </div>

          {/* Interactive Phase Indicator */}
          <div className="flex items-center gap-4">
            <span className="text-chrome-mute uppercase tracking-widest">PHASE SEQUENCE</span>
            <div className="flex items-center gap-2">
              <span className="text-neon-cyan font-bold">01</span>
              <div className="w-16 h-[2px] bg-charcoal-800 rounded-full overflow-hidden relative">
                <div
                  ref={progressLineRef}
                  className="w-full h-full bg-gradient-to-r from-neon-cyan to-neon-purple origin-left scale-x-0"
                />
              </div>
              <span className="text-chrome-dark">03</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
