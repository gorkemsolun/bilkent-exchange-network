/**
 * Renders the Admin page component.
 * Fetches reported posts from the server and displays them.
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostReport } from "../../data-types/datatypes";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function AdminPage() {
  const [reportedPosts, setReportedPosts] = useState<PostReport[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetches reported posts from the server and updates the state.
   */
  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/admin/reportedposts")
      .then((res) => {
        setReportedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="reports-container">
          <div className="reports-title">Reports</div>
          {reportedPosts.map((report) => (
            <div className="report-container" key={report._id}>
              <Link
                to={"../" + report.type + "post/" + report.postId}
                className="report-title"
              >
                {report.title}
              </Link>
              <div className="report-reason">{report.reason}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
