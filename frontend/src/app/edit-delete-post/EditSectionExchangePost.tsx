import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EditPostProps } from "../../data-types/datatypes";
import { SectionexchangePost } from "../../data-types/posttypes";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/authHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/loader";

export default function EditSectionExchangePost(props: EditPostProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<SectionexchangePost>(
    {} as SectionexchangePost
  );
  const [isEdited, setIsEdited] = useState(false);
  const { profileDispatch } = useProfileContext();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/sectionexchange/sectionexchangepost/${props.postId}`
      )
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [props]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Check for errors here
    {
      // Check if any field is empty
      if (
        !formData.get("offeredCourse") ||
        !formData.get("offeredSection") ||
        !formData.get("desiredCourse") ||
        !formData.get("desiredSection")
      ) {
        setError("ALL INPUT FIELDS MUST BE SPECIFIED");
        setLoading(false);
        return;
      }
    }

    const editedPost: SectionexchangePost = {
      offeredCourse: formData.get("offeredCourse") as string,
      offeredSection: formData.get("offeredSection") as string,
      desiredCourse: formData.get("desiredCourse") as string,
      desiredSection: formData.get("desiredSection") as string,
      poster: user._id,
    };

    await axios
      .put(
        `http://localhost:3000/sectionexchange/sectionexchangepost/${props.postId}`,
        editedPost
      )
      .then((res) => {
        // TODO SUCCESFULLY SENT
      })
      .catch((err) => {
        setError(err);
      });
    await axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        console.log(res.data.profile);
        profileDispatch({ type: "UPDATE", payload: res.data.profile });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //
      });

    setLoading(false);
    setIsEdited(true);
  };

  if (isEdited) {
    window.location.reload();
  }

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="create-item-form w-35vw">
        {loading && <Loader />}
        <span className="close" onClick={props.onClose}>
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
                  defaultValue={post.offeredCourse}
                />
              </div>
              <div>
                <label htmlFor="offeredSection">Offered Section</label>
                <input
                  type="text"
                  id="offeredSection"
                  name="offeredSection"
                  className="form-control"
                  defaultValue={post.offeredSection}
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
                  defaultValue={post.desiredCourse}
                />
              </div>
              <div>
                <label htmlFor="desiredSection">Desired Section</label>
                <input
                  type="text"
                  id="desiredSection"
                  name="desiredSection"
                  className="form-control"
                  defaultValue={post.desiredSection}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Edit Post
          </button>
        </div>
        {error && (
          <ErrorModal
            message={error}
            onClose={() => {
              setError(null);
            }}
          />
        )}
      </form>
    </div>
  );
}
