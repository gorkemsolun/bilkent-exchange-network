import React, { useState } from "react";
import "../App.css";
import { Post } from "../data-types/posttypes";

interface CreatePostProps {
  onClose: () => void;
  type: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose, type }) => {
  let product: Post = {
    id: "",
    title: "",
    description: "",
    category: "",
    price: "",
    poster: "",
    date: "",
    image: "",
    status: "",
    postType: type,
  };

  /*
  TODO: Add image to product
  TODO: Add category to product
  TODO: Add date to product
  TODO: Category should be selected from the list of categories
  TODO: Subcategory should be selected from the list of subcategories
  */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Retrieve values directly from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;

    // Update the product
    product.title = title;
    product.description = description;
    product.price = price;
    product.image = image;
    product.postType = type;

    console.log(product);

    // TODO: Send product data and image to server
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-form-group pt-4" style={{ textAlign: "left" }}>
          <label htmlFor="name">Title:</label>
          <input type="text" id="title" name="title" className="form-control" />
        </div>
        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            style={{ height: "15vh" }}
          />
        </div>
        {type == "secondhand" && (
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              className="form-control"
            />
          </div>
        )}
        {type != "forum" && type != "borrow" && (
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="jpg, jpeg, png"
              className="form-control"
            />
          </div>
        )}
        <div className="modal-form-group">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
