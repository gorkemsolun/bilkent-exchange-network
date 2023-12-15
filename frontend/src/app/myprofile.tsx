import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OwnPost, UserProfile } from "../data-types/datatypes.ts";
import { useAuthContext, useLogout, deleteUser} from "./authentication/authHelpers.js";
import Header from "./components/header.tsx";
import Loader from "./components/loader.tsx";
import Navbar from "./components/navbar.tsx";

export default function MyProfile() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );

    // Remove account from database
    const handleRemove = async () => {
      await deleteUser(user._id); 
      handleLogOut(); 
    };

    // before remove, account is loged out
    const handleLogOut = () => {
      logout();
    };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
        console.log(`http://localhost:3000/profile/profile/${user._id}`);
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
          <Link to={"/myprofile/edit"}>
            <img
              src="./src/assets/editicon.png"
              className="profileEditIcon"
              title="Edit"
            />
          </Link>
          <Link to={"/login"}>
          <button
              type="button"
              className="btn btn-danger"
              onClick={handleRemove}
            >
              Remove Account 
          </button>
          </Link>
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
            <div className="justify-center">
              <div className="container">
                <div className="row">
                  { userProfile.ownPosts ? userProfile.ownPosts.map((post: OwnPost) => (
                    <div className="col-12 mb-4" key={post.id}>
                      <Link
                        to={
                          post.typename === "Forum"
                            ? `/forumpost/${post.id}`
                            : post.typename  === "Secondhand"
                            ? `/secondhandpost/${post.id}`
                            : post.typename  === "SectionExchange"
                            ? `/sectionexchange/${post.id}`
                            : post.typename === "Donate"
                            ? `/donatepost/${post.id}`
                            : post.typename  === "Borrow"
                            ? `/borrowpost/${post.id}`
                            : `/lostfoundpost/${post.id}`
                        }
                        className="col-12 cursor-pointer"
                        key={post.id}
                      >
                        <div className="card w-full">
                          <div className="card-body">
                            <h2
                              className="card-title"
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              {post.typename +":       "}
                              {post.title}
                                   
                            </h2>
                            <div
                              className="description-container"
                              style={{ height: "10%", textAlign: "left" }}
                            >
                              {post.typename === "SectionExchange" ? (
                                <p className="card-text">
                                 offered Course: {post.offeredCourse ? post.offeredCourse: null}, offered Section: {post.offeredSection ? post.offeredSection: null}, desired Course: {post.desiredCourse ? post.desiredCourse: null}, desired section: {post.desiredSection ? post.desiredSection: null}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )): null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}