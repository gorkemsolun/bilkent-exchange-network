/**
 * Renders a button that triggers the creation of a post and displays a modal for creating the post.
 * @param props - The component props containing the post ID.
 * @returns The CreateEntryButton component.
 */

import { useState } from "react";
import { CreateEntryButtonProps } from "../../../data-types/props";
import CreateEntry from "./CreateEntry";

export default function CreateEntryButton(props: CreateEntryButtonProps) {
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
    <div>
      <button
        className="btn btn-success ml-2"
        onClick={handleCreatePost}
        type="button"
      >
        Reply
      </button>
      {isModalOpen && (
        <CreateEntry onClose={handleCloseModal} postId={props.postId} />
      )}
    </div>
  );
}
