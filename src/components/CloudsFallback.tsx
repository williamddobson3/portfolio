import React from 'react';
import '../styles/clouds-background.css';

const CloudsFallback: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bright-sky">
      {/* Animated cloud shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large clouds */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white opacity-60 rounded-full cloud-float cloud-optimized" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-24 h-12 bg-white opacity-50 rounded-full cloud-float cloud-optimized" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-14 bg-white opacity-55 rounded-full cloud-float cloud-optimized" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-60 right-1/3 w-20 h-10 bg-white opacity-45 rounded-full cloud-float cloud-optimized" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-20 right-10 w-36 h-18 bg-white opacity-50 rounded-full cloud-float cloud-optimized" style={{ animationDelay: '8s' }}></div>
        
        {/* Medium clouds */}
        <div className="absolute top-32 left-1/3 w-16 h-8 bg-white opacity-40 rounded-full cloud-drift cloud-optimized" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-80 right-1/4 w-14 h-7 bg-white opacity-45 rounded-full cloud-drift cloud-optimized" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 left-1/2 w-18 h-9 bg-white opacity-35 rounded-full cloud-drift cloud-optimized" style={{ animationDelay: '5s' }}></div>
        
        {/* Small clouds */}
        <div className="absolute top-16 left-2/3 w-12 h-6 bg-white opacity-30 rounded-full cloud-shimmer cloud-optimized" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-72 right-1/2 w-10 h-5 bg-white opacity-35 rounded-full cloud-shimmer cloud-optimized" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-16 left-1/5 w-8 h-4 bg-white opacity-25 rounded-full cloud-shimmer cloud-optimized" style={{ animationDelay: '4.5s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-24 left-1/4 w-2 h-2 bg-white opacity-60 rounded-full cloud-bounce cloud-optimized" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-48 right-1/3 w-1.5 h-1.5 bg-white opacity-50 rounded-full cloud-bounce cloud-optimized" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-24 left-2/3 w-1 h-1 bg-white opacity-40 rounded-full cloud-bounce cloud-optimized" style={{ animationDelay: '5.5s' }}></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10"></div>
    </div>
  );
};

export default CloudsFallback;
