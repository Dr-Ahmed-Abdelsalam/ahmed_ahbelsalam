import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.5, 3);
    const positions = geometry.getAttribute('position');
    const result = new Float32Array(positions.count * 3);
    for (let i = 0; i < positions.count; i += 1) {
      result[i * 3] = positions.getX(i);
      result[i * 3 + 1] = positions.getY(i);
      result[i * 3 + 2] = positions.getZ(i);
    }
    geometry.dispose();
    return result;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.14,
      0.03,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.08,
      0.03,
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.42, 2]} />
        <MeshDistortMaterial
          color="#0c2638"
          roughness={0.28}
          metalness={0.86}
          distort={0.18}
          speed={1.25}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d5ae72" size={0.022} sizeAttenuation transparent opacity={0.85} />
      </points>

      <mesh rotation={[1.08, 0.18, 0.4]}>
        <torusGeometry args={[2.02, 0.013, 16, 180]} />
        <meshStandardMaterial color="#d5ae72" emissive="#7b5a2d" emissiveIntensity={0.7} />
      </mesh>
      <mesh rotation={[0.3, 1.05, -0.2]}>
        <torusGeometry args={[1.82, 0.009, 16, 180]} />
        <meshStandardMaterial color="#7d91a1" emissive="#263a48" emissiveIntensity={0.4} />
      </mesh>

      <Float speed={1.3} rotationIntensity={0.55} floatIntensity={0.7}>
        <mesh position={[-2.35, 1.35, 0.15]} rotation={[0.3, 0.4, -0.15]}>
          <boxGeometry args={[0.38, 0.38, 0.38]} />
          <meshStandardMaterial color="#c8a46c" metalness={0.9} roughness={0.22} />
        </mesh>
      </Float>
      <Float speed={1.05} rotationIntensity={0.8} floatIntensity={0.55}>
        <mesh position={[2.28, -1.08, 0.25]} rotation={[0.2, -0.25, 0.55]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#d9dfe1" metalness={0.78} roughness={0.22} />
        </mesh>
      </Float>
    </group>
  );
}

export default function LegalScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.3], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 5]} intensity={3.1} color="#f5d7a4" />
      <pointLight position={[-4, -2, 3]} intensity={35} color="#2e6c8d" distance={10} />
      <pointLight position={[2, 3, -2]} intensity={24} color="#c48b49" distance={9} />
      <Stars radius={60} depth={28} count={700} factor={2.2} saturation={0} fade speed={0.3} />
      <Core />
    </Canvas>
  );
}