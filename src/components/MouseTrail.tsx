import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

export const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const colors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now();
      const maxAge = 2000; // 2 second trail
      
      // Filter out old trail points
      trailRef.current = trailRef.current.filter(point => 
        currentTime - point.time < maxAge
      );
      
      if (trailRef.current.length < 2) return;
      
      // Draw trail with gradient
      for (let i = 0; i < trailRef.current.length - 1; i++) {
        const point = trailRef.current[i];
        const nextPoint = trailRef.current[i + 1];
        
        const age = currentTime - point.time;
        const opacity = 1 - (age / maxAge);
        const size = 40 * opacity; // Increased from 20 to 40
        
        // Create multiple circles for stronger effect
        for (let j = 0; j < 3; j++) {
          const circleSize = size * (1 - j * 0.3);
          const circleOpacity = opacity * (1 - j * 0.2);
          
          // Create gradient
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, circleSize
          );
          
          const color = colors[i % colors.length];
          gradient.addColorStop(0, color + Math.floor(circleOpacity * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(0.3, color + Math.floor(circleOpacity * 200).toString(16).padStart(2, '0'));
          gradient.addColorStop(0.7, color + Math.floor(circleOpacity * 100).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, color + '00');
          
          ctx.save();
          ctx.globalAlpha = circleOpacity;
          ctx.fillStyle = gradient;
          ctx.shadowBlur = 50 + j * 20; // Increased shadow blur
          ctx.shadowColor = color;
          
          // Draw main cursor circle
          ctx.beginPath();
          ctx.arc(point.x, point.y, circleSize, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        }
        
        // Draw connecting line with stronger effect
        if (nextPoint) {
          ctx.save();
          ctx.globalAlpha = opacity * 0.8;
          ctx.strokeStyle = colors[i % colors.length] + Math.floor(opacity * 200).toString(16).padStart(2, '0');
          ctx.lineWidth = 8; // Increased from 3 to 8
          ctx.shadowBlur = 20;
          ctx.shadowColor = colors[i % colors.length];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    };

    const animate = () => {
      drawTrail();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentMouse = { x: e.clientX, y: e.clientY };
      const lastMouse = mouseRef.current;
      
      // Calculate distance moved
      const distance = Math.sqrt(
        Math.pow(currentMouse.x - lastMouse.x, 2) + 
        Math.pow(currentMouse.y - lastMouse.y, 2)
      );
      
      // Add points more frequently for stronger effect
      if (distance > 2) { // Reduced from 5 to 2
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          time: Date.now()
        });
        
        // Add multiple points for denser trail
        if (distance > 10) {
          for (let i = 1; i < 3; i++) {
            const interpolatedX = lastMouse.x + (currentMouse.x - lastMouse.x) * (i / 3);
            const interpolatedY = lastMouse.y + (currentMouse.y - lastMouse.y) * (i / 3);
            trailRef.current.push({
              x: interpolatedX,
              y: interpolatedY,
              time: Date.now() - i * 10
            });
          }
        }
        
        // Limit trail length
        if (trailRef.current.length > 50) { // Increased from 20 to 50
          trailRef.current.shift();
        }
      }
      
      mouseRef.current = currentMouse;
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-10"
      style={{ 
        background: 'transparent'
      }}
    />
  );
};
