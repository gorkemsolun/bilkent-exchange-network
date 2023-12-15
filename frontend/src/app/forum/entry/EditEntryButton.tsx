import { useState } from "react";
import { EditEntryButtonProps } from "../../../data-types/datatypes";
import EditEntry from "./EditEntry";

export default function EditEntryButton(props: EditEntryButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEditPost(): void {
    setIsModalOpen(true);
  }

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
