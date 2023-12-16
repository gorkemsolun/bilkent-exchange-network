import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../../data-types/constants.ts";
import { FilterParams } from "../../data-types/datatypes.ts";
import { SecondhandPost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";
export default function Secondhand() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [secondhandPosts, setSecondhandPosts] = useState<SecondhandPost[]>([]);
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

    const url = prepareUrl(sortType, searchTerm, "secondhand", filterParams);
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
  }, [filterParams, searchTerm, sortType]);

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="secondhand" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="secondhand"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={handleSortTypeChange}
            />
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
                            <h5 className="mt-4">{post.price}₺</h5>
                          </div>
                          <Link
                            className="btn btn-danger mt-3"
                            to={`/secondhandpost/${post._id}`}
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
