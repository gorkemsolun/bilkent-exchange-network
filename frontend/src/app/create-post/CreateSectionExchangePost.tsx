import "../../App.css";
import { SectionexchangePost } from "../../data-types/posttypes";

export default function CreateSectionExchangePost({ onClose }) {
  const product: SectionexchangePost = {
    id: "",
    username: "",
    poster: "",
    date: "",
    offeredSection: "",
    desiredSection: "",
    offeredCourse: "",
    desiredCourse: "",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Retrieve values directly from the form data
    const offeredCourse = formData.get("offeredCourse") as string;
    const offeredSection = formData.get("offeredSection") as string;
    const desiredCourse = formData.get("desiredCourse") as string;
    const desiredSection = formData.get("desiredSection") as string;

    // Update the product
    product.offeredCourse = offeredCourse;
    product.offeredSection = offeredSection;
    product.desiredCourse = desiredCourse;
    product.desiredSection = desiredSection;

    console.log(product);

    // TODO: Send product data and image to server
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="create-item-form w-35vw">
        <span className="close" onClick={onClose}>
          &times;
        </span>

        <div>
          <div className="modal-form-group mt-8 text-left">
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
          <div className="modal-form-group text-left">
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

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
