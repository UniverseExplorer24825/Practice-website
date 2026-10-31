import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNexusStore } from '../../store/useNexusStore';

export const SceneLights = () => {
  const blueLightRef = useRef();
  const violetLightRef = useRef();
  const coreColor = useNexusStore((s) => s.coreColor);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(t * 0.7) * 4 + pointer.x * 2;
      blueLightRef.current.position.y = Math.cos(t * 0.5) * 3 + pointer.y * 2;
      blueLightRef.current.position.z = 3 + Math.sin(t * 0.3) * 1.5;
    }

    if (violetLightRef.current) {
      violetLightRef.current.position.x = -Math.cos(t * 0.6) * 5;
      violetLightRef.current.position.y = -Math.sin(t * 0.8) * 4;
      violetLightRef.current.position.z = -2 + Math.cos(t * 0.4) * 2;
    }
  });

  return (
    <>
      {/* Subtle Cool White Ambient Fill */}
      <ambientLight intensity={0.4} color="#0d1117" />

      {/* Primary Key Light: Electric Blue / Interactive Color */}
      <pointLight
        ref={blueLightRef}
        color={coreColor || '#00f0ff'}
        intensity={18}
        distance={25}
        decay={2}
      />

      {/* Secondary Rim Light: Deep Violet / Magenta */}
      <spotLight
        ref={violetLightRef}
        color="#7928ca"
        intensity={25}
        distance={30}
        angle={0.6}
        penumbra={1}
      />

      {/* Pure White Specular Accent Light */}
      <directionalLight
        position={[0, 8, 5]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Under-glow for dramatic cinematic edge */}
      <pointLight
        position={[0, -6, 2]}
        color="#b800ff"
        intensity={8}
        distance={20}
      />
    </>
  );
};

