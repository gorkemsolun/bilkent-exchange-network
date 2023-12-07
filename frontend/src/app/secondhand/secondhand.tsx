import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import Categories from "../../components/categories.tsx";
import CreatePostButton from "../../components/createpostbutton.tsx";
import SearchBar from "../../components/searchbar.tsx";
import { SecondhandPost } from "../../posttypes.ts";

export default function Secondhand() {
  const [secondhandPosts, setSecondhandPosts] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(true);
    axios
      .get("http://localhost:3000/secondhand/secondhandpost")
      .then((res) => {
        setSecondhandPosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-row grow">
      <Categories type="secondhand"></Categories>
      <div className="w-full h-full">
        <div>
          <SearchBar type="secondhand" />
          <CreatePostButton type="secondhand" />
        </div>
        <div className="container">
          <div className="row">
            {secondhandPosts.map((post: SecondhandPost) => (
              <div
                className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4"
                key={post.id}
              >
                <div className="card">
                  <div className="position-relative">
                    <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                      {post.category}
                    </span>
                    <img className="card-img" src={post.image} alt="Vans" />
                  </div>
                  <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link text-danger like">
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <div
                      className="description-container"
                      style={{ height: "100px" }}
                    >
                      <p className="card-text">
                        {post.description.length < 75
                          ? post.description
                          : post.description.slice(0, 75) + "..."}
                      </p>
                    </div>{" "}
                    <div className="buy d-flex justify-content-between align-posts-center">
                      <div className="price text-success">
                        <h5 className="mt-4">${post.price}</h5>
                      </div>
                      <a href="#" className="btn btn-danger mt-3">
                        <i className="fas fa-shopping-cart"></i> Details
                      </a>
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
