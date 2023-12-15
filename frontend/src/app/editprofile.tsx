import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserProfile } from "../data-types/datatypes.ts";
import { useAuthContext } from "./authentication/authHelpers.js";
import Header from "./components/header.tsx";
import Loader from "./components/loader.tsx";
import Navbar from "./components/navbar.tsx";
import { resizeImageFile } from "./fetchPostHelpers.ts";
import {defa}

export default function EditProfile() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(
    defaultUserProfile
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    userProfile.username = formData.get("username") as string;
    userProfile.description = formData.get("description") as string;
    const image = await resizeImageFile(formData.get("image") as File);
    //if no file is submitted then do not include image in the userProfile body
    if (image !== "data:application/octet-stream;base64,")
      userProfile.image = image;
    axios
      .put(`http://localhost:3000/profile/update-profile/`, userProfile)
      .then((res) => {
        console.log(res);
        console.log(userProfile);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
    setIsSubmitted(true);
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
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user._id]);

  if (isSubmitted) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <form className="profileContainer" onSubmit={handleSubmit}>
          <div className="editProfileHeader">
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
    </div>
  );
}
