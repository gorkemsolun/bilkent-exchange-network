import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  conversationUrl,
  defaultConversation,
  defaultFilterParams,
} from "../../data-types/constants.ts";
import {
  Conversation,
  FilterParams,
  ProfileContextType,
  SavedPost,
  UserContextType,
} from "../../data-types/datatypes.ts";
import { SectionexchangePost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";
import ErrorModal from "../components/ErrorModal.tsx";

export default function SectionExchange() {
  const [sectionexchangePosts, setSectionexchangePosts] = useState<
    SectionexchangePost[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);
  const [sortType, setSortType] = useState<string>("");
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(defaultConversation);
  const user = (useAuthContext() as unknown as UserContextType).user;
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

  const handleDMBoxClick = (otherUserID: string, otherUserUsername: string) => {
    // Check if there is an existing conversation with that user, if there isn't create one
    axios.get(conversationUrl + "/userID/" + user?._id).then((res) => {
      const conversation = res.data.find((conv: Conversation) => {
        return (
          conv.userIDs.includes("" + user?._id) &&
          conv.userIDs.includes(otherUserID)
        );
      });

      if (conversation) {
        conversation.username = otherUserUsername;
        setSelectedConversation(conversation);
      } else {
        const newConversation: Conversation = {
          userIDs: ["" + user?._id, otherUserID],
          messages: [],
          username: otherUserUsername,
        };
        setSelectedConversation(newConversation);

        axios.post(conversationUrl + "/", newConversation).catch((err) => {
          setError(err);
          console.log(err);
        });
      }
    });
    setIsMessengerVisible(true);
  };

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(
      sortType,
      searchTerm,
      "sectionexchange",
      filterParams
    );

    axios
      .get(url)
      .then((res) => {
        setSectionexchangePosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, filterParams, sortType]);

  const handleSaveButton = (post: SectionexchangePost) => {
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

      axios.put("http://localhost:3000/profile/savepost", body).catch((err) => {
        console.log(err);
      });

      const savedPost: SavedPost = {
        id: "" + post._id,
        typename: "Secondhand,",
        title: "Section Exchange",
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
        <Filters type="sectionexchange" passFilters={passFilters}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="sectionexchange"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={handleSortTypeChange}
            />
            <CreatePostButton type="sectionexchange" />
          </div>
          <div className="sectionexchange-post-container">
            <div className="row align-items font-bold">
              <div className="col-md text-center border-r border-black">
                <p className="card-text">{"Username"}</p>
              </div>
              <div className="col-md text-center border-r border-black">
                <p className="card-text">{"Offered Course-Section"}</p>
              </div>
              <div className="col-md text-center border-r border-black">
                <p className="card-text">{"Desired Course-Section"}</p>
              </div>
              <div className="col-md text-center border-r border-black">
                <p className="card-text">{"DM"}</p>
              </div>
              <div
                className="col-md text-center"
                style={{ marginRight: "35px" }}
              >
                <p className="card-text">{"Date"}</p>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="">
              {sectionexchangePosts.map((post: SectionexchangePost) => (
                <div className="sectionexchange-post-container" key={post._id}>
                  <div className="row">
                    <div className="col-md text-center border-r border-black">
                      <Link to={"../profile/" + post.poster} className="link">
                        {post.posterUsername}
                      </Link>
                    </div>
                    <div className="col-md text-center border-r border-black">
                      <p className="card-text">
                        {post.offeredCourse + "-" + post.offeredSection}
                      </p>
                    </div>
                    <div className="col-md text-center border-r border-black">
                      <p className="card-text">
                        {post.desiredCourse + "-" + post.desiredSection}
                      </p>
                    </div>
                    <div className="col-md text-center border-r border-black">
                      <div>
                        <img
                          className="img-fluid mx-auto d-block max-w-4vw max-h-4vh"
                          src="./src/assets/dmbox.png"
                          alt="DM Box"
                          title="Send DM"
                          onClick={() =>
                            handleDMBoxClick(
                              post.poster,
                              "" + post.posterUsername
                            )
                          }
                          style={{
                            height: "35px",
                            width: "35px",
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-md text-center"
                      style={{ marginRight: "35px" }}
                    >
                      <p className="card-text">
                        {"" +
                          post.createdAt?.toString().slice(11, 16) +
                          "   " +
                          post.createdAt?.toString().slice(0, 10)}
                      </p>
                    </div>
                    <div className=" post-save-container-sectionexchange-type">
                      {profile.savedPosts.some(
                        (savedPost: SavedPost) => savedPost.id === post._id
                      ) ? (
                        <img
                          src="/src/assets/saved.png"
                          className="post-saved-icon"
                          onClick={() => {
                            handleSaveButton(post);
                          }}
                          title="Unsave Post"
                        ></img>
                      ) : (
                        <img
                          src="/src/assets/notsaved.png"
                          className="post-notsaved-icon"
                          onClick={() => {
                            handleSaveButton(post);
                          }}
                          title="Save Post"
                        ></img>
                      )}
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
          <Messenger
            onClick={handleMessengerClick}
            selectedConversation={selectedConversation}
          />
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
