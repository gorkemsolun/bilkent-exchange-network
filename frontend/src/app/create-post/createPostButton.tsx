import { useState } from "react";
import { CreatePostButtonProps } from "../../data-types/datatypes";
import CreateBorrowPost from "./CreateBorrowPost";
import CreateDonatePost from "./CreateDonatePost";
import CreateForumPost from "./CreateForumPost";
import CreateLostAndFoundPost from "./CreateLostAndFoundPost";
import CreateSecondHandPost from "./CreateSecondHandPost";
import CreateSectionExchangePost from "./CreateSectionExchangePost";
import ErrorModal from "../components/ErrorModal";

export default function CreatePostButton(props: CreatePostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCreatePost(): void {
    setIsModalOpen(true);
  }

  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

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
