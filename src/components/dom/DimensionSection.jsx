import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, Eye, Activity } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useNexusStore } from '../../store/useNexusStore';

const dimensions = [
  {
    index: '01',
    title: 'LIQUID CHROMIUM',
    subtitle: 'Autonomous Fluid Dynamics',
    description:
      'Continuous sinusoidal noise functions warp high-reflectivity vertex buffers in real-time, delivering organic mercury deformation at a constant 60 frames per second.',
    icon: Activity,
    tag: 'DYNAMIC VERTEX DISPLACEMENT',
    color: 'cyan',
  },
  {
    index: '02',
    title: 'OPTICAL TRANSMISSION',
    subtitle: 'Dielectric Refraction & Dispersion',
    description:
      'Dual-pass physical transmission shaders emulate frosted crystal optics, generating dynamic chromatic aberration and specular dispersion across high-contrast environments.',
    icon: Eye,
    tag: 'PHYSICAL SHADING (IOR: 1.8)',
    color: 'purple',
  },
  {
    index: '03',
    title: 'SYNAPSE COHERENCE',
    subtitle: 'Synchronized DOM-to-Canvas Matrix',
    description:
      'A decoupled architecture bridges Lenis inertia scrolling directly into GSAP ScrollTrigger timelines, feeding normalized scroll milestones into the 3D camera trajectory.',
    icon: Layers,
    tag: 'LENIS + GSAP TICKER BRIDGED',
    color: 'cyan',
  },
];

export const DimensionSection = () => {
  const setCursor = useNexusStore((s) => s.setCursor);
  const setDistortion = useNexusStore((s) => s.setDistortion);

  return (
    <section id="dimension" className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-16 border-b border-white/5">
        <div>
          <Badge variant="cyan" className="mb-4">
            PHASE 01 // ARCHITECTURAL TAXONOMY
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            DIMENSIONAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              TOPOLOGIES
            </span>
          </h2>
        </div>
        <p className="max-w-md font-sans text-chrome-mute text-sm leading-relaxed">
          Traversing beyond static planar interfaces. Each dimension represents a structural layer
          within our spatial canvas, reacting dynamically to observer proximity.
        </p>
      </div>

      {/* Asymmetrical Grid Layout */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Telemetry Column */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="glass-panel p-6 border-l-2 border-l-neon-cyan">
            <span className="font-mono text-[10px] tracking-ultra text-neon-cyan uppercase">
              STATUS TELEMETRY
            </span>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-chrome-dark">ACTIVE MESH:</span>
                <span className="text-chrome-silver">ICOSAHEDRON-V32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-chrome-dark">LIGHT VECTOR:</span>
                <span className="text-neon-cyan">BLUE-VIOLET BI-POLAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-chrome-dark">DISPERSION:</span>
                <span className="text-neon-purple">CHROMATIC (0.08)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-chrome-dark">SCROLL INERTIA:</span>
                <span className="text-chrome-silver">LENIS LERP 0.08</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block p-6 border border-white/5 bg-charcoal-900/40 font-mono text-[11px] text-chrome-dark leading-relaxed">
            "The screen is no longer a surface of representation, but a volumetric portal into
            generative geometry."
          </div>
        </div>

        {/* Right Staggered Content Stream */}
        <div className="lg:col-span-8 space-y-8">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <motion.div
                key={dim.index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                onMouseEnter={() => {
                  setCursor('hover', dim.index);
                  setDistortion(1.4);
                }}
                onMouseLeave={() => {
                  setCursor('default');
                  setDistortion(0.8);
                }}
                className="group relative glass-panel p-8 sm:p-10 transition-all duration-500 hover:border-white/20 hover:bg-charcoal-900/80 hover:translate-x-1"
              >
                {/* Glow Hover Line */}
                <div
                  className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ${
                    dim.color === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-purple'
                  }`}
                />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-white/20 group-hover:text-neon-cyan transition-colors">
                      {dim.index}
                    </span>
                    <Badge variant={dim.color === 'cyan' ? 'cyan' : 'purple'}>
                      {dim.tag}
                    </Badge>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-chrome-mute group-hover:border-neon-cyan group-hover:text-neon-cyan transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-neon-cyan transition-colors">
                  {dim.title}
                </h3>
                <h4 className="font-mono text-xs text-chrome-dark tracking-widest uppercase mt-1 mb-4">
                  {dim.subtitle}
                </h4>

                <p className="font-sans text-sm sm:text-base text-chrome-mute leading-relaxed font-light">
                  {dim.description}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-chrome-dark">
                  <span>VECTOR: DIM-0{idx + 1}</span>
                  <span className="group-hover:text-chrome-silver transition-colors">
                    EXPAND METRICS &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

