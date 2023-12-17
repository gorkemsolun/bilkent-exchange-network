import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  defaultImage,
  defaultUserProfile,
  profileUrl,
} from "../../data-types/constants.ts";
import {
  Conversation,
  UserContextType,
  UserProfile,
  OwnPost,
} from "../../data-types/datatypes.ts";
import {
  deleteUser,
  useAuthContext,
  useLogout,
} from "../authentication/AuthHelpers.js";
import Messenger from "../message/Messenger.tsx";
import Header from "../components/Header.tsx";
import Navbar from "../components/Navbar.tsx";
import Loader from "../components/Loader.tsx";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const { id } = useParams();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);
  const { logout } = useLogout();
  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleDMBoxClick = () => {
    // Check if there is an existing conversation with that user, if there isn't create one
    axios
      .get(
        "http://localhost:3000/conversation/conversation/userID/" + user?._id
      )
      .then((res) => {
        const conversation = res.data.find((conv: Conversation) => {
          return (
            conv.userIDs.includes("" + user?._id) &&
            conv.userIDs.includes(userProfile?.userID)
          );
        });

        if (conversation) {
          conversation.username = userProfile?.username;
          setSelectedConversation(conversation);
        } else {
          const newConversation: Conversation = {
            userIDs: ["" + user?._id, userProfile?.userID],
            messages: [],
            username: userProfile?.username,
          };
          setSelectedConversation(newConversation);

          axios
            .post(
              "http://localhost:3000/conversation/conversation/",
              newConversation
            )
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
      });
    setIsMessengerVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${profileUrl}/${id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Remove account from database
  const handleRemove = async () => {
    await deleteUser(user?._id as string);
    handleLogOut();
  };

  // before remove, account is loged out
  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div className="profileDMBoxContainer">
            <img
              className="img-fluid mx-auto d-block max-w-4vw max-h-4vh"
              src="/src/assets/dmbox.png"
              alt="DM Box"
              title="Send DM"
              onClick={handleDMBoxClick}
            />
          </div>
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
                  {("" + userProfile?.createdAt).slice(0, 10)}
                </p>
              </div>

              {user?.isAdmin === true && (
                <button onClick={handleRemove}>Kick User</button>
              )}
            </div>
          </div>
          <div className="profilePosts">
            <p className="profilePostsTitle">Posts</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`messenger-box ${isMessengerVisible ? "open" : "closed"}`}
      >
        <Messenger
          onClick={handleMessengerClick}
          selectedConversation={selectedConversation}
        />
      </div>
    </div>
  );
}
