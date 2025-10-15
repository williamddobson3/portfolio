import React from 'react';
import { User } from 'lucide-react';

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

      {/* Walking man animation */}
      <div className="relative w-full h-32 mb-8">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <div className="walking-man">
            {/* Man character */}
            <div className="relative">
              {/* Head */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-2 shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Body */}
              <div className="w-8 h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg mx-auto relative shadow-lg">
                {/* Arms */}
                <div className="arm-left absolute -left-3 top-2 w-2 h-10 bg-blue-500 rounded-full origin-top"></div>
                <div className="arm-right absolute -right-3 top-2 w-2 h-10 bg-blue-500 rounded-full origin-top"></div>
              </div>
              
              {/* Legs */}
              <div className="relative">
                <div className="leg-left absolute left-2 top-0 w-2 h-12 bg-blue-600 rounded-full origin-top"></div>
                <div className="leg-right absolute right-2 top-0 w-2 h-12 bg-blue-600 rounded-full origin-top"></div>
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black/20 rounded-full blur-sm"></div>
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

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <div className="progress-bar h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes walk {
          0% {
            transform: translateX(-10vw);
          }
          100% {
            transform: translateX(110vw);
          }
        }

        @keyframes swingArmLeft {
          0%, 100% {
            transform: rotate(-30deg);
          }
          50% {
            transform: rotate(30deg);
          }
        }

        @keyframes swingArmRight {
          0%, 100% {
            transform: rotate(30deg);
          }
          50% {
            transform: rotate(-30deg);
          }
        }

        @keyframes swingLegLeft {
          0%, 100% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }

        @keyframes swingLegRight {
          0%, 100% {
            transform: rotate(20deg);
          }
          50% {
            transform: rotate(-20deg);
          }
        }

        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .walking-man {
          animation: walk 8s linear infinite;
        }

        .arm-left {
          animation: swingArmLeft 0.6s ease-in-out infinite;
        }

        .arm-right {
          animation: swingArmRight 0.6s ease-in-out infinite;
        }

        .leg-left {
          animation: swingLegLeft 0.6s ease-in-out infinite;
        }

        .leg-right {
          animation: swingLegRight 0.6s ease-in-out infinite;
        }

        .progress-bar {
          animation: progressBar 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
