import axios from "axios";
import { useEffect, useState } from "react";
import { sectionexchangeUrl } from "../../data-types/constants";
import {
  OwnPost,
  ProfileContextType,
  UserContextType,
} from "../../data-types/datatypes";
import { SectionexchangePost } from "../../data-types/posts";
import { EditPostProps } from "../../data-types/props";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";

export default function EditSectionExchangePost(props: EditPostProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<SectionexchangePost>(
    {} as SectionexchangePost
  );
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const user = (useAuthContext() as unknown as UserContextType).user;

  useEffect(() => {
    axios
      .get(`${sectionexchangeUrl}/${props.postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [props]);

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

    if (
      formData.get("offeredCourse") === formData.get("desiredCourse") &&
      formData.get("offeredSection") === formData.get("desiredSection")
    ) {
      setError("CANNOT OFFER AND DESIRE THE SAME COURSE");
      setLoading(false);
      return;
    }

    if (
      Number(formData.get("offeredSection")) <= 0 ||
      Number(formData.get("desiredSection")) <= 0
    ) {
      setError("INVALID SECTION NUMBER");
      setLoading(false);
      return;
    }

    const editedPost: SectionexchangePost = {
      offeredCourse: formData.get("offeredCourse") as string,
      offeredSection: formData.get("offeredSection") as string,
      desiredCourse: formData.get("desiredCourse") as string,
      desiredSection: formData.get("desiredSection") as string,
      poster: user?._id as string,
    };

    await axios
      .put(`${sectionexchangeUrl}/${props.postId}`, editedPost)
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    const profile = JSON.parse(localStorage.getItem("profile") as string);

    let index;
    if (profile) {
      index = profile.ownPosts.findIndex(
        (post: OwnPost) => post.id === props.postId
      );
    }
    if (index) {
      profile.ownPosts[index].offeredCourse = editedPost.offeredCourse;
      profile.ownPosts[index].offeredSection = editedPost.offeredSection;
      profile.ownPosts[index].desiredCourse = editedPost.desiredCourse;
      profile.ownPosts[index].desiredSection = editedPost.desiredSection;
    }
    localStorage.setItem("profile", JSON.stringify(profile));
    profileDispatch({ type: "UPDATE", payload: profile });

    setLoading(false);
    if (error === null || error === undefined) {
      setIsEdited(true);
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="create-item-form w-35vw">
        {loading && <Loader />}
        <span className="close" onClick={props.onClose}>
          &times;
        </span>
        {isEdited ? (
          <SuccessModal />
        ) : (
          <>
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
          </>
        )}
      </form>
    </div>
  );
}
