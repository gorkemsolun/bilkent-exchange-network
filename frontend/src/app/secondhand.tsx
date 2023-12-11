import axios from "axios";
import { useEffect, useState } from "react";
import { defaultFilterParams } from "../data-types/constants.ts";
import { FilterParams } from "../data-types/datatypes.ts";
import { SecondhandPost } from "../data-types/posttypes.ts";
import Filters from "./components/filters.tsx";
import Header from "./components/header.tsx";
import Loader from "./components/loader.tsx";
import Navbar from "./components/navbar.tsx";
import SearchBar from "./components/searchbar.tsx";
import CreatePostButton from "./create-post/createPostButton.tsx";
import prepareUrl from "./fetchHelpers.ts";

export default function Secondhand() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [secondhandPosts, setSecondhandPosts] = useState([]);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  useEffect(() => {
    setLoading(true);

    const url = prepareUrl(searchTerm, "secondhand", filterParams);
    console.log(url);

    axios
      .get(url)
      .then((res) => {
        setSecondhandPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filterParams, searchTerm]);

  return (
    <div className="w-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="secondhand" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="secondhand" onSearch={handleSearch} />
            <CreatePostButton type="secondhand" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row">
                {secondhandPosts.map((post: SecondhandPost) => (
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
                        <a
                          href="#"
                          className="card-link text-danger like"
                          title="card"
                        >
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
          )}
        </div>
      </div>
    </div>
  );
}
