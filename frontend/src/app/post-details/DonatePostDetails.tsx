import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DonatePost } from "../../data-types/posttypes";
import "../../App.css";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Loader from "../components/loader";

export default function DonatePostDetails() {
  // TODO: pull user info from backend and put it into the user-info container
  const [post, setPost] = useState<DonatePost>({} as DonatePost);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/donate/donatepost/${id}`)
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
        <div className="postdetails-container">
          <div className="postdetails-left-container">
            <div className="postdetails-title">{post.title}</div>
            <div className="postdetails-image">
              <img src={post.image} alt={post.title} />
            </div>
          </div>

          <div className="postdetails-right-container">
            <div className="postdetails-user-info-container">
              <div className="postdetails-username">
                <Link to={`/profile`}>{"johndoe"}</Link>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Reputation:</div>
                <div className="postdetails-user-info-value"> {"213"}</div>
              </div>
              <div className="postdetails-user-info">
                <div className="postdetails-user-info-label"> Joined At:</div>
                <div className="postdetails-user-info-value">{"1.1.2012"}</div>
              </div>
            </div>

            <div className="postdetails-details-container">
              <div className="postdetails-description">
                <p>{post.description}</p>
              </div>
              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Category:</div>
                <div className="postdetails-details-info-item">
                  {" "}
                  {post.category}
                </div>
              </div>

              <div className="postdetails-details-info">
                <div className="postdetails-details-info-label">Date:</div>
                <div className="postdetails-details-info-item">
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
