import axios from "axios";
import React, { useState } from "react";
import { categories, secondhandUrl } from "../../data-types/constants";
import {
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { SecondhandPost } from "../../data-types/posts";
import { CreatePostProps } from "../../data-types/props";
import { resizeImageFile } from "../PostHelpers";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";

export default function CreateSecondHandPost(props: CreatePostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const user = (useAuthContext() as unknown as UserContextType).user;

  /**
   * Handles the form submission for creating a secondhand post.
   * @param event - The form event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (
      !formData.get("title") ||
      !formData.get("description") ||
      !formData.get("price") ||
      !formData.get("image") ||
      !formData.get("category")
    ) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    if ((formData.get("price") as unknown as number) <= 0) {
      setError("PRICE SHOULD BE GREATER THAN 0");
      setLoading(false);
      return;
    }

    const post: SecondhandPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as unknown as number,
      image: await resizeImageFile(formData.get("image") as File),
      category: formData.get("category") as string,
      poster: user?._id as string,
    };

    let postId;
    await axios
      .post(secondhandUrl, post)
      .then((res) => {
        postId = res.data._id;
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    const addToProfile = {
      id: postId,
      typename: "Secondhand",
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
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
              />
            </div>

            <div className="modal-form-group" style={{ textAlign: "left" }}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" className="form-control">
                {categories.secondhand.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-form-group" style={{ textAlign: "left" }}>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="jpg, jpeg, png"
                className="form-control"
              />
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
