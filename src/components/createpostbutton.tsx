"use client";

import React, { useState } from "react";
import CreateItem from "./createItem";

export default function CreatePostButton(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50", // Green background color
    color: "white", // White text color
    padding: "10px 20px", // Padding for the button
    borderRadius: "25px", // Curved edges
    border: "none", // No border
    cursor: "pointer", // Cursor style
    fontSize: "16px", // Font size
    fontWeight: "bold", // Bold text
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow for a subtle elevation effect
    height: "8vh", // Height of the button
    alignSelf: "center", // Align button to the center of the page
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleCreatePost}>
        Create Post
      </button>
      {isModalOpen && (
        <CreateItem onClose={handleCloseModal} type={props.type} />
      )}
    </div>
  );
}
