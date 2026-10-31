import React from 'react';

export const Badge = ({ children, variant = 'cyan', className = '' }) => {
  const variantStyles = {
    cyan: 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 shadow-[0_0_12px_rgba(0,240,255,0.15)]',
    purple: 'border-neon-purple/30 text-neon-purple bg-neon-purple/5 shadow-[0_0_12px_rgba(184,0,255,0.15)]',
    silver: 'border-white/10 text-chrome-silver bg-white/5',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase border backdrop-blur-sm ${variantStyles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
};

