import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type ScenePreferences = {
  isMobile: boolean;
  reducedMotion: boolean;
};

function useScenePreferences(): ScenePreferences {
  const [preferences, setPreferences] = useState<ScenePreferences>({
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 700px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    update();
    mobileQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      mobileQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return preferences;
}

function Core({ isMobile, reducedMotion }: ScenePreferences) {
  const group = useRef<THREE.Group>(null);
  const detail = isMobile ? 1 : 2;
  const pointDetail = isMobile ? 2 : 3;

  const points = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.5, pointDetail);
    const positions = geometry.getAttribute('position');
    const result = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i += 1) {
      result[i * 3] = positions.getX(i);
      result[i * 3 + 1] = positions.getY(i);
      result[i * 3 + 2] = positions.getZ(i);
    }

    geometry.dispose();
    return result;
  }, [pointDetail]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;

    group.current.rotation.y += delta * (isMobile ? 0.055 : 0.11);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * (isMobile ? 0.05 : 0.14),
      0.03,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * (isMobile ? 0.03 : 0.08),
      0.03,
    );
  });

  const floatSpeed = reducedMotion ? 0 : isMobile ? 0.6 : 1.3;
  const floatIntensity = reducedMotion ? 0 : isMobile ? 0.25 : 0.7;
  const rotationIntensity = reducedMotion ? 0 : isMobile ? 0.2 : 0.55;

  return (
    <group ref={group} scale={isMobile ? 0.88 : 1}>
      <mesh>
        <icosahedronGeometry args={[1.42, detail]} />
        <MeshDistortMaterial
          color="#0c2638"
          roughness={0.28}
          metalness={0.86}
          distort={reducedMotion ? 0 : isMobile ? 0.08 : 0.18}
          speed={reducedMotion ? 0 : isMobile ? 0.45 : 1.25}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#d5ae72"
          size={isMobile ? 0.027 : 0.022}
          sizeAttenuation
          transparent
          opacity={0.82}
        />
      </points>

      <mesh rotation={[1.08, 0.18, 0.4]}>
        <torusGeometry args={[2.02, isMobile ? 0.017 : 0.013, 12, isMobile ? 96 : 180]} />
        <meshStandardMaterial color="#d5ae72" emissive="#7b5a2d" emissiveIntensity={0.7} />
      </mesh>

      <mesh rotation={[0.3, 1.05, -0.2]}>
        <torusGeometry args={[1.82, isMobile ? 0.013 : 0.009, 12, isMobile ? 96 : 180]} />
        <meshStandardMaterial color="#7d91a1" emissive="#263a48" emissiveIntensity={0.4} />
      </mesh>

      <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
        <mesh position={[-2.35, 1.35, 0.15]} rotation={[0.3, 0.4, -0.15]}>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial color="#c8a46c" metalness={0.9} roughness={0.22} />
        </mesh>
      </Float>

      <Float
        speed={reducedMotion ? 0 : isMobile ? 0.5 : 1.05}
        rotationIntensity={reducedMotion ? 0 : isMobile ? 0.25 : 0.8}
        floatIntensity={reducedMotion ? 0 : isMobile ? 0.2 : 0.55}
      >
        <mesh position={[2.28, -1.08, 0.25]} rotation={[0.2, -0.25, 0.55]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#d9dfe1" metalness={0.78} roughness={0.22} />
        </mesh>
      </Float>
    </group>
  );
}

export default function LegalScene() {
  const { isMobile, reducedMotion } = useScenePreferences();

  return (
    <Canvas
      dpr={isMobile ? [1, 1.15] : [1, 1.5]}
      camera={{ position: [0, 0, isMobile ? 6.8 : 6.3], fov: isMobile ? 50 : 46 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.6 }}
    >
      <ambientLight intensity={isMobile ? 0.58 : 0.45} />
      <directionalLight position={[4, 4, 5]} intensity={isMobile ? 2.3 : 3.1} color="#f5d7a4" />
      <pointLight position={[-4, -2, 3]} intensity={isMobile ? 18 : 35} color="#2e6c8d" distance={10} />
      {!isMobile && (
        <pointLight position={[2, 3, -2]} intensity={24} color="#c48b49" distance={9} />
      )}
      {!reducedMotion && (
        <Stars
          radius={60}
          depth={28}
          count={isMobile ? 220 : 700}
          factor={isMobile ? 1.6 : 2.2}
          saturation={0}
          fade
          speed={isMobile ? 0.12 : 0.3}
        />
      )}
      <Core isMobile={isMobile} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
