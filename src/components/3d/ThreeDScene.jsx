import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneLights } from './SceneLights';
import { LiquidCore } from './LiquidCore';
import { ChromeArtifacts } from './ChromeArtifacts';
import { CameraRig } from './CameraRig';

export const ThreeDScene = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-void">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>
          {/* Subtle cosmic background dust */}
          <Stars
            radius={50}
            depth={40}
            count={1200}
            factor={3}
            saturation={0}
            fade
            speed={0.8}
          />

          {/* Dynamic Cybernetic Lighting Setup */}
          <SceneLights />

          {/* Camera Controller synchronized with scroll & mouse */}
          <CameraRig />

          {/* Floating Chrome & Glass Orbiting Artifacts */}
          <ChromeArtifacts />

          {/* Floating Organic Liquid-Metal Core */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <LiquidCore />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

