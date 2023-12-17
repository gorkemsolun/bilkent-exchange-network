/**
 * Renders a button that triggers a modal to delete a post.
 *
 * @param {DeletePostButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered DeletePostButton component.
 */
import { useState } from "react";
import { DeletePostButtonProps } from "../../data-types/props";
import DeletePost from "./DeletePost";

export default function DeletePostButton(props: DeletePostButtonProps) {
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
        <DeletePost
          onClose={handleCloseModal}
          postId={props.postId}
          profileId={props.profileId}
          type={props.type}
        />
      )}
    </div>
  );
}
