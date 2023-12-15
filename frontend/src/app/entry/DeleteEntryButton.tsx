import { useState } from "react";
import DeleteEntry from "./DeleteEntry";
import { DeleteEntryButtonProps } from "../../data-types/datatypes";

export default function DeletePostButton(props: DeleteEntryButtonProps) {
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
        <DeleteEntry
          onClose={handleCloseModal}
          postId={props.postId}
          entryId={props.entryId}
        />
      )}
    </div>
  );
}