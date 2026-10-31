import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexusStore } from '../../store/useNexusStore';

export const LiquidCore = () => {
  const meshRef = useRef();
  const wireframe = useNexusStore((s) => s.wireframe);
  const distortion = useNexusStore((s) => s.distortion);
  const viscosity = useNexusStore((s) => s.viscosity);
  const coreColor = useNexusStore((s) => s.coreColor);
  const scrollProgress = useNexusStore((s) => s.scrollProgress);

  // High density icosahedron for fluid organic wave ripples
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.8, 32);
  }, []);

  // Cache base positions so displacements are always calculated from initial state
  const originalPositions = useMemo(() => {
    return geometry.attributes.position.array.slice();
  }, [geometry]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime() * (0.8 * viscosity);
    const pos = meshRef.current.geometry.attributes.position;
    const array = pos.array;
    const orig = originalPositions;

    const distFactor = 0.25 * distortion;

    for (let i = 0; i < array.length; i += 3) {
      const u = orig[i];
      const v = orig[i + 1];
      const w = orig[i + 2];

      // Multi-frequency wave calculation (pseudo-simplex noise)
      const wave1 = Math.sin(u * 1.8 + t) * Math.cos(v * 1.8 + t);
      const wave2 = Math.sin(w * 2.2 + t * 1.2) * 0.5;
      const wave3 = Math.cos((u + v + w) * 1.4 + t * 0.7) * 0.3;

      const displacement = 1 + (wave1 + wave2 + wave3) * distFactor;

      array[i] = u * displacement;
      array[i + 1] = v * displacement;
      array[i + 2] = w * displacement;
    }

    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();

    // Subtle continuous rotation + mouse parallax tilt + scroll spin
    meshRef.current.rotation.y += 0.004;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.4 + scrollProgress * Math.PI,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      pointer.x * 0.4,
      0.05
    );
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Liquid Metal Mesh */}
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#050608"
          emissive={coreColor}
          emissiveIntensity={0.15}
          metalness={0.94}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={1.0}
          ior={1.8}
          wireframe={wireframe}
          flatShading={wireframe}
        />
      </mesh>

      {/* Internal Glowing Core Energy Sphere */}
      <mesh scale={0.9}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>
    </group>
  );
};

