/**
 * Renders a button that triggers the creation of a specific type of post.
 * @param {CreatePostButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
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

  /**
   * Handles the action of creating a post.
   */
  function handleCreatePost(): void {
    setIsModalOpen(true);
  }

  /**
   * Handles the action of closing the modal.
   */
  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div className="mt-2">
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
