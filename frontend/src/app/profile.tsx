import axios from "axios";
import { useEffect, useState } from "react";
import { UserProfile } from "../data-types/datatypes.ts";
import Header from "./components/header.tsx";
import Navbar from "./components/navbar.tsx";
import { useAuthContext } from "./authentication/authHelpers.js";

export default function UserProfile() {
  const {user} = useAuthContext()
  const date = new Date(Date.now());
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userID: "0",
    username: "huy",
    email: "sikibidi",
    name: "toilet",
    image: "",
    bio: "DESCRİPTİON",
    reputation: 10,
    JoinedAt: date,
    ownPosts: [""],
    savedPosts: [""],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        console.log(res.data)
        setUserProfile(res.data);
        console.log(userProfile.username)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
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
              <p className="infoLabel">Bio:</p>
              <p className="infoValue">{userProfile.bio}</p>
            </div>
            <div className="profileInfo">
              <p className="infoLabel">Name:</p>
              <p className="infoValue">{userProfile.name}</p>
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
              <p className="infoValue"></p>
            </div>
          </div>
        </div>
        <div className="profilePosts">
          <p className="statLabel">Posts</p>
        </div>
      </div>
    </div>
  );
}
