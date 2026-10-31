import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * SplitText component from React Bits (reactbits.dev)
 * Splits text into individual characters or words and animates them in with staggered delays.
 */
export const SplitText = ({
  text = '',
  className = '',
  delay = 40,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = [0.25, 0.46, 0.45, 0.94],
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const letters = text.split('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <span
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, display: 'inline-flex', flexWrap: 'wrap', justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: animationFrom,
            visible: {
              ...animationTo,
              transition: {
                delay: (index * delay) / 1000,
                duration: 0.6,
                ease: easing,
              },
            },
          }}
          onAnimationComplete={
            index === letters.length - 1 ? onLetterAnimationComplete : undefined
          }
          className="inline-block will-change-transform"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

