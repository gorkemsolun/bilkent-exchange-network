import React, { useState } from "react";
import axios from "axios";
import { ReportPostProps } from "../../data-types/datatypes";
import ErrorModal from "../components/ErrorModal";

export default function ReportPost(props: ReportPostProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Check if any field is empty
    if (!formData.get("reason")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      return;
    }

    const reason = formData.get("reason") as string;

    axios
      .put("http://localhost:3000/report-post", {
        postId: props.postId,
        reason: reason,
      })
      .then((res) => {
        alert("Post reported successfully!");
      })
      .catch((err) => {
        setError(err);
      });

    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        <span className="close" onClick={props.onClose}>
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
          <button type="submit" className="btn btn-danger">
            Report
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
