import { useState } from "react";
import CreateSecondHandPost from "./createSecondHandPost.tsx";
import CreateBorrowPost from "./CreateBorrowPost.tsx";
import CreateLostAndFoundPost from "./CreateLostAndFoundPost.tsx";
import CreateDonatePost from "./CreateDonatePost.tsx";
import CreateSectionExchangePost from "./CreateSectionExchangePost.tsx";
import CreateForumPost from "./CreateForumPost.tsx";

export default function CreatePostButton(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="create-post-button" onClick={handleCreatePost}>
        Create Post
      </button>
      {isModalOpen && props.type == "secondhand" && (
        <CreateSecondHandPost onClose={handleCloseModal} />
      )}
      {isModalOpen && props.type == "lostandfound" && (
        <CreateLostAndFoundPost onClose={handleCloseModal} />
      )}
      {isModalOpen && props.type == "donate" && (
        <CreateDonatePost onClose={handleCloseModal} />
      )}
      {isModalOpen && props.type == "borrow" && (
        <CreateBorrowPost onClose={handleCloseModal} />
      )}
      {isModalOpen && props.type == "sectionexchange" && (
        <CreateSectionExchangePost onClose={handleCloseModal} />
      )}
      {isModalOpen && props.type == "forum" && (
        <CreateForumPost onClose={handleCloseModal} />
      )}
    </div>
  );
}
