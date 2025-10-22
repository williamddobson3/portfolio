import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Color, ShaderMaterial, Group, Mesh } from 'three';
import * as THREE from 'three';

// Enhanced Toon Shader with better cartoon effects
const EnhancedToonMaterial = ({ 
  baseColor, 
  lightDirection, 
  toonLevels = 4, 
  ambientIntensity = 0.15,
  rimIntensity = 0.3
}) => {
  const materialRef = useRef<ShaderMaterial>(null);

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uBaseColor;
    uniform vec3 uLightDirection;
    uniform int uToonLevels;
    uniform float uAmbientIntensity;
    uniform float uRimIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    
    float toonLevel(float value, int levels) {
      return floor(value * float(levels)) / float(levels);
    }
    
    vec3 toonLighting(vec3 baseColor, vec3 normal, vec3 lightDir, int levels) {
      float nDotL = max(dot(normal, lightDir), 0.0);
      float t = toonLevel(nDotL, levels);
      
      vec3 diffuse = baseColor * t;
      vec3 ambient = baseColor * uAmbientIntensity;
      
      return diffuse + ambient;
    }
    
    // Rim lighting for cartoon effect
    vec3 rimLighting(vec3 baseColor, vec3 normal, vec3 viewDir) {
      float rim = 1.0 - max(dot(normal, viewDir), 0.0);
      rim = pow(rim, 2.0);
      return baseColor * rim * uRimIntensity;
    }
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uLightDirection);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      
      vec3 color = toonLighting(uBaseColor, normal, lightDir, uToonLevels);
      color += rimLighting(uBaseColor, normal, viewDir);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uBaseColor: { value: new Color(baseColor) },
    uLightDirection: { value: new Vector3(...lightDirection) },
    uToonLevels: { value: toonLevels },
    uAmbientIntensity: { value: ambientIntensity },
    uRimIntensity: { value: rimIntensity }
  }), [baseColor, lightDirection, toonLevels, ambientIntensity, rimIntensity]);

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

// Floating objects with different shapes
const FloatingObject = ({ position, scale, color, rotationSpeed = 0.01, bobSpeed = 0.02 }) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * bobSpeed) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <EnhancedToonMaterial 
          baseColor={color}
          lightDirection={[1, 1, 1]}
          toonLevels={4}
          rimIntensity={0.4}
        />
      </mesh>
    </group>
  );
};

// Particle system for magical effects
const ParticleField = ({ count = 50, performanceLevel = 'high' }) => {
  const particlesRef = useRef<Group>(null);
  
  const particles = useMemo(() => {
    const actualCount = performanceLevel === 'low' ? count / 2 : count;
    return Array.from({ length: actualCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      scale: Math.random() * 0.1 + 0.05,
      speed: Math.random() * 0.02 + 0.01,
      color: [
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
      ]
    }));
  }, [count, performanceLevel]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.y += particles[index].speed;
          child.rotation.x += particles[index].speed * 0.5;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <EnhancedToonMaterial 
            baseColor={particle.color}
            lightDirection={[1, 1, 1]}
            toonLevels={2}
            rimIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main scene component
const CartoonScene = ({ mousePosition, performanceLevel = 'high' }) => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  
  // Smooth parallax effect
  useFrame((state) => {
    if (groupRef.current && mousePosition) {
      const targetX = mousePosition.x * 0.3;
      const targetY = mousePosition.y * 0.2;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        targetX, 
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        targetY, 
        0.05
      );
    }
  });

  // Generate scene objects based on performance
  const objects = useMemo(() => {
    const count = performanceLevel === 'low' ? 3 : performanceLevel === 'medium' ? 6 : 10;
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12
      ] as [number, number, number],
      scale: [
        Math.random() * 0.8 + 0.4,
        Math.random() * 0.8 + 0.4,
        Math.random() * 0.8 + 0.4
      ] as [number, number, number],
      color: [
        Math.random() * 0.4 + 0.6,
        Math.random() * 0.4 + 0.6,
        Math.random() * 0.4 + 0.6
      ] as [number, number, number],
      rotationSpeed: Math.random() * 0.02 + 0.005,
      bobSpeed: Math.random() * 0.03 + 0.01
    }));
  }, [performanceLevel]);

  return (
    <group ref={groupRef}>
      {/* Main floating objects */}
      {objects.map((obj, index) => (
        <FloatingObject
          key={index}
          position={obj.position}
          scale={obj.scale}
          color={obj.color}
          rotationSpeed={obj.rotationSpeed}
          bobSpeed={obj.bobSpeed}
        />
      ))}
      
      {/* Particle field */}
      <ParticleField 
        count={performanceLevel === 'low' ? 20 : performanceLevel === 'medium' ? 40 : 60}
        performanceLevel={performanceLevel}
      />
      
      {/* Background elements */}
      <mesh position={[0, -5, -10]} scale={[20, 1, 20]}>
        <planeGeometry args={[1, 1]} />
        <EnhancedToonMaterial 
          baseColor={[0.8, 0.9, 1.0]}
          lightDirection={[0, 1, 0]}
          toonLevels={2}
          rimIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

export default CartoonScene;
