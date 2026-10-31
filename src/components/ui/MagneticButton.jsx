import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNexusStore } from '../../store/useNexusStore';

/**
 * MagneticButton with true cursor-following physics and cybernetic aesthetic
 */
export const MagneticButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'cyan' | 'purple'
  size = 'md',
  cursorLabel = 'ENGAGE',
  className = '',
  icon: Icon,
  strength = 0.35,
  ...props
}) => {
  const buttonRef = useRef(null);
  const setCursor = useNexusStore((s) => s.setCursor);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseEnter = () => {
    setCursor('hover', cursorLabel);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCursor('default');
  };

  const variantStyles = {
    primary:
      'bg-charcoal-900/90 text-chrome-light border border-neon-cyan/40 hover:border-neon-cyan hover:shadow-neon-cyan hover:text-white',
    secondary:
      'bg-charcoal-850/80 text-chrome-silver border border-white/10 hover:border-neon-purple/60 hover:text-white hover:shadow-neon-purple',
    cyan:
      'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/60 hover:bg-neon-cyan/20 hover:shadow-neon-cyan',
    purple:
      'bg-neon-purple/10 text-neon-purple border border-neon-purple/60 hover:bg-neon-purple/20 hover:shadow-neon-purple',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2',
    md: 'text-xs px-6 py-3.5 gap-3',
    lg: 'text-sm px-8 py-4 gap-4',
  }[size];

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`relative group inline-flex items-center justify-center font-mono uppercase tracking-widest select-none overflow-hidden backdrop-blur-md rounded-none transition-colors duration-200 ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {/* Corner Tech Brackets */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current pointer-events-none transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current pointer-events-none transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" />

      {/* Internal Glare Sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform ease-in-out pointer-events-none" />

      {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />}
      <span className="relative z-10 font-bold">{children}</span>
    </motion.button>
  );
};

