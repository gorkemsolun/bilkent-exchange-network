import axios from "axios";
import { useState } from "react";
import { urlsGet } from "../../data-types/constants";
import {
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { SectionexchangePost } from "../../data-types/posts";
import { CreatePostProps } from "../../data-types/props";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";

export default function CreateSectionExchangePost(props: CreatePostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

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

    const post: SectionexchangePost = {
      offeredCourse: formData.get("offeredCourse") as string,
      offeredSection: formData.get("offeredSection") as string,
      desiredCourse: formData.get("desiredCourse") as string,
      desiredSection: formData.get("desiredSection") as string,
      poster: user?._id as string,
    };

    let postId;
    await axios
      .post(urlsPost.sectionexchange, post)
      .then((res) => {
        // TODO SUCCESFULLY SENT
        postId = res.data._id;
      })
      .catch((err) => {
        setError(err);
        setError("Could not create post");
      });
    const addToProfile = {
      id: postId,
      typename: "SectionExchange",
      title: "",
      offeredCourse: post.offeredCourse,
      offeredSection: post.offeredSection,
      desiredCourse: post.desiredCourse,
      desiredSection: post.desiredSection,
    };

    const profile = JSON.parse(localStorage.getItem("profile") as string);

    if (profile) {
      profile.ownPosts.push(addToProfile);
    }

    localStorage.setItem("profile", JSON.stringify(profile));
    profileDispatch({ type: "UPDATE", payload: profile });
    setLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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
