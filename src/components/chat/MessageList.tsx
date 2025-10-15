import React, { useState } from 'react';
import { Message } from '../../firebase/types';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onEditMessage?: (messageId: string, newText: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  onEditMessage,
  onDeleteMessage
}) => {
  
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  
  const handleEditMessage = (messageId: string, newText: string) => {
    if (onEditMessage) {
      onEditMessage(messageId, newText);
    }
    setEditingMessageId(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId);
    }
  };

  const handleEditStart = (messageId: string) => {
    setEditingMessageId(messageId);
  };

  const handleEditCancel = () => {
    setEditingMessageId(null);
  };
  
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = message.createdAt.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm text-gray-500 mt-1">Start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Object.entries(groupedMessages).map(([dateString, dayMessages]) => (
        <div key={dateString}>
          {/* Date header */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <span className="text-gray-300 text-sm font-medium">
                {formatDateHeader(dateString)}
              </span>
            </div>
          </div>
          
          {/* Messages for this date */}
          <div className="space-y-2">
            {dayMessages.map((message, index) => {
              const prevMessage = index > 0 ? dayMessages[index - 1] : null;
              const nextMessage = index < dayMessages.length - 1 ? dayMessages[index + 1] : null;
              
              const showAvatar = !nextMessage || nextMessage.senderUid !== message.senderUid;
              const showTimestamp = !nextMessage || 
                (nextMessage.createdAt.getTime() - message.createdAt.getTime()) > 300000; // 5 minutes
              
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.senderUid === currentUserId}
                  onEdit={handleEditMessage}
                  onDelete={handleDeleteMessage}
                  isEditing={editingMessageId === message.id}
                  onEditStart={handleEditStart}
                  onEditCancel={handleEditCancel}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
