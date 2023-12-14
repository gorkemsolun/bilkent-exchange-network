import { useState } from "react";
import { EditPostButtonProps } from "../../data-types/datatypes";
import EditBorrowPost from "./EditBorrowPost";
import EditDonatePost from "./EditDonatePost";
import EditForumPost from "./EditForumPost";
import EditLostAndFoundPost from "./EditLostAndFoundPost";
import EditSecondHandPost from "./EditSecondHandPost";
import EditSectionExchangePost from "./EditSectionExchangePost";

export default function EditPostButton(props: EditPostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleEditPost(): void {
    setIsModalOpen(true);
  }

  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button className="btn btn-info" onClick={handleEditPost} type="button">
        Edit Post
      </button>
      {isModalOpen && props.type == "secondhand" && (
        <EditSecondHandPost onClose={handleCloseModal} postId={props.postId} />
      )}
      {isModalOpen && props.type == "lostandfound" && (
        <EditLostAndFoundPost
          onClose={handleCloseModal}
          postId={props.postId}
        />
      )}
      {isModalOpen && props.type == "donate" && (
        <EditDonatePost onClose={handleCloseModal} postId={props.postId} />
      )}
      {isModalOpen && props.type == "borrow" && (
        <EditBorrowPost onClose={handleCloseModal} postId={props.postId} />
      )}
      {isModalOpen && props.type == "sectionexchange" && (
        <EditSectionExchangePost
          onClose={handleCloseModal}
          postId={props.postId}
        />
      )}
      {isModalOpen && props.type == "forum" && (
        <EditForumPost onClose={handleCloseModal} postId={props.postId} />
      )}
    </div>
  );
}
