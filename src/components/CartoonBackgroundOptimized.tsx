import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { Vector3, Color, ShaderMaterial, Mesh, Group } from 'three';
import * as THREE from 'three';
import CartoonScene from './CartoonScene';
import CartoonBackgroundFallback from './CartoonBackgroundFallback';

// Performance detection
const getPerformanceLevel = () => {
  if (typeof window === 'undefined') return 'high';
  
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    if (renderer.includes('Intel') || renderer.includes('Mali')) return 'medium';
  }
  
  // Check device memory if available
  if ('deviceMemory' in navigator && navigator.deviceMemory < 2) return 'low';
  
  return 'high';
};

// Optimized Toon Material
const OptimizedToonMaterial = ({ 
  baseColor, 
  lightDirection, 
  toonLevels = 3, 
  ambientIntensity = 0.12,
  performanceLevel = 'high'
}) => {
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
    uToonLevels: { value: performanceLevel === 'low' ? 2 : toonLevels },
    uAmbientIntensity: { value: ambientIntensity }
  }), [baseColor, lightDirection, toonLevels, ambientIntensity, performanceLevel]);

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
    />
  );
};


// Main optimized component
const CartoonBackgroundOptimized = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState('high');
  const [renderScale, setRenderScale] = useState(1);

  const handleMouseMove = useCallback((event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  }, []);

  const handleClick = useCallback(() => {
    console.log('Camera animation triggered');
  }, []);

  useEffect(() => {
    const level = getPerformanceLevel();
    setPerformanceLevel(level);
    
    // Set render scale based on performance
    if (level === 'low') setRenderScale(0.6);
    else if (level === 'medium') setRenderScale(0.8);
    else setRenderScale(1);

    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading 3D Scene...</div>
      </div>
    );
  }

  // Fallback for very low performance devices
  if (performanceLevel === 'low' && typeof window !== 'undefined' && window.innerWidth < 768) {
    return <CartoonBackgroundFallback />;
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          transform: `scale(${renderScale})`,
          transformOrigin: 'center'
        }}
        dpr={performanceLevel === 'low' ? 1 : 2}
        performance={{ min: performanceLevel === 'low' ? 0.2 : 0.5 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        {performanceLevel !== 'low' && (
          <pointLight position={[-1, -1, 1]} intensity={0.5} color="#ff6b6b" />
        )}
        
        <CartoonScene performanceLevel={performanceLevel} mousePosition={mousePosition} />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={performanceLevel === 'low' ? 0.2 : 0.5}
        />
        
        {performanceLevel !== 'low' && (
          <EffectComposer>
            <Outline
              visibleEdgeColor={0x000000}
              hiddenEdgeColor={0x000000}
              edgeStrength={2}
              edgeThickness={1}
              edgeGlow={0}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default CartoonBackgroundOptimized;
