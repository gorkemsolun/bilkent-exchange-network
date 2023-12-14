import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { categories } from "../../data-types/constants";
import { EditPostProps } from "../../data-types/datatypes";
import { LostFoundPost } from "../../data-types/posttypes";
import { useAuthContext } from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/loader";
import { resizeImageFile } from "../fetchPostHelpers";

export default function EditLostAndFoundPost(props: EditPostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const [post, setPost] = useState<LostFoundPost>({} as LostFoundPost);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEdited, setIsEdited] = useState(false);

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
      .get(`http://localhost:3000/lostfound/lostfoundpost/${props.postId}`)
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
      // Check if any field is empty
      if (
        !formData.get("title") ||
        !formData.get("description") ||
        !formData.get("image") ||
        !formData.get("category")
      ) {
        setError("ALL INPUT FIELDS MUST BE SPECIFIED");
        setLoading(false);
        return;
      }
    }

    //if no file is submitted then do not include image in the userProfile body
    let image = await resizeImageFile(formData.get("image") as File);
    if (image == "data:application/octet-stream;base64,") {
      image = post.image;
    }

    const editedPost: LostFoundPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: image,
      category: formData.get("category") as string,
      status: post.status,
      poster: user._id,
    };

    axios
      .put(
        `http://localhost:3000/lostfound/lostfoundpost/${props.postId}`,
        editedPost
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err);
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
            defaultValue={post.image}
          />
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
