import axios from "axios";
import { useEffect, useState } from "react";
import { categories, donateUrl } from "../../data-types/constants";
import {
  OwnPost,
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { DonatePost } from "../../data-types/posts";
import { EditPostProps } from "../../data-types/props";
import { isFileImage, resizeImageFile } from "../PostHelpers";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

export default function EditDonatePost(props: EditPostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<DonatePost>({} as DonatePost);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  // this is required to show the category of post. dont delete.
  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${donateUrl}/${props.postId}`)
      .then((res) => {
        setPost(res.data);
        setSelectedCategory(res.data.category);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("title") || !formData.get("description")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const editedPost: DonatePost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: selectedCategory as string,
      image: isFileImage(formData.get("image") as File) //if no file is submitted then do not include image in the userProfile body
        ? await resizeImageFile(formData.get("image") as File)
        : post.image,
      poster: user?._id as string,
    };

    await axios.put(`${donateUrl}/${props.postId}`, editedPost).catch((err) => {
      setError(err);
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
      profile.ownPosts[index].title = editedPost.title;
    }
    localStorage.setItem("profile", JSON.stringify(profile));
    profileDispatch({ type: "UPDATE", payload: profile });

    setLoading(false);
    if (error === null || error === undefined) {
      setIsEdited(true);
    }
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
              style={{ height: "15vh" }}
              defaultValue={post.description}
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
            {categories.donate.map((category) => (
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
