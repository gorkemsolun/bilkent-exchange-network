import axios from "axios";
import { useState } from "react";
import {
  categories,
  lostfoundUrl,
  profileUrl,
} from "../../data-types/constants";
import {
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { LostFoundPost } from "../../data-types/posts";
import { CreatePostProps } from "../../data-types/props";
import { resizeImageFile } from "../PostHelpers";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

export default function CreateLostAndFoundPost(props: CreatePostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (
      !formData.get("title") ||
      !formData.get("description") ||
      !formData.get("image") ||
      !formData.get("category") ||
      !formData.get("status")
    ) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const post: LostFoundPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: await resizeImageFile(formData.get("image") as File),
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      poster: user?._id as string,
    };

    await axios
      .post(lostfoundUrl, post)
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        setError(err);
        setError("Could not create post");
      });

    await axios
      .get(`${profileUrl}/${user?._id}`)
      .then((res) => {
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
    setIsSubmitted(true);
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

        <div className="modal-form-group">
          <div className="flex justify-center">
            <div className="mx-2">
              <input
                type="radio"
                id="lost"
                name="status"
                value="lost"
                defaultChecked
              />
              <label htmlFor="lost" className="ml-2">
                Lost
              </label>
            </div>
            <div className="mx-2">
              <input type="radio" id="found" name="status" value="found" />
              <label htmlFor="found" className="ml-2">
                Found
              </label>
            </div>
          </div>
        </div>

        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="form-control">
            {categories.lostfound.map((category) => (
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
