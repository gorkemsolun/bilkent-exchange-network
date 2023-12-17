import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { localUrl } from "../../data-types/constants";
import { OwnPost, ProfileContextType } from "../../data-types/datatypes";
import { DeletePostProps } from "../../data-types/props";
import { useProfileContext } from "../authentication/AuthHelpers";
import ErrorModal from "./ErrorModal";
import Loader from "./Loader";

export default function DeletePost(props: DeletePostProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  /**
   * Handles the deletion of a post.
   * Sets the loading state to true, sends a delete request to the server,
   * updates the user's profile if necessary, and sets the isDeleted state to true if there are no errors.
   */
  const handleDelete = async () => {
    setLoading(true);

    await axios
      .delete(localUrl + props.type + "/" + props.type + "post/" + props.postId)
      .catch((err) => {
        setError(err);
        console.log(err);
      });

    const profile = JSON.parse(localStorage.getItem("profile") as string);
    let index = -1;

    if (profile) {
      index = profile.ownPosts.findIndex(
        (post: OwnPost) => post.id === props.postId
      );
    }
    if (index !== -1) {
      profile.ownPosts.splice(index, 1);
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    }
    setLoading(false);

    if (error === null || error === undefined) {
      setIsDeleted(true);
    }
  };

  /**
   * Handles the cancel action.
   */
  const handleCancel = () => {
    props.onClose();
  };

  if (isDeleted) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="modal-overlay">
      {loading && <Loader />}
      <div className="delete-post-modal-body">
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
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
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
