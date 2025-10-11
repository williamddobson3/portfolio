import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ProcessWorkflow3DProps {
  steps: ProcessStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

// 3D Token for each process step
const ProcessToken = ({ 
  step, 
  index, 
  isActive, 
  isVisible 
}: { 
  step: ProcessStep, 
  index: number, 
  isActive: boolean, 
  isVisible: boolean 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
    
    if (groupRef.current) {
      groupRef.current.position.z = isVisible ? 0 : -2;
    }
  });

  return (
    <group ref={groupRef} position={[index * 2 - 3, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color={step.color} 
          metalness={0.3} 
          roughness={0.4}
          emissive={step.color}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Step number */}
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Connection arrows between steps
const ConnectionArrow = ({ from, to, isActive }: { from: number, to: number, isActive: boolean }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const opacity = isActive ? 0.8 : 0.3;
      lineRef.current.material.opacity = opacity;
    }
  });

  const points = [
    new THREE.Vector3(from * 2 - 3 + 0.4, 0, 0),
    new THREE.Vector3(to * 2 - 3 - 0.4, 0, 0)
  ];

  return (
    <line ref={lineRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([
            points[0].x, points[0].y, points[0].z,
            points[1].x, points[1].y, points[1].z
          ])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#0B76FF" opacity={0.6} transparent />
    </line>
  );
};

const Scene = ({ steps, currentStep }: { steps: ProcessStep[], currentStep: number }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 5]} color="#0B76FF" intensity={0.3} />
      
      {steps.map((step, index) => (
        <ProcessToken
          key={step.id}
          step={step}
          index={index}
          isActive={index <= currentStep}
          isVisible={index <= currentStep + 1}
        />
      ))}
      
      {steps.slice(0, -1).map((_, index) => (
        <ConnectionArrow
          key={`arrow-${index}`}
          from={index}
          to={index + 1}
          isActive={index < currentStep}
        />
      ))}
    </>
  );
};

export const ProcessWorkflow3D: React.FC<ProcessWorkflow3DProps> = ({
  steps,
  currentStep,
  onStepChange
}) => {
  useEffect(() => {
    // Trigger animation on step change
  }, [currentStep]);

  return (
    <div className="w-full h-64 relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene steps={steps} currentStep={currentStep} />
        </Canvas>
      </div>

      {/* Step Labels */}
      <div className="relative z-10 flex justify-between mt-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`text-center cursor-pointer transition-all duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => onStepChange(index)}
          >
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 ${
              index <= currentStep 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/30' 
                : 'bg-gray-600'
            }`}>
              {index + 1}
            </div>
            <h4 className="text-sm font-medium text-white">{step.title}</h4>
            <p className="text-xs text-white/70 mt-1">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

