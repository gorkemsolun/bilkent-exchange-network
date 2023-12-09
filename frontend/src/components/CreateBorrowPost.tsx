import "../App.css";
import { BorrowPost } from "../data-types/posttypes";

interface CreateBorrowPostProps {
  onClose: () => void;
}

const CreateBorrowPost: React.FC<CreateBorrowPostProps> = ({ onClose }) => {
  let product: BorrowPost = {
    id: "",
    title: "",
    description: "",
    category: "",
    poster: "",
    date: "",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Retrieve values directly from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    // Update the product
    product.title = title;
    product.description = description;
    product.category = category;

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

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBorrowPost;
