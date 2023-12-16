import { useState } from "react";
import { CreatePostButtonProps } from "../../data-types/props";
import CreateBorrowPost from "../borrow/CreateBorrowPost";
import CreateDonatePost from "../donate/CreateDonatePost";
import CreateForumPost from "../forum/CreateForumPost";
import CreateLostAndFoundPost from "../lostfound/CreateLostfoundPost";
import CreateSecondHandPost from "../secondhand/CreateSecondhandPost";
import CreateSectionExchangePost from "../sectionexchange/CreateSectionexchangePost";

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
      <button
        className="create-post-button"
        onClick={handleCreatePost}
        type="button"
      >
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
