import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Filters from "../components/filters";
import Header from "../components/header";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";
import { SectionexchangePost } from "../data-types/posttypes";
import CreatePostButton from "./create-post/createPostButton";

export default function SectionExchange() {
  function handleDMClick(): void {
    console.log("DM Box Clicked");
  }

  const [sectionexchangePosts, setSectionexchangePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Callback function to handle search term
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    const endpoint = searchTerm
      ? `http://localhost:3000/sectionexchange/sectionexchangepost/${searchTerm}`
      : "http://localhost:3000/sectionexchange/sectionexchangepost";

    axios
      .get(endpoint)
      .then((res) => {
        //console.log(res.data);
        setSectionexchangePosts(res.data);
        //setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        //setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="w-screen h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-row grow">
        <Filters type="sectionexchange"></Filters>
        <div className="w-full h-full">
          <div className="flex items-center justify-center mb-3">
            <SearchBar type="sectionexchange" onSearch={handleSearch} />
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
                    <div
                      className="col-md text-center" // Adjusted column size
                    >
                      <p className="card-text">{"Date"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container w-full">
            {sectionexchangePosts.map((post: SectionexchangePost) => (
              <div className="row mb-1 mr-20 ml-5" key={post._id}>
                <div className="col-12">
                  <div className="card section-card row align-items-start justify-content-center pl-1 pr-1 py-2 bg-white">
                    <div className="row align-items-start justify-content-start">
                      <div className="col-md text-center border-r border-black">
                        <p className="card-text">{"" + post.username}</p>
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
                          {/* DM Box Image with hover title and click event */}
                          <img
                            className="img-fluid mx-auto d-block max-w-4vw max-h-4vh"
                            src="./src/assets/dmbox.png" // Replace with your image URL
                            alt="DM Box"
                            title="Send DM" // Tooltip on hover
                            onClick={() => handleDMClick()} // Your click handler
                          />
                        </div>
                      </div>
                      <div
                        className="col-md text-center" // Adjusted column size
                      >
                        <p className="card-text">{"" + post.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
