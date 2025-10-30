import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './Navigation';
import VantaCloudsProduction from './VantaCloudsProduction';
import '../styles/clouds-background.css';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  return (
    <div className="min-h-screen relative">
      <VantaCloudsProduction>
        <Navigation currentPage={currentPage} />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </VantaCloudsProduction>
    </div>
  );
};