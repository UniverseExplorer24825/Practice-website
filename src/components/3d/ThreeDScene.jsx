import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLights } from './SceneLights';
import { HeroLiquidSphere } from './HeroLiquidSphere';

export const ThreeDScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-void">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45, near: 0.1, far: 100 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <Suspense fallback={null}>
          {/* Subtle cosmic background dust */}
          <Stars
            radius={45}
            depth={35}
            count={isMobile ? 500 : 1200}
            factor={3}
            saturation={0}
            fade
            speed={0.6}
          />

          {/* Dramatic Bi-Polar Lighting */}
          <SceneLights />

          {/* Interactive Chrome Liquid-Metal Core */}
          <HeroLiquidSphere isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};
