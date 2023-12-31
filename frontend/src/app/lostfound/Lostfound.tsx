/**
 * Represents the LostFound component.
 * This component displays lost and found posts, allows filtering, searching, sorting, and saving posts.
 */
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
import { LostFoundPost } from "../../data-types/posts.ts";
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

export default function LostFound() {
  const [loading, setLoading] = useState<boolean>(false);
  const [lostFoundPosts, setLostFoundPosts] = useState<LostFoundPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState<string>("");
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const profile = JSON.parse(localStorage.getItem("profile") as string);
  const profileDispatch = (useProfileContext() as unknown as ProfileContextType)
    .profileDispatch;

  /**
   * Handles the click event for the messenger button.
   */
  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  /**
   * Passes the filter parameters to the component.
   * @param params - The filter parameters.
   */
  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  /**
   * Handles the search event.
   * @param searchTerm - The search term.
   */
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  /**
   * Handles the change event for the sort type.
   * @param sortType - The sort type.
   */
  function handleSortTypeChange(sortType: string) {
    setSortType(sortType);
  }

  /**
   * Handles the save button functionality for a LostFoundPost.
   * If the post is already saved, it will unsave it.
   * If the post is not saved, it will save it.
   * @param post The LostFoundPost to be saved or unsaved.
   */
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
      const type = "lostandfound";
      const body = {
        typename: type,
        profileID: profile?._id,
        savedPost: post,
      };

      axios.put(saveUrl, body).catch((err) => {
        console.log(err);
        setError(err);
      });

      const savedPost: SavedPost = {
        id: "" + post._id,
        typename: "lostandfound",
        title: post.title,
      };

      profile.savedPosts.push(savedPost);
      localStorage.setItem("profile", JSON.stringify(profile));
      profileDispatch({ type: "UPDATE", payload: profile });
    }
  };

  /**
   * Fetches lost and found posts from the server based on search term, filter parameters, and sort type.
   * Sets the fetched posts to the state and handles loading and error states.
   *
   * @param {string} searchTerm - The search term to filter the posts.
   * @param {object} filterParams - The filter parameters to apply to the posts.
   * @param {string} sortType - The sort type to order the posts.
   */
  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(sortType, searchTerm, "lostfound", filterParams);

    axios
      .get(url)
      .then((res) => {
        setLostFoundPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
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
            <div className="row posts-container">
              {lostFoundPosts.map((post: LostFoundPost) => (
                <div className="col-lg-4" key={post._id}>
                  <div className="post-container">
                    <div className="position-relative">
                      <span className="badge bg-primary rounded-pill lostfound-post-category-badge">
                        {post.category}
                      </span>
                      <span className="badge bg-danger rounded-pill lostfound-post-status-badge">
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
                            title="saved"
                          ></img>
                        ) : (
                          <img
                            src="/src/assets/notsaved.png"
                            className="post-notsaved-icon"
                            onClick={() => {
                              handleSaveButton(post);
                            }}
                            title="not saved"
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
                      <div className="">
                        <p className="post-description">
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
