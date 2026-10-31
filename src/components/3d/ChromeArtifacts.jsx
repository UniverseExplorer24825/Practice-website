import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexusStore } from '../../store/useNexusStore';

export const ChromeArtifacts = () => {
  const groupRef = useRef();
  const ringRef = useRef();
  const octaRef1 = useRef();
  const octaRef2 = useRef();
  const torusRef = useRef();
  const scrollProgress = useNexusStore((s) => s.scrollProgress);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Parallax responsiveness
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        -pointer.x * 0.8,
        0.04
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        -pointer.y * 0.8,
        0.04
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2 + scrollProgress * 2;
      ringRef.current.rotation.y = t * 0.25;
    }

    if (octaRef1.current) {
      octaRef1.current.position.y = 2.2 + Math.sin(t * 1.2) * 0.3;
      octaRef1.current.rotation.y = t * 0.8;
      octaRef1.current.rotation.z = t * 0.5;
    }

    if (octaRef2.current) {
      octaRef2.current.position.y = -2.4 + Math.cos(t * 1.1) * 0.3;
      octaRef2.current.rotation.x = t * 0.6;
      octaRef2.current.rotation.y = -t * 0.7;
    }

    if (torusRef.current) {
      torusRef.current.rotation.z = t * 0.15;
      torusRef.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Gyroscope Chrome Ring */}
      <mesh ref={ringRef} scale={1.2}>
        <torusGeometry args={[3.8, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#d1d5db"
          metalness={1.0}
          roughness={0.05}
          emissive="#00f0ff"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Orbiting Chrome Octahedron Upper-Right */}
      <mesh ref={octaRef1} position={[3.2, 2.2, -1]} scale={0.65}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          metalness={0.98}
          roughness={0.08}
          clearcoat={1.0}
          reflectivity={1.0}
        />
      </mesh>

      {/* Orbiting Glass Octahedron Lower-Left */}
      <mesh ref={octaRef2} position={[-3.4, -2.4, 0.5]} scale={0.75}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          metalness={0.2}
          roughness={0.05}
          transmission={0.9}
          thickness={1.2}
          ior={1.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Background Orbit Ring */}
      <mesh ref={torusRef} position={[0, 0, -3]} scale={2.2}>
        <torusGeometry args={[4.2, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#7928ca"
          metalness={0.8}
          roughness={0.2}
          emissive="#7928ca"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

