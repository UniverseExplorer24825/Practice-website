import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useNexusStore } from '../../store/useNexusStore';

export const HeroLiquidSphere = ({ isMobile = false }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const ringRef = useRef();
  const satelliteRef = useRef();
  
  // Smooth initial scale-in on mount
  const [entranceScale, setEntranceScale] = useState(0);

  const scrollProgress = useNexusStore((s) => s.scrollProgress);
  const baseDistortion = useNexusStore((s) => s.distortion);
  const viscosity = useNexusStore((s) => s.viscosity);
  const baseColor = useNexusStore((s) => s.coreColor);
  const wireframe = useNexusStore((s) => s.wireframe);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 0.04;
      if (current >= 1) {
        setEntranceScale(1);
        clearInterval(interval);
      } else {
        const ease = 1 - Math.pow(1 - current, 3);
        setEntranceScale(ease);
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Geometry: high detail for desktop, lightweight for mobile
  const detail = isMobile ? 18 : 34;
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2.0, detail);
  }, [detail]);

  const originalPositions = useMemo(() => {
    return geometry.attributes.position.array.slice();
  }, [geometry]);

  // Smoothed vectors for position & rotation interpolation
  const smoothMouse = useRef({ x: 0, y: 0 });
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentScale = useRef(1);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current || !groupRef.current) return;

    const t = clock.getElapsedTime();
    const p = scrollProgress; // 0 to 1

    // 1. Mouse smoothing
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, pointer.x, 0.05);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, pointer.y, 0.05);

    // 2. Cinematic 3D Transitions based on Scroll Position (Hero -> Dimension -> Journey -> Interactive)
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = 1.0;
    let dynamicDistortion = baseDistortion;

    if (p < 0.20) {
      // SECTION 0: HERO (Centered, monumental framing)
      targetX = 0;
      targetY = 0;
      targetZ = 0;
      targetScale = 1.0;
      dynamicDistortion = baseDistortion;
    } else if (p < 0.48) {
      // SECTION 1: DIMENSION (Pinned full screen, shift right to clear left typography)
      const dimT = (p - 0.20) / 0.28;
      targetX = isMobile ? 0 : THREE.MathUtils.lerp(0, 2.0, dimT);
      targetY = isMobile ? THREE.MathUtils.lerp(0, -0.7, dimT) : THREE.MathUtils.lerp(0, 0.2, dimT);
      targetZ = THREE.MathUtils.lerp(0, 0.4, dimT);
      targetScale = THREE.MathUtils.lerp(1.0, 1.25, Math.sin(dimT * Math.PI));
      dynamicDistortion = baseDistortion + dimT * 0.7;
    } else if (p < 0.75) {
      // SECTION 2: JOURNEY (Horizontal storytelling, shift left to frame incoming right cards)
      const jourT = (p - 0.48) / 0.27;
      targetX = isMobile ? 0 : THREE.MathUtils.lerp(2.0, -2.2, jourT);
      targetY = isMobile ? -0.8 : THREE.MathUtils.lerp(0.2, -0.3, jourT);
      targetZ = THREE.MathUtils.lerp(0.4, -0.2, jourT);
      targetScale = THREE.MathUtils.lerp(1.2, 0.95, jourT);
      dynamicDistortion = baseDistortion + (1 - jourT) * 0.4;
    } else {
      // SECTION 3: INTERACTIVE PLAYGROUND (Center close-up for direct visual tactile feedback)
      const interT = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(-2.2, 0, interT);
      targetY = THREE.MathUtils.lerp(-0.3, 0.2, interT);
      targetZ = THREE.MathUtils.lerp(-0.2, 0.6, interT);
      targetScale = THREE.MathUtils.lerp(0.95, 1.15, interT);
      dynamicDistortion = baseDistortion;
    }

    // Apply smooth lerping to object position
    currentPos.current.x = THREE.MathUtils.lerp(
      currentPos.current.x,
      targetX + smoothMouse.current.x * 0.5,
      0.05
    );
    currentPos.current.y = THREE.MathUtils.lerp(
      currentPos.current.y,
      targetY + smoothMouse.current.y * 0.35,
      0.05
    );
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.05);

    groupRef.current.position.copy(currentPos.current);

    // Apply scale transition with entrance animation
    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale * entranceScale,
      0.05
    );
    groupRef.current.scale.setScalar(currentScale.current);

    // Continuous spin + scroll scrub rotation
    meshRef.current.rotation.y = t * 0.15 + p * Math.PI * 2.5 + smoothMouse.current.x * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + p * Math.PI * 0.8 - smoothMouse.current.y * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1 + p * 0.5;

    // 3. Procedural Liquid Metal Wave Displacement
    if (!isMobile) {
      const pos = meshRef.current.geometry.attributes.position;
      const arr = pos.array;
      const orig = originalPositions;
      const speed = t * 1.2 * viscosity + p * 4;
      const intensity = 0.22 * dynamicDistortion;

      for (let i = 0; i < arr.length; i += 3) {
        const u = orig[i];
        const v = orig[i + 1];
        const w = orig[i + 2];

        const waveA = Math.sin(u * 1.6 + speed) * Math.cos(v * 1.6 + speed * 0.8);
        const waveB = Math.sin(w * 2.0 + speed * 1.1) * 0.5;
        const waveC = Math.cos((u + v + w) * 1.2 + speed * 0.6) * 0.3;

        const displacement = 1 + (waveA + waveB + waveC) * intensity;

        arr[i] = u * displacement;
        arr[i + 1] = v * displacement;
        arr[i + 2] = w * displacement;
      }

      pos.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }

    // 4. Orbiting Gyroscope Ring with Dynamic Spin
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.35 + p * 3 + smoothMouse.current.y * 0.4;
      ringRef.current.rotation.y = t * 0.45 + p * 4 + smoothMouse.current.x * 0.4;
      ringRef.current.rotation.z = Math.sin(t * 0.25) * 0.3;
    }

    // 5. Satellite Mini Sphere
    if (satelliteRef.current) {
      satelliteRef.current.position.x = Math.sin(t * 0.7 + p * 3) * 3.5;
      satelliteRef.current.position.y = Math.cos(t * 0.8) * 1.8;
      satelliteRef.current.position.z = Math.sin(t * 0.5 + p * 2) * 2.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Procedural Studio Reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} position={[0, 6, -10]} scale={4} />
          <Lightformer form="ring" intensity={3} color="#00f0ff" position={[-6, 3, -2]} scale={8} />
          <Lightformer form="rect" intensity={3} color="#7928ca" position={[8, 0, 2]} scale={10} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={2} color="#00f0ff" position={[-8, -2, 0]} scale={10} rotation-y={-Math.PI / 2} />
        </group>
      </Environment>

      {/* Primary Liquid-Chrome Sphere */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial
            color="#08090d"
            metalness={0.96}
            roughness={0.06}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            reflectivity={1.0}
            ior={1.8}
            emissive={baseColor || '#00f0ff'}
            emissiveIntensity={0.16}
            wireframe={wireframe}
            flatShading={wireframe}
          />
        </mesh>
      </Float>

      {/* Orbiting Gyroscope Chrome Ring */}
      <mesh ref={ringRef} scale={1.15}>
        <torusGeometry args={[3.3, 0.035, 16, 80]} />
        <meshPhysicalMaterial
          color="#e2e8f0"
          metalness={1.0}
          roughness={0.04}
          clearcoat={1.0}
          emissive="#00f0ff"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Satellite Liquid Glass Droplet */}
      <mesh ref={satelliteRef} scale={0.28}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          metalness={0.3}
          roughness={0.05}
          transmission={0.95}
          thickness={1.5}
          ior={1.6}
          emissive="#7928ca"
          emissiveIntensity={0.25}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};
