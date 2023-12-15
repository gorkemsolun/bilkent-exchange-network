import axios from "axios";
import { useState } from "react";
import { categories, urlsPost } from "../../data-types/constants";
import { CreatePostProps } from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posttypes";
<<<<<<< HEAD
import { useAuthContext } from "../authentication/authHelpers";
=======
import Loader from "../components/loader";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/authHelpers";
>>>>>>> 6147682 (optimization)
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/loader";

export default function CreateBorrowPost(props: CreatePostProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { profileDispatch } = useProfileContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("title") || !formData.get("description")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const post: BorrowPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      poster: user._id,
    };

    await axios
      .post(urlsPost.borrow, post)
      .then((res) => {
        console.log(res);
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        //console.log(err);
        setError(err);
      })
      .finally(() => {
        //setLoading(false);
      });

    await axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        console.log(res.data.profile)
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
       
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsSubmitted(true);
      });

  };

  if (isSubmitted) {
    window.location.reload();
  }

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        {loading && <Loader />}
        <span className="close" onClick={props.onClose}>
          &times;
        </span>

        <div>
          <div className="modal-form-group pt-4" style={{ textAlign: "left" }}>
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter title"
            />
          </div>
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              style={{ height: "15vh" }}
            />
          </div>
        </div>

        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="form-control">
            {categories.borrow.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
        {error && (
          <ErrorModal
            message={error}
            onClose={() => {
              setError(null);
            }}
          />
        )}
      </form>
    </div>
  );
}
