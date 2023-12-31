import { useState } from "react";
import { ReportPostButtonProps } from "../../data-types/props";
import ReportPost from "./ReportPost";

export default function ReportPostButton(props: ReportPostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the action of reporting a post.
   */
  function handleReportPost(): void {
    setIsModalOpen(true);
  }

  /**
   * Handles the action of closing the report modal.
   */
  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button
        className="btn btn-dark ml-2"
        onClick={handleReportPost}
        type="button"
      >
        Report
      </button>
      {isModalOpen && (
        <ReportPost
          postId={props.postId}
          profileId={props.profileId}
          type={props.type}
          onClose={handleCloseModal}
          title={props.title}
        />
      )}
    </div>
  );
}
