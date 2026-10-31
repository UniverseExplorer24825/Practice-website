import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Compass, Zap, Disc3 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useNexusStore } from '../../store/useNexusStore';

const journeyMilestones = [
  {
    phase: 'STAGE 01',
    codename: 'GENESIS MATRIX',
    status: 'COMPLETE',
    year: '2026.10',
    title: 'SEED ENTROPY CALIBRATION',
    description:
      'Synthesized the primal 3D mesh utilizing high-order spherical harmonics. Established stable GPU render loops with low-overhead WebGL state transitions.',
    icon: GitCommit,
    metric: '4.8M VERTICES/SEC',
  },
  {
    phase: 'STAGE 02',
    codename: 'DIELECTRIC MORPH',
    status: 'OPTIMAL',
    year: '2026.11',
    title: 'CHROMIUM CONDENSATION',
    description:
      'Engineered non-linear viscosity shaders simulating liquid gallium. Integrated multi-light ray reflections with dual electric-blue and ultraviolet emission cones.',
    icon: Zap,
    metric: 'IOR 1.8 // DIELECTRIC',
  },
  {
    phase: 'STAGE 03',
    codename: 'KINETIC ORCHESTRATION',
    status: 'STABLE',
    year: '2026.12',
    title: 'INTERPOLATED SCROLL MECHANICS',
    description:
      'Seamlessly coupled Lenis inertial damping with GSAP ScrollTrigger pipelines, enabling latency-free camera transformations that float across DOM landmarks.',
    icon: Compass,
    metric: '120FPS SCRUB DAMPING',
  },
  {
    phase: 'STAGE 04',
    codename: 'ZERO-POINT CONVERGENCE',
    status: 'REACTIVE',
    year: '2027.01',
    title: 'SPATIAL CONVERGENCE',
    description:
      'Unified DOM interface architecture with real-time WebGL canvas, unlocking hyper-responsive tactile feedback and generative auditory landscapes.',
    icon: Disc3,
    metric: 'REAL-TIME REACTIVE',
  },
];

export const JourneySection = () => {
  const setCursor = useNexusStore((s) => s.setCursor);

  return (
    <section id="journey" className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-16 border-b border-white/5">
        <div>
          <Badge variant="purple" className="mb-4">
            PHASE 02 // CHRONOLOGICAL SEQUENCE
          </Badge>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-tight">
            THE TRAVERSAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-cyan">
              CHRONOLOGY
            </span>
          </h2>
        </div>
        <p className="max-w-md font-sans text-chrome-mute text-sm leading-relaxed">
          From primitive coordinate grids to fluid computational consciousness. Follow the progressive
          evolution of the NEXUS core architecture.
        </p>
      </div>

      {/* Futuristic Timeline Stream */}
      <div className="mt-20 relative">
        {/* Central Vertical Laser Beam */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent opacity-30 pointer-events-none" />

        <div className="space-y-16 md:space-y-24">
          {journeyMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = milestone.icon;

            return (
              <motion.div
                key={milestone.codename}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Pulse Node on Timeline */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-neon-cyan/40 bg-charcoal-950 items-center justify-center z-20 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
                </div>

                {/* Content Card */}
                <div
                  onMouseEnter={() => setCursor('hover', milestone.phase)}
                  onMouseLeave={() => setCursor('default')}
                  className={`w-full md:w-[46%] glass-panel p-8 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-charcoal-900/90 group ${
                    isEven ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-[11px] text-neon-cyan tracking-ultra uppercase">
                      {milestone.phase} // {milestone.codename}
                    </span>
                    <span className="font-mono text-[10px] text-chrome-dark border border-white/5 px-2 py-0.5">
                      {milestone.year}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-neon-cyan transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="mt-3 font-sans text-sm text-chrome-mute leading-relaxed font-light">
                    {milestone.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-chrome-dark">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-neon-purple" />
                      <span className="text-chrome-silver">{milestone.metric}</span>
                    </div>
                    <span className="text-neon-cyan text-[10px]">{milestone.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

