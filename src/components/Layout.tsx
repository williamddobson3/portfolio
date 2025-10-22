import React from 'react';
import { Navigation } from './Navigation';
import VantaCloudsDebug from './VantaCloudsDebug';
import '../styles/clouds-background.css';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  return (
    <div className="min-h-screen relative">
      <VantaCloudsDebug>
        <Navigation currentPage={currentPage} />
        <main className="relative z-10">
          {children}
        </main>
      </VantaCloudsDebug>
    </div>
  );
};