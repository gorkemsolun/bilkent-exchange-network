import { useState } from "react";
import DeletePostModal from "./DeletePost";
import { DeletePostButtonProps } from "../../data-types/datatypes";

export default function DeletePostButton(props: DeletePostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeletePost(): void {
    setIsModalOpen(true);
  }

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
        <DeletePostModal
          onClose={handleCloseModal}
          postId={props.postId}
          profileId={props.profileId}
          type={props.type}
        />
      )}
    </div>
  );
}
