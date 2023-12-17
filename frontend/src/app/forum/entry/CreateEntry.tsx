import axios from "axios";
import { useState } from "react";
import { forumUrl } from "../../../data-types/constants";
import { ForumEntry, UserContextType } from "../../../data-types/datatypes";
import { CreateEntryProps } from "../../../data-types/props";
import { useAuthContext } from "../../authentication/AuthHelpers";
import ErrorModal from "../../components/ErrorModal";
import Loader from "../../components/Loader";
import SuccessModal from "../../components/SuccessModal";

export default function CreateEntry(props: CreateEntryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const user = (useAuthContext() as unknown as UserContextType).user;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("content")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    const post: ForumEntry = {
      content: formData.get("content") as string,
      poster: user?._id as string,
    };

    axios.post(`${forumUrl}/${props.postId}`, post).catch((err) => {
      console.log(err);
      setError(err);
    });

    setLoading(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    // Call the provided onClose callback
    window.location.reload();
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        {loading && <Loader />}
        <span className="close" onClick={handleClose}>
          &times;
        </span>

        {isSubmitted ? (
          <SuccessModal />
        ) : (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}
