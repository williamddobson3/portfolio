import React, { useState } from 'react';
import { Navigation, X } from 'lucide-react';
import { NavigationModal } from './NavigationModal';

interface FloatingNavButtonProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ 
  onNavigate, 
  currentPage 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Floating Navigation Button - Positioned to avoid sidebar overlap */}
      <button
        onClick={handleOpenModal}
        className="fixed bottom-6 left-96 z-40 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        title="Navigate to other pages"
      >
        <div className="flex items-center justify-center">
          <Navigation className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-ping opacity-20"></div>
      </button>

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
    </>
  );
};
