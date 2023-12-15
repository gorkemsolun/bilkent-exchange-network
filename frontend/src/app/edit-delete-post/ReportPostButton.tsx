import { useState } from "react";
import ReportPost from "./ReportPost";
import { ReportPostButtonProps } from "../../data-types/datatypes";

export default function ReportPostButton(props: ReportPostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleReportPost(): void {
    setIsModalOpen(true);
  }

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
          onClose={handleCloseModal}
          postId={props.postId}
          profileId={props.profileId}
          type={props.type}
        />
      )}
    </div>
  );
}
