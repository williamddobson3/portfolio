import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Skill {
  name: string;
  level: number;
  years: number;
  category: string;
  projects: string[];
}

export const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();

  const skillCategories = [
    { id: 'all', name: t('skills.category.all'), color: 'white' },
    { id: 'ai', name: t('skills.category.ai'), color: 'purple' },
    { id: 'web', name: t('skills.category.web'), color: 'cyan' },
    { id: 'android', name: t('skills.category.android'), color: 'green' },
    { id: 'management', name: t('skills.category.management'), color: 'blue' },
    { id: 'leadership', name: t('skills.category.leadership'), color: 'yellow' },
  ];

  const skills: Skill[] = [
    // AI & Machine Learning
    { name: 'TensorFlow', level: 5, years: 4, category: 'ai', projects: ['AI Solutions', 'Workflow Automation'] },
    { name: 'OpenAI API', level: 5, years: 3, category: 'ai', projects: ['AI Integrations', 'Automation Workflows'] },
    { name: 'AI Model Integration', level: 5, years: 3, category: 'ai', projects: ['Client Systems', 'Internal Tools'] },
    { name: 'Workflow Automation', level: 5, years: 4, category: 'ai', projects: ['Zapier', 'n8n', 'AI Workflows'] },

    // Web Development
    { name: 'JavaScript', level: 5, years: 8, category: 'web', projects: ['React Apps', 'Node.js Backends'] },
    { name: 'React', level: 5, years: 6, category: 'web', projects: ['Scalable Web Apps', 'Client Projects'] },
    { name: 'Node.js', level: 5, years: 7, category: 'web', projects: ['Backend Services', 'REST APIs'] },
    { name: 'TypeScript', level: 5, years: 5, category: 'web', projects: ['All Modern Projects'] },
    { name: 'GraphQL', level: 4, years: 4, category: 'web', projects: ['API Design', 'Data APIs'] },
    { name: 'PHP', level: 4, years: 6, category: 'web', projects: ['Legacy Systems', 'CMS Development'] },
    { name: 'Python', level: 4, years: 4, category: 'web', projects: ['AI Integration', 'Automation Scripts'] },

    // Android Development
    { name: 'Kotlin', level: 5, years: 6, category: 'android', projects: ['Modern Android Apps', 'Client Projects'] },
    { name: 'Java', level: 4, years: 7, category: 'android', projects: ['Legacy Apps', 'Enterprise Solutions'] },
    { name: 'Android Development', level: 5, years: 7, category: 'android', projects: ['Cross-platform Apps', 'UI/UX Optimization'] },
    { name: 'Cross-platform Development', level: 4, years: 4, category: 'android', projects: ['Mobile Solutions', 'Client Apps'] },


    // Backend & Cloud
    { name: 'AWS', level: 5, years: 6, category: 'management', projects: ['Cloud Infrastructure', 'Server Setup'] },
    { name: 'Docker', level: 4, years: 4, category: 'management', projects: ['Containerization', 'Deployment'] },
    { name: 'MySQL', level: 4, years: 6, category: 'management', projects: ['Database Design', 'Data Management'] },
    { name: 'MongoDB', level: 4, years: 4, category: 'management', projects: ['NoSQL Solutions', 'Data Storage'] },
    
    // Management
    { name: 'Agile/Scrum', level: 5, years: 7, category: 'leadership', projects: ['Team Management', 'Project Delivery'] },
    { name: 'Team Leadership', level: 5, years: 5, category: 'leadership', projects: ['Cross-functional Teams', 'Mentoring'] },
    { name: 'Client Communication', level: 5, years: 8, category: 'leadership', projects: ['International Clients', 'Requirement Analysis'] },
    { name: 'Project Management', level: 5, years: 7, category: 'leadership', projects: ['50+ Projects', 'Timely Delivery'] },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full ${
          i < level
            ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/30'
            : 'bg-gray-700'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-${category.color}-500/30 text-${category.color}-300 border border-${category.color}-500/50 shadow-lg`
                  : 'bg-white/5 text-gray-600 hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Skill Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-300 transition-colors">
                  {skill.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{skill.years} {t('skills.years')}</span>
                  <span className="capitalize text-purple-400">{skill.category}</span>
                </div>
              </div>

              {/* Skill Level */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{t('skills.proficiency')}</span>
                  <span className="text-sm text-blue-400 font-semibold">
                    {skill.level}/5
                  </span>
                </div>
                <div className="flex space-x-1">
                  {renderStars(skill.level)}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="text-sm text-gray-600 mb-2">{t('skills.used_in')}</div>
                <div className="flex flex-wrap gap-1">
                  {skill.projects.slice(0, 2).map(project => (
                    <span
                      key={project}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md"
                    >
                      {project}
                    </span>
                  ))}
                  {skill.projects.length > 2 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-600 text-xs rounded-md">
                      +{skill.projects.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          {[
            { label: t('skills.stats.experience'), value: '8+', color: 'blue' },
            { label: t('skills.stats.technologies'), value: skills.length.toString(), color: 'purple' },
            { label: t('skills.stats.expert'), value: skills.filter(s => s.level === 5).length.toString(), color: 'cyan' },
            { label: t('skills.stats.categories'), value: '5', color: 'green' }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};