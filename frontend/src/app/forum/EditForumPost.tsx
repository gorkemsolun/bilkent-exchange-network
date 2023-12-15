import axios from "axios";
import { useEffect, useState } from "react";
import { EditPostProps } from "../../data-types/datatypes";
import { ForumPost } from "../../data-types/posts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

export default function EditForumPost(props: EditPostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();

  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const [isEdited, setIsEdited] = useState(false);
  const { profileDispatch } = useProfileContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/forum/forumpost/${props.postId}`)
      .then((res) => {
        setPost(res.data);
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

    // Check if any field is empty
    if (!formData.get("title") || !formData.get("description")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const editedPost: ForumPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      poster: user._id,
      entries: post.entries,
    };

    await axios
      .put(`http://localhost:3000/forum/forumpost/${props.postId}`, editedPost)
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        setError(err);
      });
      let profile = JSON.parse(localStorage.getItem("profile") as string);
      let index;
      
      
      if(profile) index = profile.ownPosts.findIndex(post => post.id === props.postId)
      if (index) profile.ownPosts[index].title = editedPost.title;
      localStorage.setItem("profile", JSON.stringify(profile))
      profileDispatch({ type: "UPDATE", payload: profile });

    /*  
    await axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
      })
      .catch((err) => {
        console.log(err);
      });
      */
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
      </form>
    </div>
  );
}
