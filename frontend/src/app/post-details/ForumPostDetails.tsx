import { useEffect, useState } from "react";
import { ForumPost } from "../../data-types/posttypes";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { ForumEntry } from "../../data-types/datatypes";
import "../../App.css";

export default function ForumPostDetails() {
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
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

  return (
    <div className="w-screen h-screen">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forumpostdetails-container">
          <div className="forumpostdetails-first-entry-container">
            <div className="forumpostdetails-entry-top">
              <img
                src="/src/assets/cs319.png"
                className="forumpostdetails-profile-picture"
              />
              <div className="forumpostdetails-username">{"username"}</div>
              <div className="forumpostdetails-date">{"date"}</div>
            </div>

            <div className="forumpostdetails-title">{post.title}</div>

            <div className="forumpostdetails-entry">
              <div className="forumpostdetails-vote-container">
                <div className="forumpostdetails-vote-button">
                  <img src="/src/assets/upvote.jpeg" />
                </div>
                <div className="forumpostdetails-vote-score">{"0"}</div>
                <div className="forumpostdetails-vote-button">
                  <img src="/src/assets/downvote.jpeg" />
                </div>
              </div>
              {post.description}
            </div>
          </div>

          <div className="forumpostdetails-entries-container">
            {post.entries &&
              post.entries.map((entry: ForumEntry) => <p>{entry.content}</p>)}
          </div>
        </div>
      )}
    </div>
  );
}
