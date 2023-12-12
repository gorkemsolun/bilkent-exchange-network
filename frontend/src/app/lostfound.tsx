import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../data-types/constants.ts";
import { FilterParams } from "../data-types/datatypes.ts";
import { LostFoundPost } from "../data-types/posttypes.ts";
import Filters from "./components/filters.tsx";
import Header from "./components/header.tsx";
import Loader from "./components/loader.tsx";
import Navbar from "./components/navbar.tsx";
import SearchBar from "./components/searchbar.tsx";
import CreatePostButton from "./create-post/CreatePostButton.tsx";
import { prepareUrl } from "./fetchPostHelpers.ts";

export default function LostFound() {
  const [loading, setLoading] = useState(false);
  const [lostFoundPosts, setLostFoundPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "lostfound", filterParams);
    console.log(url);

    axios
      .get(url)
      .then((res) => {
        setLostFoundPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, filterParams]);

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="w-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="lostfound" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="lostandfound" onSearch={handleSearch} />
            <CreatePostButton type="lostandfound" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row">
                {lostFoundPosts.map((post: LostFoundPost) => (
                  <div
                    className="col-12 col-sm-8 col-md-6 col-lg-4 mb-4"
                    key={post._id}
                  >
                    <div className="card">
                      <div className="position-relative">
                        <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                          {post.category}
                        </span>
                        <span className="badge bg-danger rounded-pill position-absolute top-0 end-12 m-2">
                          {post.status}
                        </span>
                        <img
                          className="card-img"
                          style={{
                            width: "30vw",
                            height: "40vh",
                            objectFit: "cover",
                          }}
                          src={post.image}
                          alt="Image"
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                        <div
                          className="description-container"
                          style={{ height: "13vh", textAlign: "left" }}
                        >
                          <p className="card-text">
                            {post.description.length < 75
                              ? post.description
                              : post.description.slice(0, 75) + "..."}
                          </p>
                        </div>{" "}
                        <div className="buy d-flex justify-content-between align-items-center">
                          <div className="price text-success">
                            <h5 className="mt-4"></h5>
                          </div>
                          <Link
                            className="btn btn-danger mt-3"
                            to={`/lostfoundpost/${post._id}`}
                          >
                            <i className="fas fa-shopping-cart"></i> Details
                          </Link>
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
