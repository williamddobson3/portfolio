import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, projectCategories, Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [detailedText, setDetailedText] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsTriedPaths, setDetailsTriedPaths] = useState<string[]>([]);
  const { t, language } = useLanguage();

  const categories = projectCategories.map(cat => ({
    ...cat,
    name: t(`projects.category.${cat.id}`)
  }));


  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);


  // Auto-rotate images for project cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        filteredProjects.forEach(project => {
          if (project.images.length > 1) {
            newIndex[project.id] = ((newIndex[project.id] || 0) + 1) % project.images.length;
          }
        });
        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [filteredProjects]);

  const handleImageClick = (project: Project, imageIndex: number) => {
    setSelectedProject(project);
    setModalImageIndex(imageIndex);
  };

  // Reset modal image index when project changes
  useEffect(() => {
    if (selectedProject) {
      setModalImageIndex(0);
      // reset details when switching projects
      setDetailedText(null);
      setDetailsError(null);
      setShowDetails(false);
    }
  }, [selectedProject]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedProject && selectedProject.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          prevModalImage();
        } else if (e.key === 'ArrowRight') {
          nextModalImage();
        }
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedProject, modalImageIndex]);

  const nextModalImage = () => {
    if (selectedProject) {
      setModalImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevModalImage = () => {
    if (selectedProject) {
      setModalImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

  {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-${category.color}-500/30 text-${category.color}-300 border border-${category.color}-500/50 shadow-lg shadow-${category.color}-500/20`
                  : 'bg-white/5 text-gray-600 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Debug: show how many projects are being displayed for the selected category */}
        <div className="text-center mb-8">
          <span className="text-sm text-gray-600">
            {t('projects.showing')}: <strong className="text-gray-800">{filteredProjects.length}</strong>
            &nbsp;•&nbsp;{t(`projects.category.${selectedCategory}`)}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden relative">
                <div className="relative w-full h-full">
                  {project.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${project.title} - Image ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                        (currentImageIndex[project.id] || 0) === imgIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      } group-hover:scale-110`}
                      onClick={() => handleImageClick(project, imgIndex)}
                    />
                  ))}
                  
                  {/* Image indicators */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (currentImageIndex[project.id] || 0) === imgIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(prev => ({ ...prev, [project.id]: imgIndex }));
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image counter */}
                  {project.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
                      {(currentImageIndex[project.id] || 0) + 1} / {project.images.length}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-blue-400 font-medium">{project.category.toUpperCase()}</span>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {project.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {t(project.descriptionKey)}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Users size={14} className="mr-1" />
                  {project.role}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-600 text-xs rounded-md">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                {project.metrics && (
                  <div className="flex justify-between text-sm text-blue-300">
                    {project.metrics.users && <span>{project.metrics.users} users</span>}
                    {project.metrics.downloads && <span>{project.metrics.downloads} downloads</span>}
                    {project.metrics.awards && <span>{project.metrics.awards}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="pt-10 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-full flex items-center justify-center transition-all duration-300 z-10 border border-red-500/30 hover:border-red-500/50"
              >
                ✕
              </button>
              
              <div className="aspect-video overflow-hidden rounded-t-3xl relative">
                <div className="relative w-full h-full">
                  {selectedProject.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${selectedProject.title} - Image ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
                        modalImageIndex === imgIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    />
                  ))}
                  
                  {/* Navigation arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevModalImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextModalImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  
                  {/* Image indicators */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedProject.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            modalImageIndex === imgIndex
                              ? 'bg-white scale-125'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          onClick={() => setModalImageIndex(imgIndex)}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image counter */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-sm px-3 py-1 rounded-full">
                      {modalImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">{selectedProject.title}</h2>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedProject.status === 'Launched' ? 'bg-green-500/20 text-green-300' :
                    selectedProject.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {selectedProject.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-lg mb-6">
                  {t(selectedProject.descriptionKey)}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-2">{t('projects.modal.role')}</h4>
                    <p className="text-gray-600">{selectedProject.role}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-2">{t('projects.modal.year')}</h4>
                    <p className="text-gray-600">{selectedProject.year}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-gray-800 font-semibold mb-3">{t('projects.modal.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-purple-500/20 text-purple-300 text-sm rounded-lg border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.metrics && (
                  <div className="mb-6">
                    <h4 className="text-gray-800 font-semibold mb-3">{t('projects.modal.impact')}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <div key={key} className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-300">{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  {selectedProject.website && (
                    <a 
                      href={selectedProject.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>{t('projects.modal.live')}</span>
                    </a>
                  )}
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      <Github size={18} />
                      <span>{t('projects.modal.code')}</span>
                    </a>
                  )}
                  {/* Detail explanation button */}
                  <button
                    onClick={async () => {
                      // Toggle: if already loaded just toggle visibility
                      if (detailedText) {
                        setShowDetails(prev => !prev);
                        return;
                      }

                      setDetailsLoading(true);
                      setDetailsError(null);
                      setShowDetails(true);
                      setDetailsTriedPaths([]);

                      // derive folder path from first image if possible
                      const firstImage = selectedProject.images && selectedProject.images[0];
                      let baseDirCandidates: string[] = [];
                      // prefer explicit project id path
                      baseDirCandidates.push(`/projects/${selectedProject.id}`);

                      if (firstImage && firstImage.startsWith('/')) {
                        const parts = firstImage.split('/').filter(Boolean); // remove empty
                        // parts: ['projects' or 'social', 'Folder', 'file']
                        if (parts.length >= 2) {
                          baseDirCandidates.unshift(`/${parts[0]}/${parts[1]}`);
                          // also add without leading slash variant
                          baseDirCandidates.push(`${parts[0]}/${parts[1]}`);
                        }
                      }

                      // ensure unique
                      baseDirCandidates = Array.from(new Set(baseDirCandidates));

                      // try several path patterns for each candidate
                      const urlsToTry: string[] = [];
                      baseDirCandidates.forEach(dir => {
                        // Prefer Japanese explanation file when language is Japanese
                        if (language === 'ja') urlsToTry.push(`${dir}/explanation_JP.txt`);
                        urlsToTry.push(`${dir}/description.txt`);
                        urlsToTry.push(`${dir}/explanation.txt`);
                        urlsToTry.push(`${dir}/description.md`);
                        urlsToTry.push(`${dir}/README.txt`);
                      });

                      let found = false;
                      const tried: string[] = [];

                      try {
                        for (const url of urlsToTry) {
                          tried.push(url);
                          try {
                            const res = await fetch(url);
                            // If server returns HTML (SPA index), ignore it — treat as not found
                            const contentType = res.headers.get('content-type') || '';
                            if (!res.ok) continue;
                            if (contentType.includes('text/html')) {
                              // likely SPA fallback (index.html) — ignore
                              continue;
                            }
                            const text = await res.text();
                            setDetailedText(text);
                            found = true;
                            break;
                          } catch (err) {
                            // ignore and continue
                          }
                        }
                      } catch (err) {
                        // top-level error
                      } finally {
                        setDetailsTriedPaths(tried);
                        if (!found) {
                          setDetailsError('No detailed explanation file found at the expected paths.');
                        }
                        setDetailsLoading(false);
                      }
                    }}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <span>{t('projects.modal.detail')}</span>
                  </button>
                </div>
                {/* Detailed explanation content */}
                {showDetails && (
                  <div className="mt-6 bg-white/5 rounded-lg p-4 max-h-60 overflow-y-auto">
                    {detailsLoading && <div className="text-gray-600">Loading...</div>}
                    {detailsError && <div className="text-red-400">{detailsError}</div>}
                    {detailsError && detailsTriedPaths.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600">
                        <div>Attempted paths:</div>
                        <ul className="list-disc list-inside">
                          {detailsTriedPaths.map(p => (
                            <li key={p} className="break-words">{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {detailedText && (
                      <pre className="text-gray-600 whitespace-pre-wrap text-sm">{detailedText}</pre>
                    )}
                    {!detailsLoading && !detailsError && !detailedText && (
                      <div className="text-gray-600">No detailed explanation available for this project.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};