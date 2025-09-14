import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { SkillsPage } from './components/SkillsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };

    // Set initial page
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'projects':
        return <ProjectsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <LanguageProvider>
      <Layout currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </LanguageProvider>
  );
}

export default App;