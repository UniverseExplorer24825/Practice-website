import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * BlurText component from React Bits (reactbits.dev)
 * Reveals text word-by-word or character-by-character from a blurred state.
 */
export const BlurText = ({
  text = '',
  delay = 50,
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top', // 'top' | 'bottom'
  className = '',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const yOffset = direction === 'top' ? -20 : 20;

  return (
    <p ref={ref} className={`inline-flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(12px)', opacity: 0, y: yOffset }}
          animate={controls}
          variants={{
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: {
                delay: (index * delay) / 1000,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
          className="inline-block will-change-transform"
        >
          {element}
        </motion.span>
      ))}
    </p>
  );
};

