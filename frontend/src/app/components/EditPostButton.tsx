/**
 * Renders a button that allows the user to edit a post.
 * @param {EditPostButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
import { useState } from "react";
import { EditPostButtonProps } from "../../data-types/props";
import EditBorrowPost from "../borrow/EditBorrowPost";
import EditDonatePost from "../donate/EditDonatePost";
import EditForumPost from "../forum/EditForumPost";
import EditLostAndFoundPost from "../lostfound/EditLostfoundPost";
import EditSecondHandPost from "../secondhand/EditSecondhandPost";
import EditSectionExchangePost from "../sectionexchange/EditSectionexchangePost";

export default function EditPostButton(props: EditPostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Handles the edit post action.
   */
  function handleEditPost(): void {
    setIsModalOpen(true);
  }

  /**
   * Handles the close modal action.
   */
  function handleCloseModal(): void {
    setIsModalOpen(false);
  }

  return (
    <div>
      <button className="btn btn-info" onClick={handleEditPost} type="button">
        Edit
      </button>
      {isModalOpen && props.type == "secondhand" && (
        <EditSecondHandPost
          onClose={handleCloseModal}
          postId={props.postId}
          fromProfile={props.fromProfile}
        />
      )}
      {isModalOpen && props.type == "lostfound" && (
        <EditLostAndFoundPost
          onClose={handleCloseModal}
          postId={props.postId}
        />
      )}
      {isModalOpen && props.type == "donate" && (
        <EditDonatePost
          onClose={handleCloseModal}
          postId={props.postId}
          fromProfile={props.fromProfile}
        />
      )}
      {isModalOpen && props.type == "borrow" && (
        <EditBorrowPost
          onClose={handleCloseModal}
          postId={props.postId}
          fromProfile={props.fromProfile}
        />
      )}
      {isModalOpen && props.type == "sectionexchange" && (
        <EditSectionExchangePost
          onClose={handleCloseModal}
          postId={props.postId}
          fromProfile={props.fromProfile}
        />
      )}
      {isModalOpen && props.type == "forum" && (
        <EditForumPost
          onClose={handleCloseModal}
          postId={props.postId}
          fromProfile={props.fromProfile}
        />
      )}
    </div>
  );
}
