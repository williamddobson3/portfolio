import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CaseStudy3DProps {
  title: string;
  description: string;
  kpi: string;
  duration: string;
  role: string;
  image: string;
  isActive: boolean;
  onSelect: () => void;
}

// 3D rotating plate for case studies
const RotatingPlate = ({ isActive }: { isActive: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3, 2]} />
      <meshStandardMaterial 
        color="#1a1a2e"
        metalness={0.2} 
        roughness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const FloatingElements = ({ isActive }: { isActive: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* KPI Badge */}
      <mesh position={[1.5, 0.8, 0.2]}>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#9AE66E" 
          metalness={0.3} 
          roughness={0.4}
          emissive="#9AE66E"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Duration Badge */}
      <mesh position={[-1.5, 0.8, 0.2]}>
        <boxGeometry args={[0.8, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#0B76FF" 
          metalness={0.3} 
          roughness={0.4}
          emissive="#0B76FF"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Role Badge */}
      <mesh position={[0, -1, 0.2]}>
        <boxGeometry args={[1.2, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#FF7B6B" 
          metalness={0.3} 
          roughness={0.4}
          emissive="#FF7B6B"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

const Scene = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} color="#0B76FF" intensity={0.4} />
      
      <RotatingPlate isActive={isActive} />
      <FloatingElements isActive={isActive} />
    </>
  );
};

export const CaseStudy3D: React.FC<CaseStudy3DProps> = ({
  title,
  description,
  kpi,
  duration,
  role,
  image,
  isActive,
  onSelect
}) => {
  useEffect(() => {
    // Trigger animation on active change
  }, [isActive]);

  return (
    <div
      style={{
        transform: isActive ? 'translateY(0) scale(1.05)' : 'translateY(20px) scale(1)',
        opacity: isActive ? 1 : 0.6,
        transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)'
      }}
      onClick={onSelect}
      className="relative cursor-pointer"
    >
      {/* 3D Canvas */}
      <div className="w-full h-64 rounded-xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene isActive={isActive} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
            {kpi}
          </span>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
            {duration}
          </span>
          <span className="px-3 py-1 bg-coral-500/20 text-coral-300 text-xs rounded-full">
            {role}
          </span>
        </div>
      </div>

      {/* Display the actual image as background */}
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
      </div>
    </div>
  );
};

