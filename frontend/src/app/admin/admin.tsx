import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { Post } from "../../data-types/posts"; // Update the path as needed
import Header from "../components/navbar";
import Navbar from "../components/header";

// URL generator
const generatePostUrl = ({ postId, type }) =>
  `/${type}/${postId}`;

export default function AdminPage() {
  const [forumPosts, setForumPosts] = useState<Post[]>([]);
  const [reportedPosts, setReportedPosts] = useState<Post[]>([]); // Use the Post type
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/admin/reportedposts")
      .then((res) => {
        
        const reportedPosts =  res.data; // Use the Post type
       
        if (reportedPosts && reportedPosts.length > 0) {
          
          const postUrls = reportedPosts.map((reportedPost) =>
            generatePostUrl({
              postId: reportedPost._id,
              type: reportedPost.postType,
            })
          );
          
          const fetchPostPromises = postUrls.map((postUrl) =>
            axios.get(postUrl)
          );

          Promise.all(fetchPostPromises)
            .then((postResponses) => {
              const posts = postResponses.map(
                (postResponse) => postResponse.data
              );

              setReportedPosts(posts);
              console.log(reportedPosts)
            })
            .catch((error) => {
              console.error("Error fetching posts:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log("No reported posts found");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching reported posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      <div className="flex items-center justify-center mb-3">
        <h1>Admin Page - Reported Posts</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="justify-center">
          <div className="container">
            <div className="row">
              {reportedPosts.map((post) => (
                <div key={post._id}>
                  <p>Post ID: {post._id}</p>
                  <p>Post Content: {post.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
