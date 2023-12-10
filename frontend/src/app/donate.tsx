import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Filters from "../components/filters.tsx";
import Header from "../components/header.tsx";
import Loader from "../components/loader.tsx";
import Navbar from "../components/navbar.tsx";
import SearchBar from "../components/searchbar.tsx";
import { DonatePost } from "../data-types/posttypes.ts";
import CreatePostButton from "./create-post/createPostButton.tsx";

export default function Donate() {
  const [donatePosts, setDonatePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Callback function to handle search term
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    setLoading(true);

    const endpoint = searchTerm
      ? `http://localhost:3000/donate/donatepost/${searchTerm}`
      : "http://localhost:3000/donate/donatepost";

    axios
      .get(endpoint)
      .then((res) => {
        //console.log(res.data);
        setDonatePosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or error
      });
  }, [searchTerm]);

  return (
    <div className="w-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="donate" passFilters={undefined}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="donate" onSearch={handleSearch} />
            <CreatePostButton type="donate" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row">
                {donatePosts.map((post: DonatePost) => (
                  <div
                    className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4"
                    key={post._id}
                  >
                    <div className="card">
                      <div className="position-relative">
                        <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                          {post.category}
                        </span>
                        <img
                          className="card-img w-30vw h-40vh object-cover"
                          src={post.image}
                          alt="Image"
                        />
                      </div>
                      <div className="card-img-overlay d-flex justify-content-end">
                        <a href="#" className="card-link text-danger like">
                          <i className="fas fa-heart"></i>
                        </a>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                        <div className="description-container h-13vh text-left">
                          <p className="card-text">
                            {post.description.length < 75
                              ? post.description
                              : post.description.slice(0, 75) + "..."}
                          </p>
                        </div>{" "}
                        <div className="buy d-flex justify-content-between align-posts-center">
                          <div className="price text-success">
                            <h5 className="mt-4"></h5>
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
          )}
        </div>
      </div>
    </div>
  );
}
