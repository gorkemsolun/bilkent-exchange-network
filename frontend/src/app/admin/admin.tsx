import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { PostReport } from "../../data-types/datatypes";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [reportedPosts, setReportedPosts] = useState<PostReport[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(reportedPosts);

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
