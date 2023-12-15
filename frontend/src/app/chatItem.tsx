import React from "react";

interface ChatItemProps {
  chatTitle: string;
  onSelectChat: (chatTitle: string) => void;
  isActive: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatTitle, onSelectChat, isActive }) => {
  const handleChatClick = () => {
    onSelectChat(chatTitle);
  };

  return (
    <div
      className={`chatItem ${isActive ? "activeChat" : ""}`}
      onClick={handleChatClick}
    >
      {chatTitle}
    </div>
  );
};

export default ChatItem;
