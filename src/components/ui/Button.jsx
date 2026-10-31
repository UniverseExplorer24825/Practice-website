import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNexusStore } from '../../store/useNexusStore';

export const Button = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md',
  cursorLabel = 'SELECT',
  className = '',
  icon: Icon,
  ...props
}) => {
  const buttonRef = useRef(null);
  const setCursor = useNexusStore((s) => s.setCursor);

  const baseStyles =
    'relative group inline-flex items-center justify-center font-mono uppercase tracking-widest transition-all duration-300 select-none overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2',
    md: 'text-xs px-6 py-3.5 gap-3',
    lg: 'text-sm px-8 py-4 gap-4',
  }[size];

  const variantStyles = {
    primary:
      'bg-charcoal-900/90 text-chrome-light border border-neon-cyan/40 hover:border-neon-cyan hover:shadow-neon-cyan hover:text-white backdrop-blur-md',
    secondary:
      'bg-charcoal-850/80 text-chrome-silver border border-white/10 hover:border-neon-purple/60 hover:text-white hover:shadow-neon-purple backdrop-blur-md',
    ghost:
      'bg-transparent text-chrome-silver hover:text-neon-cyan border border-transparent hover:border-white/10',
  }[variant];

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setCursor('hover', cursorLabel)}
      onMouseLeave={() => setCursor('default')}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {/* Corner Tech Accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-neon-cyan/80 pointer-events-none transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-neon-cyan/80 pointer-events-none transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" />

      {/* Internal Glare Sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform ease-in-out pointer-events-none" />

      {Icon && <Icon className="w-4 h-4 text-neon-cyan transition-transform duration-300 group-hover:rotate-12" />}
      <span className="relative z-10 font-medium">{children}</span>
    </motion.button>
  );
};

