/**
 * Component for creating a borrow post.
 * 
 * @component
 * @param {CreatePostProps} props - The props for the component.
 * @returns {JSX.Element} The JSX element representing the create borrow post component.
 */
import axios from "axios";
import { useState } from "react";
import { borrowUrl, categories } from "../../data-types/constants";
import {
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posts";
import { CreatePostProps } from "../../data-types/props";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";

export default function CreateBorrowPost(props: CreatePostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  /**
   * Handles the form submission for creating a borrow post.
   * @param event - The form event.
   */
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
      poster: user?._id as string,
    };

    let postId;
    await axios
      .post(borrowUrl, post)
      .then((res) => {
        postId = res.data._id;
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    const addToProfile = {
      id: postId,
      typename: "Borrow",
      title: post.title,
    };

    const profile = JSON.parse(localStorage.getItem("profile") as string);

    if (profile) {
      profile.ownPosts.push(addToProfile);
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    profileDispatch({ type: "UPDATE", payload: profile });
    setLoading(false);

    if (error === null || error === undefined) {
      setIsSubmitted(true);
    }
  };

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

        {isSubmitted ? (
          <SuccessModal />
        ) : (
          <>
            <div>
              <div
                className="modal-form-group pt-4"
                style={{ textAlign: "left" }}
              >
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
          </>
        )}
      </form>
    </div>
  );
}
