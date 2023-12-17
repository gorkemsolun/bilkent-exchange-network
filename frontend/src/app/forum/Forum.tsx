/**
 * Represents the Forum component.
 * This component displays forum posts, allows searching and filtering, and provides functionality to save and unsave posts.
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
import { ForumPost } from "../../data-types/posts.ts";
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

export default function Forum() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [error, setError] = useState<string | null>(null);
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
   * Fetches forum posts from the server based on the provided parameters.
   *
   * @param {string} sortType - The sorting type for the forum posts.
   * @param {string} searchTerm - The search term to filter the forum posts.
   * @param {string} filterParams - Additional filter parameters for the forum posts.
   * @returns {void}
   */
  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(sortType, searchTerm, "forum", filterParams);

    axios
      .get(url)
      .then((res) => {
        setForumPosts(res.data);
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
   * Handles the save button functionality for a forum post.
   * If the post is already saved, it will unsave it.
   * If the post is not saved, it will save it.
   * @param post The forum post to be saved or unsaved.
   */
  const handleSaveButton = (post: ForumPost) => {
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
      const type = "forum";
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
        typename: "forum",
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
        <Filters type="forum" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="forum"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={handleSortTypeChange}
            />
            <CreatePostButton type="forum" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="justify-center">
              <div className="row posts-container">
                {forumPosts.map((post) => (
                  <div className="col-12" key={post._id}>
                    <div className="col-12 cursor-pointer" key={post._id}>
                      <div className="post-container w-full">
                        <div className="card-body">
                          <div className="post-save-container-forum-type">
                            {profile.savedPosts.some(
                              (savedPost: SavedPost) =>
                                savedPost.id === post._id
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
                          <Link
                            to={`/forumpost/${post._id}`}
                            className="card-title"
                          >
                            <p className="forum-post-title">
                              {post.title.length < 50
                                ? post.title
                                : post.title.slice(0, 50) + "..."}
                            </p>
                          </Link>
                          <div
                            className="description-container"
                            style={{ height: "10%", textAlign: "left" }}
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
