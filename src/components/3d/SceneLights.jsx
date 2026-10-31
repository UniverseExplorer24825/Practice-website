import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexusStore } from '../../store/useNexusStore';

export const SceneLights = () => {
  const cyanLightRef = useRef();
  const violetLightRef = useRef();
  const rimLightRef = useRef();
  const coreColor = useNexusStore((s) => s.coreColor);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    // Responsive position tracking for primary cyan key light
    if (cyanLightRef.current) {
      cyanLightRef.current.position.x = THREE.MathUtils.lerp(
        cyanLightRef.current.position.x,
        pointer.x * 5 + Math.sin(t * 0.8) * 3,
        0.05
      );
      cyanLightRef.current.position.y = THREE.MathUtils.lerp(
        cyanLightRef.current.position.y,
        pointer.y * 5 + Math.cos(t * 0.7) * 2.5,
        0.05
      );
      cyanLightRef.current.position.z = 4.5 + Math.sin(t * 0.5) * 1.5;
    }

    // Opposing deep violet rim light
    if (violetLightRef.current) {
      violetLightRef.current.position.x = -Math.cos(t * 0.6) * 6;
      violetLightRef.current.position.y = -Math.sin(t * 0.5) * 4;
      violetLightRef.current.position.z = -3 + Math.cos(t * 0.4) * 2;
    }

    // Specular highlight light
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(t * 0.4) * 4;
      rimLightRef.current.position.y = 6;
      rimLightRef.current.position.z = 3;
    }
  });

  return (
    <>
      {/* Cinematic dark ambient fill */}
      <ambientLight intensity={0.35} color="#060810" />

      {/* Primary Key Light: Electric Cyan / Dynamic Core Color */}
      <pointLight
        ref={cyanLightRef}
        color={coreColor || '#00f0ff'}
        intensity={22}
        distance={25}
        decay={2}
      />

      {/* Opposing Rim Light: Deep Violet */}
      <spotLight
        ref={violetLightRef}
        color="#7928ca"
        intensity={30}
        distance={35}
        angle={0.65}
        penumbra={1}
      />

      {/* Specular White Highlight */}
      <directionalLight
        ref={rimLightRef}
        position={[3, 8, 4]}
        intensity={2.0}
        color="#ffffff"
      />

      {/* Underglow Accent */}
      <pointLight
        position={[0, -5, 2]}
        color="#b800ff"
        intensity={10}
        distance={20}
      />
    </>
  );
};
