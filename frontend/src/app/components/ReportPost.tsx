import axios from "axios";
import React, { useState } from "react";
import { ReportPostProps } from "../../data-types/props";
import ErrorModal from "./ErrorModal";

export default function ReportPost(props: ReportPostProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    // Check if any field is empty
    if (!formData.get("reason")) {
      setError("Please provide a reason for reporting the post.");
      setIsSubmitting(false);
      return;
    }

    const reason = formData.get("reason") as string;
    try {
      // Send the report to the server
      await axios.post("http://localhost:3000/admin/reportedposts", {
        postId: props.postId,
        reason: reason,
        userId: props.profileId,
        type: props.type,
        title: props.title,
      });

      alert("Post reported successfully!");
    } catch (err) {
      console.error("Error reporting post:", err);
      setError("An error occurred while reporting the post.");
    } finally {
      setIsSubmitting(false);
      props.onClose();
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      props.onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        <span className="close" onClick={handleCancel}>
          &times;
        </span>

        <div>
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="reason">
              Please provide a reason for reporting this post:
            </label>
            <textarea
              id="reason"
              name="reason"
              className="form-control"
              style={{ height: "15vh" }}
              placeholder="Reason for reporting this post..."
            />
          </div>
        </div>

        <div className="modal-form-group mt-4">
          <button
            type="submit"
            className="btn btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Reporting..." : "Report"}
          </button>
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={handleCancel}
          >
            Cancel
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
