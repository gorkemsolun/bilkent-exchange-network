import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { OwnPost, ProfileContextType } from "../../data-types/datatypes";
import { DeletePostProps } from "../../data-types/props";
import { useProfileContext } from "../authentication/AuthHelpers";
import Loader from "./Loader";

export default function DeletePost(props: DeletePostProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const handleDelete = async () => {
    setLoading(true);
    await axios
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

    const profile = JSON.parse(localStorage.getItem("profile") as string);
    let index;

    if (profile) {
      index = profile.ownPosts.findIndex(
        (post: OwnPost) => post.id === props.postId
      );
    }
    if (index) {
      profile.ownPosts.splice(index, 1);
    }
    localStorage.setItem("profile", JSON.stringify(profile));
    profileDispatch({ type: "UPDATE", payload: profile });
    setLoading(false);
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
      {loading && <Loader />}
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
