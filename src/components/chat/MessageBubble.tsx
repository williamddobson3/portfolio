import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, MoreVertical } from 'lucide-react';
import { Message } from '../../firebase/types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onEdit: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
  isEditing?: boolean;
  onEditStart?: (messageId: string) => void;
  onEditCancel?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  onEdit,
  onDelete,
  isEditing = false,
  onEditStart,
  onEditCancel
}) => {
  const [editText, setEditText] = useState(message.text);
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    if (onEditStart) {
      onEditStart(message.id);
    }
    setEditText(message.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editText.trim() !== message.text) {
      onEdit(message.id, editText.trim());
    }
    if (onEditCancel) {
      onEditCancel();
    }
  };

  const handleCancelEdit = () => {
    setEditText(message.text);
    if (onEditCancel) {
      onEditCancel();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      onDelete(message.id);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (message.deleted) {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-500/20 text-gray-400 italic">
          <p className="text-sm">This message was deleted</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2 group`}>
      <div className="relative">
        {/* Message bubble */}
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
            isOwn
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-white'
          }`}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-gray-300"
                rows={2}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
              />
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Save"
                >
                  <Check className="w-4 h-4 text-green-400" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  title="Cancel"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-70">
                  {formatTime(message.createdAt)}
                </span>
                {message.editedAt && (
                  <span className="text-xs opacity-50">(edited)</span>
                )}
              </div>
            </div>
          )}

          {/* Action buttons - only show for own messages */}
          {isOwn && !isEditing && showActions && (
            <div className="absolute -right-2 -top-2 flex items-center space-x-1 bg-gray-800 rounded-full p-1 shadow-lg">
              <button
                onClick={handleEdit}
                className="p-1 hover:bg-blue-500/20 rounded-full transition-colors"
                title="Edit message"
              >
                <Edit2 className="w-3 h-3 text-blue-400" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-500/20 rounded-full transition-colors"
                title="Delete message"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};