import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveUrl, unsaveUrl } from "../../data-types/constants";
import { ProfileContextType, SavedPost } from "../../data-types/datatypes";
import { useProfileContext } from "../authentication/AuthHelpers";
import ErrorModal from "../components/ErrorModal";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Messenger from "../message/Messenger";

export default function SavedPosts() {
  const [error, setError] = useState<string | null>(null);
  const [loading] = useState<boolean>(false);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;
  const profile = JSON.parse(localStorage.getItem("profile") as string);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
    console.log(profile);
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

      axios.put(unsaveUrl, body).catch((err) => {
        setError(err);
        console.log(err);
      });

      profile.savedPosts = profile.savedPosts.filter(
        (savedPost: SavedPost) => savedPost.id !== post.id
      );
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
          <label className="saved-post-title">Saved Posts</label>
          <div className="saved-posts-container">
            {profile?.savedPosts
              ? profile.savedPosts.map((post: SavedPost) => (
                  <div className="col-12 mb-4" key={post.id}>
                    <div className="profilePost w-full">
                      <div className="card-body">
                        <div className="saved-posts-save-icon">
                          {profile.savedPosts.some(
                            (savedPost: SavedPost) => savedPost.id === post.id
                          ) ? (
                            <img
                              src="/src/assets/saved.png"
                              className="post-saved-icon"
                              onClick={() => {
                                handleSaveButton(post);
                              }}
                              placeholder="Saved"
                              title="Unsave Post"
                            ></img>
                          ) : (
                            <img
                              src="/src/assets/notsaved.png"
                              className="post-notsaved-icon"
                              onClick={() => {
                                handleSaveButton(post);
                              }}
                              placeholder="Not Saved"
                              title="Save Post"
                            ></img>
                          )}
                        </div>
                        <Link
                          to={
                            post.typename === "forum"
                              ? `/forumpost/${post.id}`
                              : post.typename === "secondhand"
                              ? `/secondhandpost/${post.id}`
                              : post.typename === "sectionexchange"
                              ? `/saved-posts`
                              : post.typename === "donate"
                              ? `/donatepost/${post.id}`
                              : post.typename === "borrow"
                              ? `/borrowpost/${post.id}`
                              : `/lostfoundpost/${post.id}`
                          }
                          className="saved-post-title"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          {post.typename.charAt(0).toUpperCase() +
                            post.typename.slice(1) +
                            ":       "}
                          {post.title}
                        </Link>
                        <div
                          className="description-container"
                          style={{ height: "10%", textAlign: "left" }}
                        >
                          {post.typename === "SectionExchange" ? (
                            <p className="card-text">
                              offered Course:{" "}
                              {post.offeredCourse ? post.offeredCourse : null},
                              offered Section:{" "}
                              {post.offeredSection ? post.offeredSection : null}
                              , desired Course:{" "}
                              {post.desiredCourse ? post.desiredCourse : null},
                              desired section:{" "}
                              {post.desiredSection ? post.desiredSection : null}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
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
