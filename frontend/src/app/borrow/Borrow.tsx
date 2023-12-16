import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../../data-types/constants";
import { FilterParams } from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posts";
import { prepareUrl } from "../PostHelpers";
import CreatePostButton from "../components/CreatePostButton";
import Filters from "../components/Filters";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import Messenger from "../message/Messenger";

export default function Borrow() {
  const [loading, setLoading] = useState<boolean>(false);
  const [borrowPosts, setBorrowPosts] = useState<BorrowPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState<string>("");
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  function handleSortTypeChange(sortType: string) {
    setSortType(sortType);
  }

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(sortType, searchTerm, "borrow", filterParams);

    axios
      .get(url)
      .then((res) => {
        setBorrowPosts(res.data);
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
      <div className="flex flex-row  grow">
        <Filters type="borrow" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="borrow"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={handleSortTypeChange}
            />
            <CreatePostButton type="borrow" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container">
              <div className="row">
                {borrowPosts.map((post: BorrowPost) => (
                  <div className="col-12 mb-4" key={post._id}>
                    <Link
                      to={`/borrowpost/${post._id}`}
                      className="col-12"
                      key={post._id}
                      style={{ cursor: "pointer", textAlign: "left" }}
                    >
                      <div className="card" style={{ width: "100%" }}>
                        <div className="position-relative">
                          <span className="badge bg-primary rounded-pill position-absolute top-0 end-0 m-2">
                            {post.category}
                          </span>
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
                    </Link>
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
