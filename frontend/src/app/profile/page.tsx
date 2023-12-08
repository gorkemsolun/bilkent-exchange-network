import React from "react";
import Navbar from "../../components/navbar";
import Header from "../../components/header";

interface UserProfileProps {
  user: {
    id: number;
    name: string;
    email: string;
    reputation: number;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({
  user = { name: "Name Surname", email: "mymail@gmail.com", reputation: 432 },
}) => {
  return (
    <>
      <Header />
      <Navbar />
      <div style={styles.container}>
        <div style={styles.profileHeader}>
          <img src="cs319.png" style={styles.profileImage} alt="Profile" />
          <div>
            <h2 style={styles.profileName}>{user.name}</h2>
            <p style={styles.profileEmail}>{user.email}</p>
          </div>
        </div>
        <div style={styles.profileStats}>
          <div>
            <p style={styles.statLabel}>Reputation</p>
            <p style={styles.statValue}>{user.reputation}</p>
          </div>
        </div>
        <div>
          <p style={styles.statLabel}>Posts</p>
          {/*user.posts.map((post) => (
        <div key={post.id} style={styles.post}>
          <h3 style={styles.postTitle}>{post.title}</h3>
          <p style={styles.postContent}>{post.content}</p>
        </div>
      ))*/}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginRight: "20px",
  },
  profileName: {
    fontSize: "24px",
    margin: "0",
  },
  profileEmail: {
    color: "#555",
    margin: "0",
  },
  profileStats: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "20px",
  },
  statLabel: {
    margin: "0",
    fontSize: "16px",
    color: "#888",
  },
  statValue: {
    margin: "0",
    fontSize: "24px",
  },
  postTitle: {
    fontSize: "18px",
    margin: "0",
  },
  postContent: {
    margin: "0",
    color: "#555",
  },
};

export default UserProfile;
