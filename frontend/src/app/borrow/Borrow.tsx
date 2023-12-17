import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  defaultFilterParams,
  saveUrl,
  unsaveUrl,
} from "../../data-types/constants";
import {
  FilterParams,
  ProfileContextType,
  SavedPost,
} from "../../data-types/datatypes";
import { BorrowPost } from "../../data-types/posts";
import { prepareUrl } from "../PostHelpers";
import { useProfileContext } from "../authentication/AuthHelpers";
import CreatePostButton from "../components/CreatePostButton";
import ErrorModal from "../components/ErrorModal";
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
  const [error, setError] = useState<string | null>(null);
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

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
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, filterParams, sortType]);

  const handleSaveButton = (post: BorrowPost) => {
    // Post is saved, unsave
    if (
      profile.savedPosts.some(
        (savedPost: SavedPost) => savedPost.id === post._id
      )
    ) {
      const body = {
        profileID: profile?._id,
        savedPost: post,
      };

      axios.put(unsaveUrl, body).catch((err) => {
        setError(err);
        console.log(err);
      });

      profile.savedPosts = profile.savedPosts.filter(
        (savedPost: SavedPost) => savedPost.id !== post._id
      );
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    } else {
      const type = "borrow";
      const body = {
        typename: type,
        profileID: profile?._id,
        savedPost: post,
      };

      axios.put(saveUrl, body).catch((err) => {
        setError(err);
        console.log(err);
      });

      const savedPost: SavedPost = {
        id: "" + post._id,
        typename: "borrow",
        title: post.title,
      };

      profile.savedPosts.push(savedPost);
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    }
  };

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
            <div className="row posts-container">
              {borrowPosts.map((post: BorrowPost) => (
                <div
                  className="col-12"
                  key={post._id}
                  style={{ cursor: "pointer", textAlign: "left" }}
                >
                  <div className="post-container" style={{ width: "100%" }}>
                    <div className="position-relative">
                      <span className="badge bg-primary rounded-pill borrow-post-badge">
                        {post.category}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="post-save-container-borrow-type">
                        {profile.savedPosts.some(
                          (savedPost: SavedPost) => savedPost.id === post._id
                        ) ? (
                          <img
                            src="/src/assets/saved.png"
                            className="post-saved-icon"
                            onClick={() => {
                              handleSaveButton(post);
                            }}
                            title="saved"
                          ></img>
                        ) : (
                          <img
                            src="/src/assets/notsaved.png"
                            className="post-notsaved-icon"
                            onClick={() => {
                              handleSaveButton(post);
                            }}
                            title="notsaved"
                          ></img>
                        )}
                      </div>
                      <Link
                        to={`/borrowpost/${post._id}`}
                        className="card-title"
                        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                      >
                        {post.title.length < 50
                          ? post.title
                          : post.title.slice(0, 50) + "..."}
                      </Link>
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
              ))}
            </div>
          )}
        </div>
        <div
          className={`messenger-box ${isMessengerVisible ? "open" : "closed"}`}
        >
          <Messenger onClick={handleMessengerClick} />
        </div>
      </div>
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
