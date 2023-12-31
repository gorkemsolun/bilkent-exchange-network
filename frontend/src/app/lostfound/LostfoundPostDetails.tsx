import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  conversationUrl,
  lostfoundUrl,
  profileUrl,
} from "../../data-types/constants";
import {
  Conversation,
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes";
import { LostFoundPost } from "../../data-types/posts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import DeletePostButton from "../components/DeletePostButton";
import EditPostButton from "../components/EditPostButton";
import ErrorModal from "../components/ErrorModal";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ReportPostButton from "../components/ReportPostButton";
import Messenger from "../message/Messenger";

export default function LostFoundPostDetails() {
  const [post, setPost] = useState<LostFoundPost>({} as LostFoundPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;

  /**
   * Toggles the visibility of the messenger.
   */
  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  /**
   * Handles the click event on the DM box.
   * Checks if there is an existing conversation with the user, and creates one if there isn't.
   * Updates the selected conversation and displays the messenger.
   */
  const handleDMBoxClick = () => {
    // Check if there is an existing conversation with that user, if there isn't create one
    axios.get(conversationUrl + "/userID/" + user?._id).then((res) => {
      const conversation = res.data.find((conv: Conversation) => {
        return (
          conv.userIDs.includes("" + user?._id) &&
          conv.userIDs.includes("" + poster.userID)
        );
      });

      if (conversation) {
        conversation.username = poster?.username;
        setSelectedConversation(conversation);
      } else {
        const newConversation: Conversation = {
          userIDs: ["" + user?._id, "" + poster?.userID],
          messages: [],
          username: poster?.username,
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
   * Fetches the details of a lost/found post from the server.
   *
   * @param {number} id - The ID of the post to fetch.
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${lostfoundUrl}/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  /**
   * Fetches the poster information for the given post.
   * If the post's poster is the same as the current user's profile, sets the poster as the current user's profile.
   * Otherwise, makes an API request to fetch the poster's profile information.
   * Sets the fetched poster information or error state accordingly.
   *
   * @param {object} post - The post object.
   * @param {object} profile - The current user's profile object.
   */
  useEffect(() => {
    if (post.poster === profile?.userID) {
      setPoster(profile);
    } else {
      axios
        .get(`${profileUrl}/${post.poster}`)
        .then((res) => {
          setPoster(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, [post, profile]);

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="postdetails-container">
          <div className="postdetails-left-container">
            <div className="postdetails-title">{post.title}</div>
            <div className="postdetails-image">
              <img src={post.image} alt={post.title} />
            </div>
          </div>

          <div className="postdetails-right-container">
            <div className="postdetails-edit-delete-container">
              {post.poster == user?._id ? (
                <>
                  <EditPostButton postId={"" + post._id} type="lostfound" />
                  <DeletePostButton
                    postId={"" + post._id}
                    profileId={"" + poster?._id}
                    type="lostfound"
                  />
                </>
              ) : (
                <ReportPostButton
                  postId={"" + post._id}
                  profileId={"" + poster}
                  type="lostfound"
                  title={post.title}
                />
              )}
            </div>
            <div className="postdetails-user-info-container">
              <div className="postdetails-username-dmbox">
                <Link to={`/profile/` + poster?.userID} className="link">
                  {poster?.username}
                </Link>
                <div className="postdetails-dmbox-container">
                  <img
                    className="img-fluid mx-auto d-block max-w-4vw max-h-4vh"
                    src="/src/assets/dmbox.png"
                    alt="DM Box"
                    title="Send DM"
                    onClick={handleDMBoxClick}
                  />
                </div>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Reputation:</div>
                <div className="postdetails-user-info-value">
                  {" "}
                  {poster?.reputation}
                </div>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Joined At:</div>
                <div className="postdetails-user-info-value">
                  {("" + poster?.createdAt).slice(0, 10)}
                </div>
              </div>
            </div>

            <div className="postdetails-details-container">
              <div className="postdetails-status">
                <p>{post.status}</p>
              </div>
              <div className="postdetails-description">
                <p>{post.description}</p>
              </div>
              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Category:</div>
                <div className="postdetails-details-info-value">
                  {" "}
                  {post.category}
                </div>
              </div>

              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Date:</div>
                <div className="postdetails-details-info-value">
                  {("" + post.createdAt).slice(0, 10)}
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
