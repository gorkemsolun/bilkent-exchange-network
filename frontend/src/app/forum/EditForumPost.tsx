/**
 * Component for editing a forum post.
 *
 * @component
 * @param {EditPostProps} props - The props for the EditForumPost component.
 * @returns {JSX.Element} The JSX element representing the EditForumPost component.
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { forumUrl } from "../../data-types/constants";
import {
  OwnPost,
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { ForumPost } from "../../data-types/posts";
import { EditPostProps } from "../../data-types/props";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";

export default function EditForumPost(props: EditPostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const user = (useAuthContext() as unknown as UserContextType).user;

  /**
   * Fetches the forum post data from the server and updates the component state.
   * @param {Object} props - The component props.
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${forumUrl}/${props.postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  /**
   * Handles the form submission for editing a forum post.
   * @param event - The form event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Check if any field is empty
    if (!formData.get("title") || !formData.get("description")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const editedPost: ForumPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      poster: user?._id as string,
      entries: post.entries,
    };

    await axios.put(`${forumUrl}/${props.postId}`, editedPost).catch((err) => {
      console.log(err);
      setError(err);
    });

    const profile = JSON.parse(localStorage.getItem("profile") as string);
    let index = -1;

    if (profile) {
      index = profile.ownPosts.findIndex(
        (post: OwnPost) => post.id === props.postId
      );
    }
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
   * Reloads the window if the post is edited.
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
        {isEdited ? (
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
          </>
        )}
      </form>
    </div>
  );
}
