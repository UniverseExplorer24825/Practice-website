import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNexusStore } from '../../store/useNexusStore';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL KERNEL');
  const isLoaded = useNexusStore((s) => s.isLoaded);
  const setLoaded = useNexusStore((s) => s.setLoaded);

  useEffect(() => {
    const statusMessages = [
      { at: 15, msg: 'WARMING GRAPHICS PIPELINE' },
      { at: 35, msg: 'COMPILING LIQUID CHROME SHADERS' },
      { at: 60, msg: 'ESTABLISHING TACHYON FIELD' },
      { at: 85, msg: 'SYNCHRONIZING DIMENSIONAL VECTORS' },
      { at: 98, msg: 'NEXUS SYSTEM OPERATIONAL' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoaded(true), 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 3;
        const capped = Math.min(next, 100);

        const currentMsg = statusMessages.find((m) => capped >= m.at);
        if (currentMsg) setStatusText(currentMsg.msg);

        return capped;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="nexus-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void text-chrome-silver select-none"
        >
          {/* Subtle background animated radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/10 via-neon-cyan/5 to-transparent pointer-events-none" />

          {/* Center Holographic Core Ring */}
          <div className="relative mb-12 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-white/5 animate-spin-slow" />
            <div className="absolute w-32 h-32 rounded-full border border-dashed border-neon-cyan/30 animate-[spin_12s_linear_infinite_reverse]" />
            <div className="absolute w-24 h-24 rounded-full border border-neon-purple/40 shadow-neon-purple animate-pulse" />
            
            <div className="absolute text-center">
              <span className="font-mono text-4xl font-bold tracking-tighter text-white glow-text-cyan">
                {progress}
                <span className="text-xs text-neon-cyan ml-0.5">%</span>
              </span>
            </div>
          </div>

          {/* System Telemetry & Status */}
          <div className="flex flex-col items-center space-y-3 px-6 text-center z-10 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              <span className="font-mono text-[11px] tracking-ultra text-neon-cyan uppercase">
                {statusText}
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-64 h-[2px] bg-charcoal-800 rounded-full overflow-hidden relative border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            <div className="flex justify-between w-64 text-[9px] font-mono text-chrome-dark tracking-widest">
              <span>MEM: 0x88F0</span>
              <span>DIM: PROTO-01</span>
              <span>RES: OPTIMAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

