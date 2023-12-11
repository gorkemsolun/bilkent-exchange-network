import { LostFoundPost } from "../../data-types/posttypes";
import "../../App.css";

export default function CreateLostAndFoundPost({ onClose }) {
  const product: LostFoundPost = {
    id: "",
    title: "",
    description: "",
    category: "",
    poster: "",
    date: "",
    image: "",
    status: "",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Retrieve values directly from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;

    // Update the product
    product.title = title;
    product.description = description;
    product.image = image;
    product.category = category;
    product.status = status;

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

        <div>
          <div className="modal-form-group pt-4" style={{ textAlign: "left" }}>
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

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
