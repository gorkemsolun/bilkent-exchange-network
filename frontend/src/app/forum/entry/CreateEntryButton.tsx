import { useState } from "react";
import { CreateEntryButtonProps } from "../../../data-types/datatypes";
import CreateEntry from "./CreateEntry";

export default function CreateEntryButton(props: CreateEntryButtonProps) {
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
