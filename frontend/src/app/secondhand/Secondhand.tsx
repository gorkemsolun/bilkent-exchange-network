import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  defaultFilterParams,
  saveUrl,
  unsaveUrl,
} from "../../data-types/constants.ts";
import {
  FilterParams,
  ProfileContextType,
  SavedPost,
} from "../../data-types/datatypes.ts";
import { SecondhandPost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import { useProfileContext } from "../authentication/AuthHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import ErrorModal from "../components/ErrorModal.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";
export default function Secondhand() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [secondhandPosts, setSecondhandPosts] = useState<SecondhandPost[]>([]);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState<string>("");
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

  const handleSaveButton = (post: SecondhandPost) => {
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
        console.log(err);
        setError(err);
      });

      profile.savedPosts = profile.savedPosts.filter(
        (savedPost: SavedPost) => savedPost.id !== post._id
      );
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    } else {
      // Post is unsaved, save
      const body = {
        profileID: profile?._id,
        savedPost: post,
      };

      axios.put(saveUrl, body).catch((err) => {
        console.log(err);
        setError(err);
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

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  function handleSortTypeChange(sortType: string) {
    setSortType(sortType);
  }

  useEffect(() => {
    setLoading(true);

    const url = prepareUrl(sortType, searchTerm, "secondhand", filterParams);

    axios
      .get(url)
      .then((res) => {
        setSecondhandPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
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
            <div className="row posts-container">
              {secondhandPosts.map((post: SecondhandPost) => (
                <div className=" col-lg-4" key={post._id}>
                  <div className="post-container">
                    <div className="position-relative">
                      <span className="badge bg-primary rounded-pill m-2 end-0 top-0 position-absolute">
                        {post.category}
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
                        className="card-img post-image"
                        src={post.image}
                        alt="Image"
                      />
                    </div>

                    <div className="post-body">
                      <h4 className="post-title">{post.title}</h4>
                      <div className="description-container text-left">
                        <p className="post-description">
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
          )}
        </div>
        {error && (
          <ErrorModal
            message={error}
            onClose={() => {
              setError(null);
            }}
          />
        )}
        <div
          className={`messenger-box ${isMessengerVisible ? "open" : "closed"}`}
        >
          <Messenger onClick={handleMessengerClick} />
        </div>
      </div>
    </div>
  );
}
