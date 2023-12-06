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
      <div className="modal-header"></div>
      <form onSubmit={handleSubmit} className="create-item-form">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-form-group pt-4">
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
        <div className="modal-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {type == "secondhand" && (
          <div className="modal-form-group">
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
          <div className="modal-form-group">
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
