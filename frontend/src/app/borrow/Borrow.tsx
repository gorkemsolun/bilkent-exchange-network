/**
 * Renders the Borrow page component.
 *
 * This component displays a list of borrow posts and provides functionality for searching, filtering, and sorting the posts.
 * Users can save or unsave posts, and can also open the messenger to communicate with other users.
 */
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

  /**
   * Handles the click event for the messenger button.
   */
  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  /**
   * Handles the search event.
   *
   * @param searchTerm - The search term entered by the user.
   */
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  /**
   * Passes the filter parameters to the component.
   *
   * @param params - The filter parameters.
   */
  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  /**
   * Handles the change event for the sort type.
   *
   * @param sortType - The new sort type.
   */
  function handleSortTypeChange(sortType: string) {
    setSortType(sortType);
  }

  /**
   * Fetches borrow posts from the server based on the provided search term, filter parameters, and sort type.
   * Updates the borrow posts state and handles loading and error states.
   *
   * @param {string} searchTerm - The search term to filter borrow posts.
   * @param {object} filterParams - The filter parameters to apply to the borrow posts.
   * @param {string} sortType - The sort type to order the borrow posts.
   */
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

  /**
   * Handles the save button action for a BorrowPost.
   * If the post is already saved, it will be unsaved.
   * If the post is not saved, it will be saved.
   * Updates the profile and local storage accordingly.
   * @param post The BorrowPost to be saved or unsaved.
   */
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
