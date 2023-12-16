// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader';

const AdminPage = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get('http://localhost:3000/admin/reported-posts') // Adjust the endpoint
      .then((res) => {
        setReportedPosts(res.data.reportedPosts);
      })
      .catch((err) => {
        console.error('Error fetching reported posts:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="outer-container">
      {/* Header and Navbar for Admin Page */}
      <div className="flex items-center justify-center mb-3">
        <h1>Admin Page - Reported Posts</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="justify-center">
          <div className="container">
            <div className="row">
              {reportedPosts.map((report) => (
                <div className="col-12 mb-4" key={report._id}>
                  <div className="card w-full">
                    <div className="card-body">
                      <h2
                        className="card-title"
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          textAlign: 'left',
                        }}
                      >
                        {`Reported Post ID: ${report.postId}`}
                      </h2>
                      <div
                        className="description-container"
                        style={{ height: '10%', textAlign: 'left' }}
                      >
                        <p className="card-text">{`Reason: ${report.reason}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;