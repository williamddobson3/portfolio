import React, { useEffect, useRef, useState } from 'react';

interface VantaCloudsDebugProps {
  className?: string;
  children?: React.ReactNode;
}

const VantaCloudsDebug: React.FC<VantaCloudsDebugProps> = ({ 
  className = '', 
  children 
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    console.log('Vanta Debug:', info);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    addDebugInfo('Starting Vanta.js initialization');
    
    const initVanta = () => {
      addDebugInfo('Checking for existing scripts');
      
      // Check if scripts are already loaded
      if (window.THREE && window.VANTA && window.VANTA.CLOUDS) {
        addDebugInfo('Scripts already loaded, initializing effect');
        initializeEffect();
        return;
      }

      addDebugInfo('Loading Three.js');
      // Load Three.js
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => {
          addDebugInfo('Three.js loaded successfully');
          // Load Vanta.js after Three.js
          if (!window.VANTA) {
            addDebugInfo('Loading Vanta.js');
            const vantaScript = document.createElement('script');
            vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
            vantaScript.onload = () => {
              addDebugInfo('Vanta.js loaded successfully');
              initializeEffect();
            };
            vantaScript.onerror = () => {
              addDebugInfo('Vanta.js failed to load');
              setIsLoaded(true);
            };
            document.head.appendChild(vantaScript);
          } else {
            addDebugInfo('Vanta.js already loaded');
            initializeEffect();
          }
        };
        threeScript.onerror = () => {
          addDebugInfo('Three.js failed to load');
          setIsLoaded(true);
        };
        document.head.appendChild(threeScript);
      } else {
        addDebugInfo('Three.js already loaded');
        // Three.js is loaded, load Vanta.js
        if (!window.VANTA) {
          addDebugInfo('Loading Vanta.js');
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
          vantaScript.onload = () => {
            addDebugInfo('Vanta.js loaded successfully');
            initializeEffect();
          };
          vantaScript.onerror = () => {
            addDebugInfo('Vanta.js failed to load');
            setIsLoaded(true);
          };
          document.head.appendChild(vantaScript);
        } else {
          addDebugInfo('Vanta.js already loaded');
          initializeEffect();
        }
      }
    };

    const initializeEffect = () => {
      addDebugInfo('Attempting to initialize Vanta.js effect');
      
      if (!vantaRef.current) {
        addDebugInfo('Vanta ref not available');
        return;
      }
      
      if (vantaEffect) {
        addDebugInfo('Effect already exists');
        return;
      }
      
      if (!window.VANTA || !window.VANTA.CLOUDS) {
        addDebugInfo('VANTA.CLOUDS not available');
        return;
      }

      try {
        addDebugInfo('Creating Vanta.js clouds effect');
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
        
        addDebugInfo('Vanta.js effect created successfully');
        setVantaEffect(effect);
        setIsLoaded(true);
      } catch (error) {
        addDebugInfo(`Failed to initialize Vanta.js clouds: ${error}`);
        setIsLoaded(true);
      }
    };

    // Start initialization
    const timer = setTimeout(initVanta, 100);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        addDebugInfo('Destroying Vanta.js effect');
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={vantaRef} 
        className="fixed inset-0 w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #68b8d7 0%, #87CEEB 50%, #B0E0E6 100%)',
          minHeight: '100vh',
          zIndex: -1,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      
      {/* Fallback for when Vanta.js fails to load */}
      {!isLoaded && (
        <div 
          className="fixed inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #68b8d7 0%, #87CEEB 50%, #B0E0E6 100%)',
            zIndex: -1
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

export default VantaCloudsDebug;
