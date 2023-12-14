import axios from "axios";
import { useState } from "react";
import { EditEntryProps } from "../../data-types/datatypes";
import { ForumEntry } from "../../data-types/datatypes";
import Loader from "../components/loader";
import { useAuthContext } from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";
import { Navigate } from "react-router-dom";

export default function EditEntry(props: EditEntryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const [isEdited, setIsEdited] = useState(false);

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

    const editedEntry: ForumEntry = {
      content: formData.get("content") as string,
      poster: user._id,
    };

    axios
      .put(
        "http://localhost:3000/forum/forumpost/" +
          props.postId +
          "/" +
          props.entryId,
        editedEntry
      )
      .then((res) => {})
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
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="content">Message</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              style={{ height: "15vh" }}
              defaultValue={props.entryContent}
            />
          </div>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Edit
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
