import React, { useState } from 'react';
import { MoreVertical, Reply, Edit, Trash2, Flag } from 'lucide-react';
import { Message } from '../../firebase/types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
  showTimestamp: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar,
  showTimestamp
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />;
      case 'sent':
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      case 'delivered':
        return <div className="w-2 h-2 bg-blue-400 rounded-full" />;
      case 'read':
        return <div className="w-2 h-2 bg-green-400 rounded-full" />;
      default:
        return null;
    }
  };

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log('Report message:', message.id);
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit message:', message.id);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete message:', message.id);
  };

  const handleReply = () => {
    // TODO: Implement reply functionality
    console.log('Reply to message:', message.id);
  };

  if (message.deleted) {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg px-4 py-2 max-w-xs">
          <p className="text-gray-400 text-sm italic">This message was deleted</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {!isOwn && showAvatar && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-xs">
              {message.senderUid.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {!isOwn && !showAvatar && (
          <div className="w-8 h-8 flex-shrink-0" />
        )}

        {/* Message bubble */}
        <div className="relative">
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwn
                ? 'bg-blue-500 text-white rounded-br-md'
                : 'bg-black/30 backdrop-blur-md border border-white/20 text-white'
            }`}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
            
            {/* Timestamp and status */}
            <div className={`flex items-center justify-end mt-1 space-x-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
              {showTimestamp && (
                <span className="text-xs">
                  {formatTime(message.createdAt)}
                </span>
              )}
              {isOwn && getStatusIcon()}
            </div>
          </div>

          {/* Message actions */}
          {showActions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0' : 'right-0'} transform -translate-y-full mb-2`}>
              <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-1 flex items-center space-x-1">
                <button
                  onClick={handleReply}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  title="Reply"
                >
                  <Reply className="w-4 h-4 text-white" />
                </button>
                
                {isOwn && (
                  <button
                    onClick={handleEdit}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-white" />
                  </button>
                )}
                
                {isOwn && (
                  <button
                    onClick={handleDelete}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
                
                {!isOwn && (
                  <button
                    onClick={handleReport}
                    className="p-2 hover:bg-white/10 rounded transition-colors"
                    title="Report"
                  >
                    <Flag className="w-4 h-4 text-white" />
                  </button>
                )}
                
                <button
                  onClick={() => setShowActions(false)}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  title="More"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
