import axios from "axios";
import { useState } from "react";
import { DeleteEntryProps } from "../../data-types/datatypes";

export default function DeleteEntry(props: DeleteEntryProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    axios
      .delete(
        "http://localhost:3000/forum/forumpost/" +
          props.postId +
          "/" +
          props.entryId
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsDeleted(true);
  };

  const handleCancel = () => {
    props.onClose();
  };

  if (isDeleted) {
    window.location.reload();
  }

  return (
    <div className="modal-overlay">
      <div className="delete-post-modal-body">
        <label>Are you sure you want to delete this entry?</label>
        <div className="editProfileButtonContainer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
