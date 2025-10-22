import React, { useEffect, useRef, useState, useCallback } from 'react';
import CloudsFallback from './CloudsFallback';

interface BrightCloudsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

const BrightCloudsBackground: React.FC<BrightCloudsBackgroundProps> = ({ 
  className = '', 
  children,
  intensity = 'medium'
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Performance detection
  const detectPerformance = useCallback(() => {
    if (typeof window === 'undefined') return 'medium';
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'low';
    
    // Check device memory if available
    if ('deviceMemory' in navigator && navigator.deviceMemory < 2) return 'low';
    
    // Check for mobile devices
    if (window.innerWidth < 768) return 'low';
    
    return 'high';
  }, []);

  useEffect(() => {
    const detectedLevel = detectPerformance();
    setPerformanceLevel(detectedLevel);
  }, [detectPerformance]);

  useEffect(() => {
    const initVanta = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const VANTA = await import('vanta/dist/vanta.clouds.min');
        
        if (vantaRef.current && !vantaEffect) {
          // Configuration based on performance level
          const config = {
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            // Bright, vibrant colors
            skyColor: 0x87CEEB, // Sky blue
            cloudColor: 0xFFFFFF, // Pure white clouds
            cloudShadowColor: 0xE0E0E0, // Light gray shadows
            sunColor: 0xFFE135, // Bright yellow sun
            sunGlareColor: 0xFFA500, // Orange glare
            sunlightColor: 0xFFD700, // Golden sunlight
            backgroundColor: 0x87CEEB, // Sky blue background
            // Performance-based settings
            speed: performanceLevel === 'low' ? 0.5 : performanceLevel === 'medium' ? 0.8 : 1.0,
            // Reduce complexity for lower performance
            ...(performanceLevel === 'low' && {
              cloudCount: 20,
              cloudSize: 1.0,
            }),
            ...(performanceLevel === 'medium' && {
              cloudCount: 40,
              cloudSize: 1.2,
            }),
            ...(performanceLevel === 'high' && {
              cloudCount: 60,
              cloudSize: 1.5,
            }),
          };
          
          const effect = VANTA.default(config);
          setVantaEffect(effect);
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('Vanta.js failed to load, using fallback:', error);
        setIsLoaded(true);
      }
    };

    // Delay initialization to prevent SSR issues
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect, performanceLevel]);


  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 30%, #B0E0E6 60%, #E0F6FF 100%)',
          minHeight: '100vh'
        }}
      />
      
      {/* Fallback for when Vanta.js fails to load */}
      {!isLoaded && <CloudsFallback />}
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default BrightCloudsBackground;
