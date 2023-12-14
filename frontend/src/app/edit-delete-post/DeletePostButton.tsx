import { useState } from "react";
import DeletePost from "./DeletePost";
import { DeletePostButtonProps } from "../../data-types/datatypes";
import DeletePostModal from "./DeletePost";

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
