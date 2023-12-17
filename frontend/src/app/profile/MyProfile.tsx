/**
 * Renders the user's profile page.
 * @returns The JSX element representing the user's profile page.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  defaultImage,
  defaultUserProfile,
} from "../../data-types/constants.ts";
import {
  OwnPost,
  ProfileContextType,
  UserProfile,
} from "../../data-types/datatypes.ts";
import { useProfileContext } from "../authentication/AuthHelpers.js";
import DeletePostButton from "../components/DeletePostButton.tsx";
import EditPostButton from "../components/EditPostButton.tsx";
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

  /**
   * useEffect hook to set the user profile and loading state.
   * @remarks
   * This hook is used to set the user profile and loading state in the component.
   * It is triggered only once when the component mounts.
   */
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
          <Link to={"/myprofile/edit"}>
            <img
              src="./src/assets/editicon.png"
              className="profileEditIcon"
              title="Edit"
            />
          </Link>
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
          <div className="profileDetails">
            <div className="profileColumn">
              <div className="profileInfo">
                <p className="infoLabel">Description:</p>
                <p className="infoValue profile-description">
                  {userProfile?.description}
                </p>
              </div>
              <div className="profileInfo">
                <p className="infoLabel">Email:</p>
                <p className="infoValue">{userProfile?.email}</p>
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
            <p className="profilePostsTitle">Posts</p>
            <div className="justify-center">
              <div className="">
                <div className="">
                  {userProfile?.ownPosts
                    ? userProfile.ownPosts.map((post: OwnPost) => (
                        <div className="col-12 mb-4" key={post.id}>
                          <div className="col-12 cursor-pointer">
                            <div className="profilePost w-full">
                              <div className="profilePostsContainer">
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
                                  className="card-title"
                                  style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                  }}
                                >
                                  {post.typename + ":       "}
                                  {post.title}
                                </Link>
                                <div className="profile-posts-edit-delete">
                                  <DeletePostButton
                                    postId={"" + post.id}
                                    profileId={"" + userProfile._id}
                                    type={post.typename}
                                    fromProfile={true}
                                  />
                                  <div className="profile-posts-edit-button">
                                    <EditPostButton
                                      postId={"" + post.id}
                                      type={post.typename.toLowerCase()}
                                      fromProfile={true}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className="description-container"
                                style={{ height: "10%", textAlign: "left" }}
                              >
                                {post.typename === "SectionExchange" ? (
                                  <p className="card-text">
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
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
