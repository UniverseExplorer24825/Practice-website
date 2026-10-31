import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * DecryptedText component from React Bits (reactbits.dev)
 * Progressively decrypts scrambled glyphs into the target string.
 */
export const DecryptedText = ({
  text = '',
  speed = 40,
  maxIterations = 15,
  characters = '0123456789!@#$%^&*()_+-=~[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-neon-cyan/80 font-mono',
  animateOn = 'view', // 'view' | 'hover'
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startDecryption = () => {
      const charPool = useOriginalCharsOnly ? text : characters;
      const textLen = text.length;

      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';

              if (sequential) {
                const threshold = (iteration / maxIterations) * textLen;
                if (index < threshold) {
                  return text[index];
                }
              } else {
                if (iteration >= maxIterations) {
                  return text[index];
                }
              }

              const randomIndex = Math.floor(Math.random() * charPool.length);
              return charPool[randomIndex];
            })
            .join('');
        });

        iteration++;

        if (iteration > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsDecrypted(true);
          setHasAnimated(true);
        }
      }, speed);
    };

    if (animateOn === 'view' && isInView && !hasAnimated) {
      startDecryption();
    }

    return () => clearInterval(interval);
  }, [isInView, text, speed, maxIterations, characters, sequential, useOriginalCharsOnly, animateOn, hasAnimated]);

  return (
    <span ref={containerRef} className={`inline-block ${parentClassName}`} {...props}>
      <span className={`${className} ${!isDecrypted ? encryptedClassName : ''}`}>
        {displayText}
      </span>
    </span>
  );
};

