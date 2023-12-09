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
    offeredSection: "",
    desiredSection: "",
    offeredCourse: "",
    desiredCourse: "",
    postType: type,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Retrieve values directly from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const offeredCourse = formData.get("offeredCourse") as string;
    const offeredSection = formData.get("offeredSection") as string;
    const desiredCourse = formData.get("desiredCourse") as string;
    const desiredSection = formData.get("desiredSection") as string;

    // Update the product
    product.title = title;
    product.description = description;
    product.price = price;
    product.image = image;
    product.category = category;
    product.status = status;
    product.offeredCourse = offeredCourse;
    product.offeredSection = offeredSection;
    product.desiredCourse = desiredCourse;
    product.desiredSection = desiredSection;
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

        {type != "sectionexchange" && (
          <div>
            <div
              className="modal-form-group pt-4"
              style={{ textAlign: "left" }}
            >
              <label htmlFor="name">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
              />
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
          </div>
        )}

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
        {type != "forum" && type != "sectionexchange" && (
          <div className="modal-form-group" style={{ textAlign: "left" }}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="form-control">
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
              <option value="Home">Lecture Materials</option>
              <option value="Home">Clothes</option>
              <option value="Home">Hobbies</option>
              <option value="Home">Other</option>
            </select>
          </div>
        )}

        {type != "forum" && type != "borrow" && type != "sectionexchange" && (
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

        {type == "lostandfound" && (
          <div className="modal-form-group">
            <div className="flex justify-center">
              <div className="mx-2">
                <input
                  type="radio"
                  id="lost"
                  name="status"
                  value="lost"
                  defaultChecked
                />
                <label htmlFor="lost" className="ml-2">
                  Lost
                </label>
              </div>
              <div className="mx-2">
                <input type="radio" id="found" name="status" value="found" />
                <label htmlFor="found" className="ml-2">
                  Found
                </label>
              </div>
            </div>
          </div>
        )}

        {type == "sectionexchange" && (
          <div>
            <div
              className="modal-form-group mt-6"
              style={{ textAlign: "left" }}
            >
              <div className="flex justify-center ">
                <div className="mx-4">
                  <label htmlFor="offeredCourse">Offered Course</label>
                  <input
                    type="text"
                    id="offeredCourse"
                    name="offeredCourse"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="offeredSection">Offered Section</label>
                  <input
                    type="text"
                    id="offeredSection"
                    name="offeredSection"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-form-group" style={{ textAlign: "left" }}>
              <div className="flex justify-center ">
                <div className="mx-4">
                  <label htmlFor="desiredCourse">Desired Course</label>
                  <input
                    type="text"
                    id="desiredCourse"
                    name="desiredCourse"
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="desiredSection">Desired Section</label>
                  <input
                    type="text"
                    id="desiredSection"
                    name="desiredSection"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
