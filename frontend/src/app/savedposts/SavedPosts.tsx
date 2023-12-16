import { Link } from "react-router-dom";
import { ProfileContextType, SavedPost } from "../../data-types/datatypes";
import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useProfileContext } from "../authentication/AuthHelpers";
import Messenger from "../message/Messenger";
import axios from "axios";

export default function SavedPosts() {
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const [loading, setLoading] = useState<boolean>(false);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleSaveButton = (post: SavedPost) => {
    // Post is saved, unsave
    if (
      profile.savedPosts.some(
        (savedPost: SavedPost) => savedPost.id === post.id
      )
    ) {
      const body = {
        profileID: profile?._id,
        savedPost: post,
      };

      axios
        .put("http://localhost:3000/profile/unsavepost", body)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      profile.savedPosts = profile.savedPosts.filter(
        (savedPost: SavedPost) => savedPost.id !== post.id
      );
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
      console.log(profile);
    } else {
      // Post is unsaved, save
      const body = {
        profileID: profile?._id,
        savedPost: post,
      };

      axios
        .put("http://localhost:3000/profile/savepost", body)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      const savedPost: SavedPost = {
        id: "" + post.id,
        typename: "Secondhand,",
        title: post.title,
      };

      profile.savedPosts.push(savedPost);
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    }
  };

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="justify-center">
          <label className="text-4xl font-bold">Saved Posts</label>
          <div className="container">
            <div className="row">
              {profile?.savedPosts
                ? profile.savedPosts.map((post: SavedPost) => (
                    <div className="col-12 mb-4" key={post.id}>
                      <div className="col-12 cursor-pointer" key={post.id}>
                        <div className="card w-full">
                          <div className="card-body">
                            <div className="post-save-container-forumtype">
                              {profile.savedPosts.some(
                                (savedPost: SavedPost) =>
                                  savedPost.id === post.id
                              ) ? (
                                <img
                                  src="/src/assets/saved.png"
                                  className="post-saved-icon"
                                  onClick={() => {
                                    handleSaveButton(post);
                                  }}
                                ></img>
                              ) : (
                                <img
                                  src="/src/assets/notsaved.png"
                                  className="post-notsaved-icon"
                                  onClick={() => {
                                    handleSaveButton(post);
                                  }}
                                ></img>
                              )}
                            </div>
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
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div
            className={`messenger-box ${
              isMessengerVisible ? "open" : "closed"
            }`}
          >
            <Messenger onClick={handleMessengerClick} />
          </div>
        </div>
      )}
    </div>
  );
}
