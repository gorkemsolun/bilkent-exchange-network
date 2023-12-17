import { useState } from "react";
import { DeleteEntryButtonProps } from "../../../data-types/props";
import DeleteEntry from "./DeleteEntry";

/**
 * Renders a button component that triggers the deletion of a post entry.
 * @param props - The props for the DeleteEntryButton component.
 * @returns A React component representing the DeleteEntryButton.
 */
export default function DeletePostButton(props: DeleteEntryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the delete post action.
   */
  function handleDeletePost(): void {
    setIsModalOpen(true);
  }

  /**
   * Handles the close modal action.
   */
  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button
        className="btn btn-danger ml-2"
        onClick={handleDeletePost}
        type="button"
      >
        Delete
      </button>
      {isModalOpen && (
        <DeleteEntry
          onClose={handleCloseModal}
          postId={props.postId}
          entryId={props.entryId}
        />
      )}
    </div>
  );
}
