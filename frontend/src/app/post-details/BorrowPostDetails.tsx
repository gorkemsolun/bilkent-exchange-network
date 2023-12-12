import { useEffect, useState } from "react";
import { BorrowPost } from "../../data-types/posttypes";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import Header from "../components/header";
import Navbar from "../components/navbar";

export default function BorrowPostDetails() {
  const [post, setPost] = useState<BorrowPost>({} as BorrowPost);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/borrow/borrowpost/${id}`)
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
    <div className="outer-container">
      <Header />
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
