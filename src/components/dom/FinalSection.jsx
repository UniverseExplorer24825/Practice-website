import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useNexusStore } from '../../store/useNexusStore';

export const FinalSection = () => {
  const [initiated, setInitiated] = useState(false);
  const setCursor = useNexusStore((s) => s.setCursor);
  const setDistortion = useNexusStore((s) => s.setDistortion);

  const handleConvergence = () => {
    setInitiated(true);
    setDistortion(2.2);
    setTimeout(() => {
      setDistortion(0.8);
    }, 2500);
  };

  return (
    <section id="final" className="relative min-h-screen py-32 px-6 max-w-7xl mx-auto z-10 flex flex-col justify-center items-center text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-purple/15 via-neon-cyan/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl space-y-8 z-10"
      >
        <Badge variant="cyan" className="mb-2">
          PHASE 04 // ZERO-POINT HARMONIC
        </Badge>

        <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white">
          THE NEXUS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
            CONVERGENCE
          </span>
        </h2>

        <p className="font-sans text-chrome-silver text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          The boundary between static interfaces and volumetric spatial worlds has dissolved.
          Join the protocol, deploy custom shaders, and synthesize your own reality.
        </p>

        {/* Action Button & Confirmation */}
        <div className="pt-6 flex flex-col items-center justify-center gap-4">
          {!initiated ? (
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              cursorLabel="ENGAGE"
              onClick={handleConvergence}
              className="text-sm px-10 py-5 shadow-neon-glow"
            >
              INITIATE CONVERGENCE &rarr;
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 border-neon-cyan flex items-center gap-3 text-neon-cyan font-mono text-sm shadow-neon-cyan"
            >
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
              <span>CONVERGENCE SEQUENCE SYNCHRONIZED // QUANTUM CORE LOCKED</span>
            </motion.div>
          )}

          <div className="flex items-center gap-6 mt-4 font-mono text-xs text-chrome-dark">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-neon-cyan" />
              <span>END-TO-END QUANTUM ENCRYPTION</span>
            </div>
            <span>//</span>
            <span>ZERO LATENCY STREAM</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

