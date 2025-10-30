import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ServiceCard3DProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  kpi: string;
  duration: string;
  onDetailClick: () => void;
  onQuoteClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

// 3D Card layers
const CardBackground = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = isHovered ? -0.1 : -0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.2]}>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial 
        color="#0B1020" 
        metalness={0.1} 
        roughness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const CardContent = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = isHovered ? 0.1 : 0;
      meshRef.current.rotation.x = isHovered ? 0.05 : 0;
      meshRef.current.rotation.y = isHovered ? 0.02 : 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3.8, 2.8]} />
      <meshStandardMaterial 
        color="#1a1a2e" 
        metalness={0.2} 
        roughness={0.6}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

const CardIcon = ({ isHovered, color }: { isHovered: boolean, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = isHovered ? 0.2 : 0.1;
      meshRef.current.rotation.z = isHovered ? 0.1 : 0;
    }
  });

  return (
    <mesh ref={meshRef} position={[-1.2, 0.8, 0.1]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.3} 
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const Scene = ({ isHovered, iconColor }: { isHovered: boolean, iconColor: string }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, 5]} color="#0B76FF" intensity={0.3} />
      
      <CardBackground isHovered={isHovered} />
      <CardContent isHovered={isHovered} />
      <CardIcon isHovered={isHovered} color={iconColor} />
    </>
  );
};

export const ServiceCard3D: React.FC<ServiceCard3DProps> = ({
  title,
  subtitle,
  icon: Icon,
  kpi,
  duration,
  onDetailClick,
  onQuoteClick,
  isHovered,
  onHover
}) => {

  const iconColors = {
    web: '#0B76FF',
    android: '#FF7B6B', 
    ai: '#9AE66E'
  };

  const getIconColor = (title: string) => {
    if (title.includes('Web')) return iconColors.web;
    if (title.includes('Android')) return iconColors.android;
    if (title.includes('AI')) return iconColors.ai;
    return iconColors.web;
  };

  return (
    <div
      style={{
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)'
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="relative bg-white/6 rounded-2xl p-6 shadow-soft hover:shadow-deep"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene isHovered={isHovered} iconColor={getIconColor(title)} />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-start space-x-4">
        <div className="p-3 bg-white/8 rounded-lg">
          <Icon size={28} className="text-gray-800" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-800/70 mt-1">{subtitle}</p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-800/70">
            <span>{kpi}</span>
            <span>{duration}</span>
          </div>
          <div className="mt-4 flex space-x-3">
            <button 
              onClick={onDetailClick}
              className="text-sm px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 transition-colors"
            >
              詳細を見る
            </button>
            <button 
              onClick={onQuoteClick}
              className="text-sm px-3 py-2 rounded-md bg-blue-600 text-gray-800 hover:bg-blue-700 transition-colors"
            >
              お見積りを依頼する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

