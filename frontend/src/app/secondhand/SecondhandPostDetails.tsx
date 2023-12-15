import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserProfile } from "../../data-types/datatypes";
import { SecondhandPost } from "../../data-types/posts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import DeletePostButton from "../components/DeletePostButton";
import EditPostButton from "../components/EditPostButton";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ReportPostButton from "../components/ReportPostButton";

export default function SecondHandPostDetails() {
  const [post, setPost] = useState<SecondhandPost>({} as SecondhandPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { profile } = useProfileContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/secondhand/secondhandpost/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (post.poster === profile.userID) {
      setPoster(profile);
    } else {
      axios
        .get(`http://localhost:3000/profile/profile/${post.poster}`)
        .then((res) => {
          setPoster(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [post]);

  return (
    <div className="outer-container">
      <Header />
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
              {post.poster == user._id ? (
                <>
                  <EditPostButton postId={"" + post._id} type="secondhand" />
                  <DeletePostButton
                    postId={"" + post._id}
                    profileId={"" + poster?._id}
                    type="secondhand"
                  />
                </>
              ) : (
                <ReportPostButton
                  postId={"" + post._id}
                  profileId={"" + poster?._id}
                  type="secondhand"
                />
              )}
            </div>
            <div className="postdetails-user-info-container">
              <div className="postdetails-username">
                <Link to={`/profile/` + poster?.userID}>
                  {poster?.username}
                </Link>
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
                  {" "}
                  {("" + poster?.createdAt).slice(0, 10)}
                </div>
              </div>
            </div>

            <div className="postdetails-details-container">
              <div className="postdetails-price">
                <p>{post.price}₺</p>
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
    </div>
  );
}
