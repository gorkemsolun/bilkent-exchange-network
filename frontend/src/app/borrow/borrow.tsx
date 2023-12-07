import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import Categories from "../../components/categories";
import CreatePostButton from "../../components/createpostbutton";
import SearchBar from "../../components/searchbar";
import { BorrowPost } from "../../data-types/posttypes";

export default function Borrow() {
  const [borrowPosts, setBorrowPosts] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    axios
      .get("http://localhost:3000/borrow/borrowpost")
      .then((res) => {
        setBorrowPosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, []);

  const handleBorrowPostClick = (postId: number) => {
    // Replace this with your desired functionality when a borrow element is clicked
    console.log(`Borrow post with ID ${postId} clicked!`);
  };

  return (
    <div className="flex flex-row  grow">
      <Categories type="borrow"></Categories>
      <div className="w-full h-full">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchBar type="borrow" />
          <CreatePostButton type="borrow" />
        </div>
        <div className="container">
          <div className="row">
            {borrowPosts.map((post: BorrowPost) => (
              <div className="col-12 mb-4" key={post.id}>
                <div
                  className="col-12"
                  key={post.id}
                  onClick={() => handleBorrowPostClick(post.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="position-relative">
                      <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                        {post.category}
                      </span>
                    </div>
                    <div className="card-img-overlay d-flex justify-content-end">
                      <a href="#" className="card-link text-danger like">
                        <i className="fas fa-heart"></i>
                      </a>
                    </div>
                    <div className="card-body">
                      <h2
                        className="card-title"
                        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                      >
                        {post.title.length < 50
                          ? post.title
                          : post.title.slice(0, 50) + "..."}
                      </h2>
                      <div
                        className="description-container"
                        style={{ height: "10%" }}
                      >
                        <p className="card-text">
                          {post.description.length < 315
                            ? post.description
                            : post.description.slice(0, 315) + "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
