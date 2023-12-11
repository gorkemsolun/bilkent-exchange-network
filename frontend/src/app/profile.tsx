import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Header from "../components/header.tsx";
import Navbar from "../components/navbar.tsx";
import { UserProfile } from "../data-types/datatypes.ts";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    // Replace with the data you get from the server
    username: "johndoe76",
    name: "John Doe",
    email: "johndoe@gmail.com",
    photo: "./src/assets/cs319.png",
    reputation: 432,
    bio: "CS 4/∞",
    registerDate: "2023-01-01",
  });

  useEffect(() => {
    // Fetch user profile data from the server
    axios
      .get("http://localhost:3000/user-profile") // Replace with your endpoint
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="w-screen h-screen">
      <Header />
      <Navbar />
      <div className="profileContainer">
        <div className="profileHeader">
          <img
            src={userProfile.photo}
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
              <p className="infoValue">{userProfile.registerDate}</p>
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
