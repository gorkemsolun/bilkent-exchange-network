import axios from "axios";
import { useState } from "react";
import { CreateEntryProps, ForumEntry } from "../../data-types/datatypes";
import Loader from "../components/loader";
import { useAuthContext } from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";

export default function CreateEntry(props: CreateEntryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    {
      // Check if any field is empty
      if (!formData.get("content")) {
        setError("ALL INPUT FIELDS MUST BE SPECIFIED");
        setLoading(false);
        return;
      }
    }

    const post: ForumEntry = {
      content: formData.get("content") as string,
      poster: user._id,
    };

    axios
      .post(`http://localhost:3000/forum/forumpost/${props.postId}`, post)
      .then((res) => {})
      .catch((err) => {
        setError(err);
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
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="content">Message</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              style={{ height: "15vh" }}
            />
          </div>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Reply
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
