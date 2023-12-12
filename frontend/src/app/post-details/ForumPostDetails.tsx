import { useEffect, useState } from "react";
import { ForumPost } from "../../data-types/posttypes";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { ForumEntry } from "../../data-types/datatypes";
import "../../App.css";
import { useAuthContext } from "../authentication/authHelpers";

export default function ForumPostDetails() {
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const { user } = useAuthContext();
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

  console.log(user);

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
              <div className="forumpostdetails-date">{post.createdAt}</div>
            </div>

            <div className="forumpostdetails-title">{post.title}</div>

            <div className="forumpostdetails-entry">{post.description}</div>
          </div>

          <div className="forumpostdetails-entries-container">
            {post.entries &&
              post.entries.map((entry: ForumEntry) => (
                <div className="forumpostdetails-entry-container">
                  <div className="forumpostdetails-entry-top">
                    <img
                      src="/src/assets/cs319.png"
                      className="forumpostdetails-profile-picture"
                    />
                    <div className="forumpostdetails-username">{"doe123"}</div>
                    <div className="forumpostdetails-date">
                      {"123.123.12321312"}
                    </div>
                  </div>

                  <div className="forumpostdetails-entry">{entry.content}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
