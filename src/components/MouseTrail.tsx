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
      const maxAge = 1000; // 1 second trail
      
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
        const size = 20 * opacity;
        
        // Create gradient
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size
        );
        
        const color = colors[i % colors.length];
        gradient.addColorStop(0, color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.5, color + Math.floor(opacity * 128).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, color + '00');
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 30;
        ctx.shadowColor = color;
        
        // Draw main cursor circle
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connecting line
        if (nextPoint) {
          ctx.strokeStyle = color + Math.floor(opacity * 100).toString(16).padStart(2, '0');
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
        }
        
        ctx.restore();
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
      
      // Only add points if mouse moved significantly
      if (distance > 5) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          time: Date.now()
        });
        
        // Limit trail length
        if (trailRef.current.length > 20) {
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
