import React, { useState } from "react";
import "../App.css";

interface Product {
  name: string;
  description: string;
  price: number;
}

interface CreateItemProps {
  onClose: () => void;
  type: string;
}

const CreateItem: React.FC<CreateItemProps> = ({ onClose, type }) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
  });

  /*
  TODO: Add image to product
  TODO: Add category to product
  TODO: Add date to product
  TODO: Category should be selected from the list of categories
  TODO: Subcategory should be selected from the list of subcategories
  */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(product);
    // TODO: Send product data to server
    onClose(); // Close the modal after submission
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ height: "72vh", width: "35vw" }}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-form-group pt-4" style={{ textAlign: "left" }}>
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="modal-form-group" style={{ textAlign: "left" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
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
              value={product.price}
              onChange={handleChange}
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

export default CreateItem;
