import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DeletePostProps } from "../../data-types/datatypes";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/authHelpers";
import Loader from "../components/loader";

export default function DeletePost(props: DeletePostProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { user } = useAuthContext();
  const { profileDispatch } = useProfileContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true)
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

    await axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //
      });
      setLoading(false)
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
