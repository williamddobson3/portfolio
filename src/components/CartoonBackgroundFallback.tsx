import React from 'react';
import '../styles/cartoon-background.css';

const CartoonBackgroundFallback = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 animate-pulse"></div>
      
      {/* CSS-based cartoon elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-300 rounded-full opacity-60 cartoon-float cartoon-optimized" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-purple-300 transform rotate-45 opacity-60 cartoon-float cartoon-optimized" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-pink-300 rounded-full opacity-60 cartoon-float cartoon-optimized" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/2 w-8 h-8 bg-yellow-300 transform rotate-45 opacity-60 cartoon-float cartoon-optimized" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-green-300 rounded-full opacity-60 cartoon-float cartoon-optimized" style={{ animationDelay: '4s' }}></div>
        
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full cartoon-twinkle cartoon-optimized"></div>
          <div className="absolute top-20 left-40 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-32 left-20 w-1.5 h-1.5 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-48 left-60 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-60 left-30 w-2 h-2 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-80 left-50 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-96 left-80 w-1.5 h-1.5 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '3s' }}></div>
          
          {/* Right side */}
          <div className="absolute top-16 right-20 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-32 right-40 w-2 h-2 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-48 right-20 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '1.3s' }}></div>
          <div className="absolute top-64 right-60 w-1.5 h-1.5 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '1.8s' }}></div>
          <div className="absolute top-80 right-30 w-1 h-1 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '2.3s' }}></div>
          <div className="absolute top-96 right-50 w-2 h-2 bg-white rounded-full cartoon-twinkle cartoon-optimized" style={{ animationDelay: '2.8s' }}></div>
        </div>
        
        {/* Animated lines */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-5"></div>
    </div>
  );
};

export default CartoonBackgroundFallback;
