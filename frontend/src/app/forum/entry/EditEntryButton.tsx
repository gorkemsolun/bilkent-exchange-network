/**
 * Renders a button that triggers the edit post action and opens a modal for editing the post.
 * @param props - The component props containing the post ID, entry ID, and entry content.
 * @returns The JSX element representing the edit entry button.
 */

import { useState } from "react";
import { EditEntryButtonProps } from "../../../data-types/props";
import EditEntry from "./EditEntry";

export default function EditEntryButton(props: EditEntryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the edit post action.
   */
  function handleEditPost(): void {
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
      <button className="btn btn-info" onClick={handleEditPost} type="button">
        Edit
      </button>
      {isModalOpen && (
        <EditEntry
          onClose={handleCloseModal}
          postId={props.postId}
          entryId={props.entryId}
          entryContent={props.entryContent}
        />
      )}
    </div>
  );
}
