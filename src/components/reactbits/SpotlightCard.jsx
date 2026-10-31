import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * SpotlightCard component from React Bits (reactbits.dev)
 * Interactive card with 3D tilt physics and dynamic mouse-following radial spotlight.
 */
export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.15)',
  borderColor = 'rgba(0, 240, 255, 0.3)',
  tiltAmount = 10,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for smooth 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate normalized -1 to 1 from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // Tilt opposite to mouse for natural depth
    tiltX.set(-normY * tiltAmount);
    tiltY.set(normX * tiltAmount);
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: springTiltX,
        rotateY: springTiltY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-xl border border-white/10 bg-charcoal-900/70 backdrop-blur-xl overflow-hidden transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Mouse-Following Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Dynamic Border Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      />

      {/* Internal Content (Rendered on 3D Plane) */}
      <div className="relative z-20 h-full w-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

