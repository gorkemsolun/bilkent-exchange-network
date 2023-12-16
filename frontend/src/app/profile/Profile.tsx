import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultUserProfile, profileUrl } from "../../data-types/constants.ts";
import {
  Conversation,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes.ts";
import { useAuthContext } from "../authentication/AuthHelpers.ts";
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
  const { id } = useParams();
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);

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
            .then((res) => {
              // SUCCESFULLY CREATED CONVERSATION
            })
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
          <div className="profileHeader">
            <img
              src={userProfile?.image}
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
                  {("" + userProfile?.createdAt).slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
          <div className="profilePosts">
            <p className="statLabel">Posts</p>
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
