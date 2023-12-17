import axios from "axios";
import { useEffect, useState } from "react";
import { borrowUrl, categories } from "../../data-types/constants";
import {
  OwnPost,
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posts";
import { EditPostProps } from "../../data-types/props";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

export default function EditBorrowPost(props: EditPostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<BorrowPost>({} as BorrowPost);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  /**
   * Handles the change event of the category select element.
   * @param event - The change event.
   */
  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSelectedCategory(event.target.value);
  };

  /**
   * Fetches the borrow post data from the server and updates the component state.
   *
   * @param {object} props - The component props.
   */
  useEffect(() => {
    axios
      .get(`${borrowUrl}/${props.postId}`)
      .then((res) => {
        setPost(res.data);
        setSelectedCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [props]);

  /**
   * Handles the form submission for editing a borrow post.
   * @param event - The form event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    /**
     * Updates a borrow post with the edited information.
     * If any required input fields are missing, an error message is set and the update is aborted.
     * The updated post is sent to the server using an HTTP PUT request.
     * If the update is successful, the post title is also updated in the user's profile stored in the local storage.
     * Finally, the loading state is set to false and the isEdited state is set to true.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    if (!formData.get("title") || !formData.get("description")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const editedPost: BorrowPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: selectedCategory as string,
      poster: user?._id as string,
    };

    await axios.put(`${borrowUrl}/${props.postId}`, editedPost).catch((err) => {
      console.log(err);
      setError(err);
    });

    const profile = JSON.parse(localStorage.getItem("profile") as string);
    let index = -1;

    if (profile)
      index = profile.ownPosts.findIndex(
        (post: OwnPost) => post.id === props.postId
      );
    if (index !== -1) {
      profile.ownPosts[index].title = editedPost.title;
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    }

    setLoading(false);
    if (error === null || error === undefined) {
      setIsEdited(true);
    }
  };

  /**
   * Reloads the current page if the post is edited.
   */
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
