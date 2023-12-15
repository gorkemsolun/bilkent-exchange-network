import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../data-types/constants";
import { FilterParams } from "../data-types/datatypes";
import { BorrowPost } from "../data-types/posttypes";
import Filters from "./components/filters";
import Header from "./components/header";
import Loader from "./components/loader";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchbar";
import CreatePostButton from "./create-post/CreatePostButton";
import { prepareUrl } from "./fetchPostHelpers";

export default function Borrow() {
  const [loading, setLoading] = useState(false);
  const [borrowPosts, setBorrowPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState("");
  const [isCounterVisible, setCounterVisible] = useState(true);

  const handleToggleCounter = () => {
    setCounterVisible(!isCounterVisible);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "borrow", filterParams);

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
  }, [searchTerm, filterParams]);

  useEffect(() => {
    if (sortType === "date-asc") {
      setBorrowPosts(
        [...borrowPosts].sort(
          (a: BorrowPost, b: BorrowPost) =>
            new Date(a.createdAt as Date).getTime() -
            new Date(b.createdAt as Date).getTime()
        )
      );
    } else {
      setBorrowPosts(
        [...borrowPosts].sort(
          (a: BorrowPost, b: BorrowPost) =>
            new Date(b.createdAt as Date).getTime() -
            new Date(a.createdAt as Date).getTime()
        )
      );
    }
    // do not add borrowPosts to the dependency array
  }, [sortType]);

  return (
    <div className="outer-container">
      <Header onMessageLinkClick={handleToggleCounter} />
      <Navbar />
      <div className="flex flex-row  grow">
        <Filters type="borrow" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="borrow"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={setSortType}
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
      </div>
    </div>
  );
}
