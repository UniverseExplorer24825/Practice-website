import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNexusStore } from '../../store/useNexusStore';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorVariant = useNexusStore((s) => s.cursorVariant);
  const cursorText = useNexusStore((s) => s.cursorText);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      borderWidth: '1.5px',
      borderColor: 'rgba(0, 240, 255, 0.6)',
      backgroundColor: 'rgba(0, 240, 255, 0.03)',
      scale: 1,
    },
    hover: {
      width: 72,
      height: 72,
      borderWidth: '2px',
      borderColor: '#00f0ff',
      backgroundColor: 'rgba(0, 240, 255, 0.12)',
      scale: 1.15,
    },
    drag: {
      width: 60,
      height: 60,
      borderWidth: '2px',
      borderColor: '#b800ff',
      backgroundColor: 'rgba(184, 0, 255, 0.15)',
      scale: 1.1,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-screen">
      {/* Outer Smooth Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono tracking-widest text-neon-cyan uppercase font-bold px-1 select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Immediate Micro Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00f0ff] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

