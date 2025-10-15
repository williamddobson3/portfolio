import React from 'react';
import { AlertCircle, X, Shield, Info } from 'lucide-react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'error'
}) => {
  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case 'warning':
        return {
          icon: Shield,
          iconColor: 'text-yellow-400',
          iconBg: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          accentColor: 'text-yellow-400'
        };
      case 'info':
        return {
          icon: Info,
          iconColor: 'text-blue-400',
          iconBg: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          accentColor: 'text-blue-400'
        };
      default:
        return {
          icon: AlertCircle,
          iconColor: 'text-red-400',
          iconBg: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          accentColor: 'text-red-400'
        };
    }
  };

  const { icon: Icon, iconColor, iconBg, borderColor, accentColor } = getIconAndColors();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-gray-900/95 backdrop-blur-md border ${borderColor} rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-gray-400 text-sm">
                {type === 'error' ? 'Operation failed' : type === 'warning' ? 'Warning' : 'Information'}
              </p>
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
            <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
              <AlertCircle className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-2">
                {message}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {type === 'error' && message.includes('permission') 
                  ? 'You don\'t have the necessary permissions to delete this conversation. Only the creator can delete it.'
                  : 'Please try again or contact support if the problem persists.'
                }
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className={`${type === 'error' ? 'bg-red-500/10 border-red-500/30' : type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-blue-500/10 border-blue-500/30'} border rounded-lg p-4 mb-6`}>
            <div className="flex items-center space-x-2 mb-2">
              <Icon className={`w-4 h-4 ${accentColor}`} />
              <span className={`${accentColor} font-medium text-sm`}>
                {type === 'error' ? 'Error Details' : type === 'warning' ? 'Warning Info' : 'Information'}
              </span>
            </div>
            <ul className={`${type === 'error' ? 'text-red-300' : type === 'warning' ? 'text-yellow-300' : 'text-blue-300'} text-sm space-y-1`}>
              {type === 'error' && message.includes('permission') ? (
                <>
                  <li>• Only the conversation creator can delete it</li>
                  <li>• This helps protect conversations from accidental deletion</li>
                  <li>• Contact the creator if you need the conversation deleted</li>
                </>
              ) : (
                <>
                  <li>• Check your internet connection</li>
                  <li>• Try refreshing the page</li>
                  <li>• Contact support if the issue continues</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className={`px-6 py-2 ${type === 'error' ? 'bg-red-600 hover:bg-red-700' : type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-colors`}
          >
            {type === 'error' ? 'Got it' : type === 'warning' ? 'Understood' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};
