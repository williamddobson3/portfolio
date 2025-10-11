import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Objects for the hero scene
const Laptop = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[2, 0.2, 1.4]} />
      <meshStandardMaterial 
        color="#0B76FF" 
        metalness={0.3} 
        roughness={0.4}
        emissive="#0B76FF"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const Smartphone = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[0.4, 0.8, 0.1]} />
      <meshStandardMaterial 
        color="#FF7B6B" 
        metalness={0.2} 
        roughness={0.3}
        emissive="#FF7B6B"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

const AINetwork = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.5;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.5,
        Math.sin(angle) * radius
      ]);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef} position={position}>
      {nodes.map((nodePos, index) => (
        <mesh key={index} position={nodePos}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial 
            color="#9AE66E" 
            metalness={0.1} 
            roughness={0.2}
            emissive="#9AE66E"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      {/* Connection lines */}
      {nodes.map((nodePos, index) => {
        const nextIndex = (index + 1) % nodes.length;
        const nextPos = nodes[nextIndex];
        return (
          <line key={`line-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  nodePos[0], nodePos[1], nodePos[2],
                  nextPos[0], nextPos[1], nextPos[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#9AE66E" opacity={0.6} transparent />
          </line>
        );
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} color="#0B76FF" intensity={0.5} />
      
      <Laptop position={[-1, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
      <Smartphone position={[1, 0, 0]} rotation={[0, -Math.PI / 6, 0]} />
      <AINetwork position={[0, 1, 0]} />
      
      <Environment preset="city" />
    </>
  );
};

interface HeroSceneProps {
  className?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

