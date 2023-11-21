"use client";

import React from "react";

const CreatePostButton = () => {
  const handleCreatePost = () => {
    // Replace this with your desired functionality
    console.log("Create Post button clicked!");
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
    <button style={buttonStyle} onClick={handleCreatePost}>
      Create Post
    </button>
  );
};

export default CreatePostButton;
