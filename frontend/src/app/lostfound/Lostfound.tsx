import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../../data-types/constants.ts";
import {
  FilterParams,
  ProfileContextType,
  SavedPost,
} from "../../data-types/datatypes.ts";
import { LostFoundPost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";
import { useProfileContext } from "../authentication/AuthHelpers.ts";

export default function LostFound() {
  const [loading, setLoading] = useState(false);
  const [lostFoundPosts, setLostFoundPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState("");
  const [isMessengerVisible, setIsMessengerVisible] = useState(false);
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "lostfound", filterParams);

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

  useEffect(() => {
    if (sortType === "date-asc") {
      setLostFoundPosts(
        [...lostFoundPosts].sort(
          (a: LostFoundPost, b: LostFoundPost) =>
            new Date(a.createdAt as Date).getTime() -
            new Date(b.createdAt as Date).getTime()
        )
      );
    } else {
      setLostFoundPosts(
        [...lostFoundPosts].sort(
          (a: LostFoundPost, b: LostFoundPost) =>
            new Date(b.createdAt as Date).getTime() -
            new Date(a.createdAt as Date).getTime()
        )
      );
    }
    // do not add lostFoundPosts to the dependency array
  }, [sortType]);

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSaveButton = (post: LostFoundPost) => {
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

      axios
        .put("http://localhost:3000/profile/unsavepost", body)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      profile.savedPosts = profile.savedPosts.filter(
        (savedPost: SavedPost) => savedPost.id !== post._id
      );
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
      console.log(profile);
    } else {
      // Post is unsaved, save
      const body = {
        profileID: profile?._id,
        savedPost: post,
      };

      axios
        .put("http://localhost:3000/profile/savepost", body)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      const savedPost: SavedPost = {
        id: "" + post._id,
        typename: "Secondhand,",
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
      <div className="flex flex-row grow">
        <Filters type="lostfound" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="lostandfound"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={setSortType}
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
                        <div className="post-save-container">
                          {profile.savedPosts.some(
                            (savedPost: SavedPost) => savedPost.id === post._id
                          ) ? (
                            <img
                              src="/src/assets/saved.png"
                              className="post-saved-icon"
                              onClick={() => {
                                handleSaveButton(post);
                              }}
                            ></img>
                          ) : (
                            <img
                              src="/src/assets/notsaved.png"
                              className="post-notsaved-icon"
                              onClick={() => {
                                handleSaveButton(post);
                              }}
                            ></img>
                          )}
                        </div>
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
