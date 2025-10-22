import React, { useEffect, useRef, useState } from 'react';

interface VantaCloudsSimpleProps {
  className?: string;
  children?: React.ReactNode;
}

const VantaCloudsSimple: React.FC<VantaCloudsSimpleProps> = ({ 
  className = '', 
  children 
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initVanta = () => {
      // Check if scripts are already loaded
      if (window.THREE && window.VANTA && window.VANTA.CLOUDS) {
        initializeEffect();
        return;
      }

      // Load Three.js
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => {
          // Load Vanta.js after Three.js
          if (!window.VANTA) {
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
            vantaScript.onload = initializeEffect;
            vantaScript.onerror = () => {
              console.warn('Vanta.js failed to load');
              setIsLoaded(true);
            };
            document.head.appendChild(vantaScript);
          } else {
            initializeEffect();
          }
        };
        threeScript.onerror = () => {
          console.warn('Three.js failed to load');
          setIsLoaded(true);
        };
        document.head.appendChild(threeScript);
      } else {
        // Three.js is loaded, load Vanta.js
        if (!window.VANTA) {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
          vantaScript.onload = initializeEffect;
          vantaScript.onerror = () => {
            console.warn('Vanta.js failed to load');
            setIsLoaded(true);
          };
          document.head.appendChild(vantaScript);
        } else {
          initializeEffect();
        }
      }
    };

    const initializeEffect = () => {
      if (vantaRef.current && !vantaEffect && window.VANTA && window.VANTA.CLOUDS) {
        try {
          const effect = window.VANTA.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            // Colors from Vanta.js website
            backgroundColor: 0xffffff,
            skyColor: 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: 0x183550,
            sunColor: 0xff9919,
            sunGlareColor: 0xff6633,
            sunlightColor: 0xff9933,
            speed: 1
          });
          
          setVantaEffect(effect);
          setIsLoaded(true);
        } catch (error) {
          console.warn('Failed to initialize Vanta.js clouds:', error);
          setIsLoaded(true);
        }
      }
    };

    // Start initialization
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
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
          background: 'linear-gradient(135deg, #68b8d7 0%, #87CEEB 50%, #B0E0E6 100%)',
          minHeight: '100vh'
        }}
      />
      
      {/* Fallback for when Vanta.js fails to load */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #68b8d7 0%, #87CEEB 50%, #B0E0E6 100%)'
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

export default VantaCloudsSimple;
