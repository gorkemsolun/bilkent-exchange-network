import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DeletePostProps } from "../../data-types/datatypes";

export default function DeletePost(props: DeletePostProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    axios
      .delete(
        "http://localhost:3000/" +
          props.type +
          "/" +
          props.type +
          "post/" +
          props.postId
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Delete post from profile
    const body = {
      profileId: props.profileId,
      toBeRemoved: props.postId,
    };
    axios
      .put(`http://localhost:3000/profile/delete-ownPost`, body)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setIsDeleted(true);
  };

  const handleCancel = () => {
    props.onClose();
  };

  if (isDeleted) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="modal-overlay">
      <div className="delete-post-modal-body">
        <label>Are you sure you want to delete this post?</label>
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
