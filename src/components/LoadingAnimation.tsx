import React from 'react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ground line */}
      <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

      {/* Progress frame container */}
      <div className="relative w-full max-w-4xl mx-auto mb-8 px-4">
        {/* Progress frame background */}
        <div className="w-full h-4 bg-gray-700/30 rounded-full overflow-hidden border border-gray-600/50">
          <div className="progress-frame h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
        </div>
        
        {/* Walking GIF animation */}
        <div className="relative w-full h-40 mt-4">
          <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
            <div className="walking-gif">
              <img 
                src="/loading_walk.gif" 
                alt="Loading..." 
                className="h-32 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
              {/* Shadow under the walking character */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-black/30 rounded-full blur-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
          Loading...
        </h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="text-gray-300 mt-4 text-sm">Please wait while we prepare everything for you</p>
      </div>


      <style>{`
        @keyframes walkGif {
          0% {
            transform: translateX(-10vw);
          }
          100% {
            transform: translateX(110vw);
          }
        }

        @keyframes progressFrame {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .walking-gif {
          animation: walkGif 6s linear infinite;
          position: relative;
        }

        .progress-frame {
          animation: progressFrame 6s linear infinite;
        }
      `}</style>
    </div>
  );
};
