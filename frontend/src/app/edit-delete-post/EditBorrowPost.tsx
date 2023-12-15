import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { categories } from "../../data-types/constants";
import { EditPostProps } from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posttypes";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/loader";

export default function EditBorrowPost(props: EditPostProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BorrowPost>({} as BorrowPost);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const { profileDispatch } = useProfileContext();

  // this is required to show the category of post. dont delete.
  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/borrow/borrowpost/${props.postId}`)
      .then((res) => {
        setPost(res.data);
        setSelectedCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [props]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    {
      // EXAMPLE CHECK: Check if any field is empty
      if (!formData.get("title") || !formData.get("description")) {
        setError("ALL INPUT FIELDS MUST BE SPECIFIED");
        setLoading(false);
        return;
      }
    }

    const editedPost: BorrowPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: selectedCategory as string,
      poster: user._id,
    };

    await axios
      .put(
        `http://localhost:3000/borrow/borrowpost/${props.postId}`,
        editedPost
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {});

    await axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        console.log(res.data.profile);
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //
      });

    setLoading(false);
    setIsEdited(true);
  };

  if (isEdited) {
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
              defaultValue={post.title}
              placeholder="Enter title"
            />
          </div>
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              defaultValue={post.description}
              style={{ height: "15vh" }}
            />
          </div>
        </div>

        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.borrow.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Edit Post
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
