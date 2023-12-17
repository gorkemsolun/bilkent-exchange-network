import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  borrowUrl,
  conversationUrl,
  profileUrl,
} from "../../data-types/constants";
import {
  Conversation,
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posts";
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

export default function BorrowPostDetails() {
  const [post, setPost] = useState<BorrowPost>({} as BorrowPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>({} as Conversation);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

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
          setError(err);
          console.log(err);
        });
      }
    });
    setIsMessengerVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${borrowUrl}/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    if (post.poster === profile?.userID) {
      setPoster(profile);
    } else {
      axios
        .get(`${profileUrl}/${post.poster}`)
        .then((res) => {
          setPoster(res.data.profile);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
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
            <div className="postdetails-borrow-description">
              <p>{post.description}</p>
            </div>
          </div>

          <div className="postdetails-right-container">
            <div className="postdetails-edit-delete-container">
              {post.poster === user?._id ? (
                <>
                  <EditPostButton postId={"" + post._id} type="borrow" />
                  <DeletePostButton
                    postId={"" + post._id}
                    profileId={"" + poster?._id}
                    type="borrow"
                  />
                </>
              ) : (
                <ReportPostButton
                  postId={"" + post._id}
                  profileId={"" + poster?._id}
                  type="borrow"
                  title={post.title}
                />
              )}
            </div>
            <div className="postdetails-user-info-container">
              <div className="postdetails-username-dmbox">
                <Link to={`/profile/` + poster?.userID}>
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
