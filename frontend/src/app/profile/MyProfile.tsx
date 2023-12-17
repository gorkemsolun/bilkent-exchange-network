import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  defaultImage,
  defaultUserProfile,
} from "../../data-types/constants.ts";
import {
  OwnPost,
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes.ts";
import {
  deleteUser,
  useAuthContext,
  useLogout,
  useProfileContext,
} from "../authentication/AuthHelpers.js";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";

export default function MyProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    defaultUserProfile
  );
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;
  const user = (useAuthContext() as unknown as UserContextType).user;

  useEffect(() => {
    setLoading(true);
    setUserProfile(profile);
    setLoading(false);
    // Is there any reason to not to have a dependency? Because it wont work without it
  }, []);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div className="profile-header">
            <img
              src={userProfile?.image || defaultImage}
              className="profileImage"
              alt="Profile Image"
            />
            <div className="profileUserInfo">
              <p className="profileUsername">@{userProfile?.username}</p>
            </div>
          </div>
          <Link to={"/myprofile/edit"}>
            <img
              src="./src/assets/editicon.png"
              className="profileEditIcon"
              title="Edit"
            />
          </Link>
          <div className="profileDetails">
            <div className="profileColumn">
              <div className="profileInfo">
                <p className="infoLabel">Description:</p>
                <p className="infoValue">{userProfile?.description}</p>
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Email:</p>
                <p className="infoValue">{userProfile?.email}</p>
              </div>

              <div className="profileInfo">
                <p className="infoLabel">Reputation:</p>
                <p className="infoValue">{userProfile?.reputation}</p>
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Joined at:</p>
                <p className="infoValue">
                  {String(userProfile?.createdAt).slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
          <div className="profilePosts">
            <p className="statLabel">Posts</p>
            <div className="justify-center">
              <div className="container">
                <div className="row">
                  {userProfile?.ownPosts
                    ? userProfile.ownPosts.map((post: OwnPost) => (
                        <div className="col-12 mb-4" key={post.id}>
                          <Link
                            to={
                              post.typename === "Forum"
                                ? `/forumpost/${post.id}`
                                : post.typename === "Secondhand"
                                ? `/secondhandpost/${post.id}`
                                : post.typename === "SectionExchange"
                                ? `/sectionexchange/${post.id}`
                                : post.typename === "Donate"
                                ? `/donatepost/${post.id}`
                                : post.typename === "Borrow"
                                ? `/borrowpost/${post.id}`
                                : `/lostfoundpost/${post.id}`
                            }
                            className="col-12 cursor-pointer"
                            key={post.id}
                          >
                            <div className="card w-full" key={post.id}>
                              <div className="card-body" key={post.id}>
                                <h2
                                  className="card-title"
                                  style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                  }}
                                  key={post.id}
                                >
                                  {post.typename + ":       "}
                                  {post.title}
                                </h2>
                                <div
                                  className="description-container"
                                  key={post.id}
                                  style={{ height: "10%", textAlign: "left" }}
                                >
                                  {post.typename === "SectionExchange" ? (
                                    <p className="card-text" key={post.id}>
                                      offered Course:{" "}
                                      {post.offeredCourse
                                        ? post.offeredCourse
                                        : null}
                                      , offered Section:{" "}
                                      {post.offeredSection
                                        ? post.offeredSection
                                        : null}
                                      , desired Course:{" "}
                                      {post.desiredCourse
                                        ? post.desiredCourse
                                        : null}
                                      , desired section:{" "}
                                      {post.desiredSection
                                        ? post.desiredSection
                                        : null}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    : null}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={makeAdmin}
                  >
                    Admin/DeAdmin the Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
