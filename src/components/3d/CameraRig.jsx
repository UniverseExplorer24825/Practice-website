import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNexusStore } from '../../store/useNexusStore';

export const CameraRig = () => {
  const scrollProgress = useNexusStore((s) => s.scrollProgress);
  const targetPos = useRef(new THREE.Vector3(0, 0, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera, pointer }) => {
    // Determine milestone target coordinates based on scroll progress (0 to 1)
    const p = scrollProgress;

    if (p < 0.22) {
      // Hero section: Centered, monumental framing
      targetPos.current.set(0, 0, 6.2);
      targetLookAt.current.set(0, 0, 0);
    } else if (p < 0.48) {
      // Dimension section: Shift to left viewport to clear DOM right-hand cards
      const t = (p - 0.22) / 0.26;
      targetPos.current.set(
        THREE.MathUtils.lerp(0, -2.2, t),
        THREE.MathUtils.lerp(0, 0.8, t),
        THREE.MathUtils.lerp(6.2, 4.8, t)
      );
      targetLookAt.current.set(0, 0, 0);
    } else if (p < 0.72) {
      // Journey section: Shift to right viewport to balance left content stream
      const t = (p - 0.48) / 0.24;
      targetPos.current.set(
        THREE.MathUtils.lerp(-2.2, 2.4, t),
        THREE.MathUtils.lerp(0.8, -0.5, t),
        THREE.MathUtils.lerp(4.8, 4.4, t)
      );
      targetLookAt.current.set(0, 0, 0);
    } else if (p < 0.88) {
      // Interactive section: Close-up zoom for tactile manipulation
      const t = (p - 0.72) / 0.16;
      targetPos.current.set(
        THREE.MathUtils.lerp(2.4, 0, t),
        THREE.MathUtils.lerp(-0.5, 0, t),
        THREE.MathUtils.lerp(4.4, 3.8, t)
      );
      targetLookAt.current.set(0, 0, 0);
    } else {
      // Final convergence: Majestic pull-back wide angle
      const t = (p - 0.88) / 0.12;
      targetPos.current.set(
        0,
        THREE.MathUtils.lerp(0, 0.5, t),
        THREE.MathUtils.lerp(3.8, 7.2, t)
      );
      targetLookAt.current.set(0, 0, 0);
    }

    // Apply smooth mouse parallax offset
    const parallaxX = pointer.x * 0.45;
    const parallaxY = pointer.y * 0.45;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetPos.current.x + parallaxX,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetPos.current.y + parallaxY,
      0.05
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetPos.current.z,
      0.05
    );

    camera.lookAt(targetLookAt.current);
  });

  return null;
};

