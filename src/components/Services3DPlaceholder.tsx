import React, { useEffect, useState } from 'react';

// Lightweight SVG placeholder used in ServicesPage while a real 3D scene
// (three.js / react-three-fiber) is added later. Respects prefers-reduced-motion.
const Services3DPlaceholder: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center text-white">
      <svg
        role="img"
        aria-label="services visual placeholder"
        width="380"
        height="220"
        viewBox="0 0 380 220"
        className="max-w-full h-auto"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#0b76ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <g transform="translate(20,40)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="#0b1020" stroke="#0b76ff" strokeOpacity="0.12" />
          <rect x="12" y="12" width="196" height="86" rx="6" fill="url(#g1)" opacity="0.12" />
          <rect x="0" y="108" width="220" height="12" rx="6" fill="#081226" />
        </g>

        <g transform="translate(260,30)">
          <rect x="0" y="0" width="60" height="110" rx="12" fill="#0b1020" stroke="#ffffff" strokeOpacity="0.04" />
          <rect x="8" y="10" width="44" height="84" rx="6" fill="#ffffff" opacity="0.06" />
        </g>

        <g>
          <line x1="180" y1="80" x2="260" y2="80" stroke="#9AE66E" strokeWidth="2" strokeOpacity="0.14" />
          <circle cx="180" cy="80" r="6" fill="#9AE66E" opacity="0.95" />
          <circle cx="220" cy="64" r="5" fill="#FF7B6B" opacity="0.95" />
          <circle cx="260" cy="80" r="6" fill="#0B76FF" opacity="0.95" />
        </g>

        {!prefersReducedMotion && (
          <g transform="translate(190,180)">
            <text x="0" y="0" fontSize="11" fill="#ffffff" fillOpacity="0.6">軽量3Dプレースホルダー</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Services3DPlaceholder;
