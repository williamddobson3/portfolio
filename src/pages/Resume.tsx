import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume: React.FC = () => {
  const [isViewing, setIsViewing] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Professional Resume
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Download or view my comprehensive professional portfolio and resume
          </p>
        </motion.div>

        {/* PDF Options */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <FileText size={48} className="text-primary-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-center mb-6">
              Satoshi Portfolio & Resume
            </h2>
            
            <p className="text-gray-300 text-center mb-8">
              A comprehensive overview of my professional experience, skills, and achievements
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* View PDF Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsViewing(true)}
                className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Eye size={20} />
                <span>View PDF</span>
              </motion.button>

              {/* Download PDF Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/satoshi.pdf"
                download="Satoshi_Resume.pdf"
                className="flex items-center justify-center space-x-2 bg-secondary-600 hover:bg-secondary-500 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </motion.a>
            </div>
          </div>

          {/* PDF Viewer */}
          {isViewing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">PDF Viewer</h3>
                <button
                  onClick={() => setIsViewing(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="w-full h-[800px] rounded-lg overflow-hidden">
                <iframe
                  src="/satoshi.pdf"
                  className="w-full h-full border-0"
                  title="Satoshi Resume PDF"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary-400">
                What's Included
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Professional Experience</li>
                <li>• Technical Skills</li>
                <li>• Project Portfolio</li>
                <li>• Certifications</li>
                <li>• Contact Information</li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4 text-secondary-400">
                Quick Stats
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-semibold">10+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Projects:</span>
                  <span className="font-semibold">25+ Completed</span>
                </div>
                <div className="flex justify-between">
                  <span>Technologies:</span>
                  <span className="font-semibold">15+ Stacks</span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-semibold">Full Stack & Blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Resume;
