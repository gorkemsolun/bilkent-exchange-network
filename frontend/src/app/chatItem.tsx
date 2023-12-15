import React from 'react';

const ChatItem = ({ chatTitle, onSelectChat, isActive }) => {
  return (
    <div
      className={`chatItem ${isActive ? 'active' : ''}`}
      onClick={() => onSelectChat(chatTitle)}
    >
      {chatTitle}
    </div>
  );
};

export default ChatItem;
