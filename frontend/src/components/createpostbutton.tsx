import { useState } from "react";
import CreateItem from "./createitem.tsx";

export default function CreatePostButton(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="create-post-button" onClick={handleCreatePost}>
        Create Post
      </button>
      {isModalOpen && (
        <CreateItem onClose={handleCloseModal} type={props.type} />
      )}
    </div>
  );
}
