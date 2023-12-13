import axios from "axios";
import React, { useState } from "react";
import { categories, urlsPost } from "../../data-types/constants";
import { CreatePostProps } from "../../data-types/datatypes";
import { SecondhandPost } from "../../data-types/posttypes";
import Loader from "../components/loader";
import { getBase64 } from "../fetchPostHelpers";
import { useAuthContext } from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";

export default function CreateSecondHandPost(props: CreatePostProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Check for errors here
    {
      // Check if any field is empty
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
    }

    const post: SecondhandPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as unknown as number,
      image: await getBase64(formData.get("image") as File),
      category: formData.get("category") as string,
      poster: user._id,
    };

    axios
      .post(urlsPost.secondhand, post)
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        setError(err);
      });

    setLoading(false);
    props.onClose();
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
      </form>
    </div>
  );
}
