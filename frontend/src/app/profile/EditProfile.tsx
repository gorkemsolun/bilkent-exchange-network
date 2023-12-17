import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultUserProfile, profileUrl } from "../../data-types/constants.ts";
import {
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes.ts";
import { isFileImage, resizeImageFile } from "../PostHelpers.ts";
import {
  deleteUser,
  useAuthContext,
  useLogout,
  useProfileContext,
} from "../authentication/AuthHelpers.js";
import ErrorModal from "../components/ErrorModal.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";

export default function EditProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const user = (useAuthContext() as unknown as UserContextType).user;
  const { logout } = useLogout();

  // Remove account from database
  const handleRemove = async () => {
    await deleteUser(user?._id as string);
    handleLogOut();
  };

  // before remove, account is loged out
  const handleLogOut = () => {
    logout();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!formData.get("username")) {
      setError("ALL INPUT FIELDS MUST BE SPECIFIED");
      setLoading(false);
      return;
    }

    userProfile.username = formData.get("username") as string;
    userProfile.description = formData.get("description") as string;
    //if no file is submitted then do not include image in the userProfile body
    if (isFileImage(formData.get("image") as File)) {
      userProfile.image = await resizeImageFile(formData.get("image") as File);
    }

    axios
      .put(`http://localhost:3000/profile/update-profile/`, userProfile)
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    profileDispatch({
      type: "UPDATE",
      payload: {
        email: userProfile.email,
        _id: userProfile.userID,
        token: user?.token as string,
      },
    });

    localStorage.setItem("profile", JSON.stringify(userProfile));

    setLoading(false);
    if (error === null || error === undefined) {
      setIsSubmitted(true);
    }
  };

  // Reset the form to the original values
  const handleReset = () => {
    const imageInput = document.getElementById("image") as HTMLInputElement;
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLTextAreaElement;

    if (imageInput && usernameInput && descriptionInput) {
      imageInput.value = "";
      usernameInput.value = userProfile.username;
      descriptionInput.value = userProfile.description;
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${profileUrl}/${user?._id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?._id]);

  if (isSubmitted) {
    window.location.href = "/myprofile"; // değiştirme
  }

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <form className="profileContainer" onSubmit={handleSubmit}>
          <div className="edit-profile-header">
            <p>{"Edit Profile"}</p>
          </div>
          <div className="profileDetails">
            <div className="profileColumn">
              <div className="profileInfo">
                <p className="infoLabel">Profile Picture</p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="jpg, jpeg, png"
                  className="form-control"
                  style={{ marginLeft: "5vw" }}
                  placeholder="Upload an image"
                />
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Username</p>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  style={{ marginLeft: "5vw" }}
                  defaultValue={userProfile.username}
                  placeholder="Enter username"
                />
              </div>
              <div className="profileInfo">
                <p className="infoLabel" style={{ alignSelf: "flex-start" }}>
                  Description
                </p>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  style={{ marginLeft: "5vw" }}
                  defaultValue={userProfile.description}
                  placeholder="Enter description"
                />
              </div>
              <div className="profileInfo">
                <p className="infoLabel" style={{ alignSelf: "flex-start" }}>
                  Remove Account
                </p>
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="btn btn-danger "
                    onClick={handleRemove}
                    style={{ marginLeft: "20px" }}
                  >
                    Remove Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="editProfileButtonContainer">
            <button type="submit" className="btn btn-primary">
              Submit Changes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      )}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
