import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ReportPostProps } from "../../data-types/datatypes";

export default function ReportPost(props: ReportPostProps) {
    const [isDeleted, setIsReported] = useState(false);

     const handleReport = async () => {
        try {
        // Make a request to report the post with the provided reason
        const response = await axios.post("http://localhost:3000/report-post", {
            postId: props.postId,
            reason: props.reason,
        });

        alert(response.data);
        setIsReported(true);
        } catch (error) {
        console.error("Error reporting post:", error);
        }
  };

  const handleCancel = () => {
    props.onClose();
  };
  
    if (isDeleted) {
      return <Navigate to="/myprofile" />;
    }
  
    return (
        <div className="modal-overlay">
          <div className="report-post-modal-body">
            <label>Report Post</label>
            <div>
              <p>Please provide a reason for reporting this post:</p>
              <textarea
                rows={4}
                value={props.reason}
                onChange={(e) => props.onReasonChange(e.target.value)}
              />
            </div>
            <div className="reportPostButtonContainer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleReport}
              >
                Report
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
}
