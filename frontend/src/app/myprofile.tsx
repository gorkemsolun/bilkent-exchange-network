import axios from "axios";
import { useEffect, useState } from "react";
import { UserProfile } from "../data-types/datatypes.ts";
import { useAuthContext } from "./authentication/authHelpers.js";
import Header from "./components/header.tsx";
import Loader from "./components/loader.tsx";
import Navbar from "./components/navbar.tsx";

export default function MyProfile() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );

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

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div className="profileHeader">
            <img
              src={userProfile.image}
              className="profileImage"
              alt="Profile Image"
            />
            <div className="profileUserInfo">
              <p className="profileUsername">@{userProfile.username}</p>
            </div>
          </div>
          <div className="profileDetails">
            <div className="profileColumn">
              <div className="profileInfo">
                <p className="infoLabel">Description:</p>
                <p className="infoValue">{userProfile.description}</p>
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Email:</p>
                <p className="infoValue">{userProfile.email}</p>
              </div>

              <div className="profileInfo">
                <p className="infoLabel">Reputation:</p>
                <p className="infoValue">{userProfile.reputation}</p>
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Joined at:</p>
                <p className="infoValue">
                  {("" + userProfile.createdAt).slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
          <div className="profilePosts">
            <p className="statLabel">Posts</p>
          </div>
        </div>
      )}
    </div>
  );
}
