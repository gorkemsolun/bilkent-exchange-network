import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  conversationUrl,
  defaultImage,
  defaultUserProfile,
  profileUrl,
} from "../../data-types/constants.ts";
import {
  Conversation,
  OwnPost,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes.ts";
import {
  deleteUser,
  useAuthContext,
  useLogout,
} from "../authentication/AuthHelpers.js";
import ErrorModal from "../components/ErrorModal.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import Messenger from "../message/Messenger.tsx";

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(defaultUserProfile);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const user = (useAuthContext() as unknown as UserContextType).user;
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);
  const { logout } = useLogout();
  const { id } = useParams();

  /**
   * Handles the click event for the messenger button.
   * Toggles the visibility of the messenger component.
   */
  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  /**
   * Handles the click event on the DM box.
   * Checks if there is an existing conversation with the user. If there isn't, creates a new conversation.
   * Updates the selected conversation and makes the messenger visible.
   */
  const handleDMBoxClick = () => {
    // Check if there is an existing conversation with that user, if there isn't create one
    axios.get(conversationUrl + "/userID/" + user?._id).then((res) => {
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

        axios.post(conversationUrl + "/", newConversation).catch((err) => {
          console.log(err);
          setError(err);
        });
      }
    });
    setIsMessengerVisible(true);
  };

  /**
   * Fetches the user profile data from the server and updates the state.
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${profileUrl}/${id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Removes the account from the database.
   * @async
   * @returns {Promise<void>}
   */
  const handleRemove = async () => {
    await deleteUser(user?._id as string);
    handleLogOut();
  };

  /**
   * Logs out the user before removing the account.
   * @returns {void}
   */
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
              <div className="">
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
                          >
                            <div className="profilePost w-full">
                              <div className="card-body">
                                <h2
                                  className="card-title"
                                  style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                  }}
                                >
                                  {post.typename + ":       "}
                                  {post.title}
                                </h2>
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
