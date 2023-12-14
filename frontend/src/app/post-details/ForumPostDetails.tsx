import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ForumEntry, UserProfile } from "../../data-types/datatypes";
import { ForumPost } from "../../data-types/posttypes";
import Header from "../components/header";
import Loader from "../components/loader";
import Navbar from "../components/navbar";

export default function ForumPostDetails() {
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/forum/forumpost/${id}`)
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
    axios
      .get(`http://localhost:3000/profile/profile/${post.poster}`)
      .then((res) => {
        setPoster(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [post]);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forumpostdetails-container">
          <div className="forumpostdetails-first-entry-container">
            <div className="forumpostdetails-entry-top">
              <img
                src={poster?.image}
                className="forumpostdetails-profile-picture"
                title="Profile Picture"
              />
              <div className="forumpostdetails-username">
                <Link to={`/profile/` + poster?.userID}>
                  {poster?.username}
                </Link>
              </div>
              <div className="forumpostdetails-date">
                {("" + post.createdAt).slice(11, 16) +
                  " " +
                  ("" + post.createdAt).slice(0, 10)}
              </div>
            </div>

            <div className="forumpostdetails-title">{post.title}</div>

            <div className="forumpostdetails-entry-content">
              {post.description}
            </div>
          </div>

          <div className="forumpostdetails-entries-container">
            {post.entries &&
              post.entries.map((entry: ForumEntry) => (
                <div className="forumpostdetails-entry-container">
                  <div className="forumpostdetails-entry-top">
                    <img
                      src="/src/assets/cs319.png"
                      className="forumpostdetails-profile-picture"
                      title="Profile Picture"
                    />
                    <div className="forumpostdetails-username">{"doe123"}</div>
                    <div className="forumpostdetails-date">
                      {entry.createdAt.slice(11, 16) +
                        " " +
                        entry.createdAt.slice(0, 10)}
                    </div>
                  </div>

                  <div className="forumpostdetails-entry-content">
                    {entry.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
