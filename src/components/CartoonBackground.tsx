import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { Vector3, Color, ShaderMaterial, Mesh, Group } from 'three';
import * as THREE from 'three';

// Toon Material Component
const ToonMaterial = ({ baseColor, lightDirection, toonLevels = 3, ambientIntensity = 0.12 }) => {
  const materialRef = useRef<ShaderMaterial>(null);

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uBaseColor;
    uniform vec3 uLightDirection;
    uniform int uToonLevels;
    uniform float uAmbientIntensity;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    
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
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 lightDir = normalize(uLightDirection);
      
      vec3 color = toonLighting(uBaseColor, normal, lightDir, uToonLevels);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uBaseColor: { value: new Color(baseColor) },
    uLightDirection: { value: new Vector3(...lightDirection) },
    uToonLevels: { value: toonLevels },
    uAmbientIntensity: { value: ambientIntensity }
  }), [baseColor, lightDirection, toonLevels, ambientIntensity]);

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};

// Outline Material Component
const OutlineMaterial = ({ outlineColor = [0, 0, 0], outlineWidth = 0.01 }) => {
  const materialRef = useRef<ShaderMaterial>(null);

  const vertexShader = `
    uniform float uOutlineWidth;
    varying vec3 vNormal;
    
    void main() {
      vec3 pos = position + normal * uOutlineWidth;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uOutlineColor;
    
    void main() {
      gl_FragColor = vec4(uOutlineColor, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uOutlineWidth: { value: outlineWidth },
    uOutlineColor: { value: new Color(...outlineColor) }
  }), [outlineColor, outlineWidth]);

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      side={THREE.BackSide}
    />
  );
};

// 3D Scene Component
const Scene3D = ({ mousePosition, onInteraction }) => {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  
  // Parallax effect
  useFrame((state) => {
    if (groupRef.current && mousePosition) {
      const targetX = mousePosition.x * 0.5;
      const targetY = mousePosition.y * 0.3;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
    }
  });

  // Create simple geometric shapes for the cartoon scene
  const shapes = useMemo(() => [
    { position: [0, 0, 0], scale: [1, 1, 1], color: [0.9, 0.8, 0.7] },
    { position: [2, 1, -1], scale: [0.8, 0.8, 0.8], color: [0.8, 0.9, 0.7] },
    { position: [-2, -1, 1], scale: [0.6, 0.6, 0.6], color: [0.7, 0.8, 0.9] },
    { position: [1, -2, 0], scale: [0.5, 0.5, 0.5], color: [0.9, 0.7, 0.8] },
    { position: [-1, 2, -2], scale: [0.7, 0.7, 0.7], color: [0.8, 0.7, 0.9] }
  ], []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <group key={index} position={shape.position}>
          {/* Main geometry */}
          <mesh>
            <boxGeometry args={shape.scale} />
            <ToonMaterial 
              baseColor={shape.color}
              lightDirection={[1, 1, 1]}
              toonLevels={3}
            />
          </mesh>
          
          {/* Outline geometry */}
          <mesh>
            <boxGeometry args={shape.scale} />
            <OutlineMaterial 
              outlineColor={[0, 0, 0]}
              outlineWidth={0.02}
            />
          </mesh>
        </group>
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <ToonMaterial 
            baseColor={[0.9, 0.9, 0.9]}
            lightDirection={[1, 1, 1]}
            toonLevels={2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Cartoon Background Component
const CartoonBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  const handleClick = () => {
    // Camera animation on click
    console.log('Camera animation triggered');
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading 3D Scene...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <pointLight position={[-1, -1, 1]} intensity={0.5} color="#ff6b6b" />
        
        <Scene3D mousePosition={mousePosition} onInteraction={handleClick} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        <EffectComposer>
          <Outline
            visibleEdgeColor={0x000000}
            hiddenEdgeColor={0x000000}
            edgeStrength={2}
            edgeThickness={1}
            edgeGlow={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default CartoonBackground;
