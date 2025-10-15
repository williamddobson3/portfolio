import React from 'react';
import { Shield, X, AlertTriangle } from 'lucide-react';

interface PermissionDeniedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const PermissionDeniedModal: React.FC<PermissionDeniedModalProps> = ({
  isOpen,
  onClose,
  title,
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-md border border-red-500/30 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-gray-400 text-sm">Access denied</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-2">
                {message}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                You don't have permission to perform this action. Only the creator of this conversation can delete it.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium text-sm">Permission Info</span>
            </div>
            <ul className="text-blue-300 text-sm space-y-1">
              <li>• Only the person who created the DM can delete it</li>
              <li>• This helps protect conversations from accidental deletion</li>
              <li>• Contact the conversation creator if you need it deleted</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
