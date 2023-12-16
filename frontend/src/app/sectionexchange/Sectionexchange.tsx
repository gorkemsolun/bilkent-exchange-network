import axios from "axios";
import { useEffect, useState } from "react";
import { defaultFilterParams } from "../../data-types/constants.ts";
import { FilterParams, UserContextType } from "../../data-types/datatypes.ts";
import { SectionexchangePost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import { useAuthContext } from "../authentication/AuthHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
import Filters from "../components/Filters.tsx";
import Header from "../components/Header.tsx";
import Loader from "../components/Loader.tsx";
import Navbar from "../components/Navbar.tsx";
import SearchBar from "../components/Searchbar.tsx";
import Messenger from "../message/Messenger.tsx";

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
  const user = (useAuthContext() as unknown as UserContextType).user;

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleDMBoxClick = (otherUserID: string) => {
    setIsMessengerVisible(true);

    const conversation = {
      userIDs: [user?._id, otherUserID],
      messages: [],
    };

    axios
      .post("http://localhost:3000/conversation/conversation/", conversation)
      .then((res) => {
        // SUCCESFULLY CREATED CONVERSATION
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  function passFilters(params: FilterParams) {
    setFilterParams(params);
  }

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "sectionexchange", filterParams);

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
  }, [searchTerm, filterParams]);

  useEffect(() => {
    if (sortType === "date-asc") {
      setSectionexchangePosts(
        [...sectionexchangePosts].sort(
          (a: SectionexchangePost, b: SectionexchangePost) =>
            new Date(a.createdAt as Date).getTime() -
            new Date(b.createdAt as Date).getTime()
        )
      );
    } else {
      setSectionexchangePosts(
        [...sectionexchangePosts].sort(
          (a: SectionexchangePost, b: SectionexchangePost) =>
            new Date(b.createdAt as Date).getTime() -
            new Date(a.createdAt as Date).getTime()
        )
      );
    }
    // do not add sectionexchangePosts to the dependency array
  }, [sortType]);

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
              setSortType={setSortType}
            />
            <CreatePostButton type="sectionexchange" />
          </div>
          <div className="container w-full">
            <div className="row mb-3 mr-20 ml-5">
              <div className="col-12">
                <div className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2 bg-white font-bold">
                  <div className="row align-items-start justify-content-start">
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
                    <div className="col-md text-center">
                      <p className="card-text">{"Date"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="container w-full">
              {sectionexchangePosts.map((post: SectionexchangePost) => (
                <div className="row mb-1 mr-20 ml-5" key={post._id}>
                  <div className="col-12">
                    <div className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2 bg-white">
                      <div className="row align-items-start justify-content-start">
                        <div className="col-md text-center border-r border-black">
                          <p className="card-text">{String(post.poster)}</p>
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
                              onClick={() => handleDMBoxClick(post.poster)}
                            />
                          </div>
                        </div>
                        <div className="col-md text-center">
                          <p className="card-text">{String(post.createdAt)}</p>
                        </div>
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
    </div>
  );
}
