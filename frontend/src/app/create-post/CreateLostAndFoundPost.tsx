import axios from "axios";
import { categories, urlsPost } from "../../data-types/constants";
import { CreatePostProps } from "../../data-types/datatypes";
import { LostFoundPost } from "../../data-types/posttypes";

export default function CreateLostAndFoundPost(props: CreatePostProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const post: LostFoundPost = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
      poster: "31", //  TODO: Change this to the actual user id
    };

    axios
      .post(urlsPost.lostfound, post)
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        console.log(err);
        // TODO ERROR MODAL
      });

    props.onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <form
        onSubmit={handleSubmit}
        className="create-item-form"
        style={{ width: "35vw" }}
      >
        <span className="close" onClick={props.onClose}>
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
              placeholder="Enter title"
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
          <label htmlFor="category">Category</label>
          <select id="category" name="category" className="form-control">
            {categories.lostfound.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
