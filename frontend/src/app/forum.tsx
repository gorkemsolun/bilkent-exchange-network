import axios from "axios";
import { useEffect, useState } from "react";
import { defaultFilterParams } from "../data-types/constants";
import { FilterParams } from "../data-types/datatypes";
import { ForumPost } from "../data-types/posttypes";
import Filters from "./components/filters";
import Header from "./components/header";
import Loader from "./components/loader";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchbar";
import CreatePostButton from "./create-post/CreatePostButton";
import prepareUrl from "./fetchHelpers";
import { Link } from "react-router-dom";

export default function Forum() {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] =
    useState<FilterParams>(defaultFilterParams);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    setLoading(true);
    const url = prepareUrl(searchTerm, "forum", filterParams);
    console.log(url);

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

  return (
    <div className="w-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="forum" passFilters={setFilterParams}></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="forum" onSearch={handleSearch} />
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
      </div>
    </div>
  );
}
