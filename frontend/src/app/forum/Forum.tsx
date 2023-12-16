import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultFilterParams } from "../../data-types/constants.ts";
import { FilterParams } from "../../data-types/datatypes.ts";
import { ForumPost } from "../../data-types/posts.ts";
import { prepareUrl } from "../PostHelpers.ts";
import CreatePostButton from "../components/CreatePostButton.tsx";
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
  const [sortType, setSortType] = useState<string>("");
  const [isMessengerVisible, setIsMessengerVisible] = useState<boolean>(false);

  const handleMessengerClick = () => {
    setIsMessengerVisible(!isMessengerVisible);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "forum", filterParams);

    axios
      .get(url)
      .then((res) => {
        setForumPosts(res.data);
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
      setForumPosts(
        [...forumPosts].sort(
          (a: ForumPost, b: ForumPost) =>
            new Date(a.createdAt as Date).getTime() -
            new Date(b.createdAt as Date).getTime()
        )
      );
    } else {
      setForumPosts(
        [...forumPosts].sort(
          (a: ForumPost, b: ForumPost) =>
            new Date(b.createdAt as Date).getTime() -
            new Date(a.createdAt as Date).getTime()
        )
      );
    }
  }, [sortType]);

  return (
    <div className="outer-container">
      <Header onMessengerClick={handleMessengerClick} />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="forum" passFilters={setFilterParams}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar
              type="forum"
              onSearch={handleSearch}
              sortType={sortType}
              setSortType={setSortType}
            />
            <CreatePostButton type="forum" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="justify-center">
              <div className="container">
                <div className="row">
                  {forumPosts.map((post) => (
                    <div className="col-12 mb-4" key={post._id}>
                      <Link
                        to={`/forumpost/${post._id}`}
                        className="col-12 cursor-pointer"
                        key={post._id}
                      >
                        <div className="card w-full">
                          <div className="card-body">
                            <h2
                              className="card-title"
                              style={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              {post.title.length < 50
                                ? post.title
                                : post.title.slice(0, 50) + "..."}
                            </h2>
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
                      </Link>
                    </div>
                  ))}
                </div>
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
