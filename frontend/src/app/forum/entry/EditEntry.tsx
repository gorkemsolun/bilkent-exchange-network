/**
 * Component for editing a forum entry.
 * @param props - The component props.
 * @returns The JSX element representing the EditEntry component.
 */
import axios from "axios";
import { useState } from "react";
import { forumUrl } from "../../../data-types/constants";
import { ForumEntry, UserContextType } from "../../../data-types/datatypes";
import { EditEntryProps } from "../../../data-types/props";
import { useAuthContext } from "../../authentication/AuthHelpers";
import ErrorModal from "../../components/ErrorModal";
import Loader from "../../components/Loader";

export default function EditEntry(props: EditEntryProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const user = (useAuthContext() as unknown as UserContextType).user;

  /**
   * Handles the form submission for editing an entry.
   * @param event - The form event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("content")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const editedEntry: ForumEntry = {
      content: formData.get("content") as string,
      poster: user?._id as string,
    };

    axios
      .put(forumUrl + "/" + props.postId + "/" + props.entryId, editedEntry)
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    setLoading(false);
    setIsEdited(true);
  };

  /**
   * Reloads the current page if the entry is edited.
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
