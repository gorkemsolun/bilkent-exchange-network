import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../../data-types/constants.ts";
import { FilterParams } from "../../data-types/datatypes.ts";
import { LostFoundPost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";

export default function LostFound() {
  const [loading, setLoading] = useState<boolean>(false);
  const [lostFoundPosts, setLostFoundPosts] = useState<LostFoundPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState<string>("");
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function handleSortTypeChange(sortType: string) {
    setSortType(sortType);
  }

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(sortType, searchTerm, "lostfound", filterParams);

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
  }, [searchTerm, filterParams, sortType]);

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="lostfound" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="lostandfound"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={handleSortTypeChange}
            />
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
        <div
          className={`messenger-box ${isMessengerVisible ? "open" : "closed"}`}
        >
          <Messenger onClick={handleMessengerClick} />
        </div>
      </div>
    </div>
  );
}
