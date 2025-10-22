import React, { useEffect, useRef, useState } from 'react';

interface VantaCloudsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const VantaCloudsBackground: React.FC<VantaCloudsBackgroundProps> = ({ 
  className = '', 
  children 
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initVanta = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const VANTA = await import('vanta/dist/vanta.clouds.min');
        
        if (vantaRef.current && !vantaEffect) {
          const effect = VANTA.default({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x87CEEB,
            cloudColor: 0xFFFFFF,
            cloudShadowColor: 0xE0E0E0,
            sunColor: 0xFFE135,
            sunGlareColor: 0xFFA500,
            sunlightColor: 0xFFD700,
            speed: 1.0,
            backgroundColor: 0x87CEEB,
            // Bright and vibrant colors
            skyColor: 0x87CEEB, // Sky blue
            cloudColor: 0xFFFFFF, // Pure white clouds
            cloudShadowColor: 0xE0E0E0, // Light gray shadows
            sunColor: 0xFFE135, // Bright yellow sun
            sunGlareColor: 0xFFA500, // Orange glare
            sunlightColor: 0xFFD700, // Golden sunlight
            speed: 0.8, // Gentle movement
            backgroundColor: 0x87CEEB, // Sky blue background
          });
          
          setVantaEffect(effect);
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('Vanta.js failed to load, using fallback:', error);
        setIsLoaded(true);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)',
          minHeight: '100vh'
        }}
      />
      
      {/* Fallback gradient for when Vanta.js fails to load */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 w-full h-full animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)'
          }}
        />
      )}
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default VantaCloudsBackground;
