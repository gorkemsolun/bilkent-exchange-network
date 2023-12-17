/**
 * Component for deleting an entry in the forum.
 * 
 * @component
 * @example
 * return (
 *   <DeleteEntry postId={1} entryId={2} onClose={() => console.log("Modal closed")} />
 * )
 */
import axios from "axios";
import { useState } from "react";
import { forumUrl } from "../../../data-types/constants";
import { DeleteEntryProps } from "../../../data-types/props";

export default function DeleteEntry(props: DeleteEntryProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  /**
   * Handles the deletion of an entry.
   * Sends a DELETE request to the forum API to delete the specified entry.
   * If the deletion is successful, logs the response.
   * If an error occurs, logs the error.
   * Sets the state variable 'isDeleted' to true.
   * If 'isDeleted' is true, reloads the window.
   */
  const handleDelete = async () => {
    axios
      .delete(forumUrl + "/" + props.postId + "/" + props.entryId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsDeleted(true);
  };

  /**
   * Handles the cancellation of the deletion.
   * Calls the 'onClose' function provided in the props.
   */
  const handleCancel = () => {
    props.onClose();
  };

  /**
   * Reloads the window if the entry is deleted.
   */
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
