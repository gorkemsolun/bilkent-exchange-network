import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ForumEntry, UserProfile } from "../../data-types/datatypes";
import { ForumPost } from "../../data-types/posttypes";
import Header from "../components/header";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import DeletePostButton from "../edit-delete-post/DeletePostButton";
import EditPostButton from "../edit-delete-post/EditPostButton";
import { useAuthContext } from "../authentication/authHelpers";
import CreateEntryButton from "../entry/CreateEntryButton";
import DeleteEntryButton from "../entry/DeleteEntryButton";
import ReportPostButton from "../edit-delete-post/ReportPostButton";
import EditEntryButton from "../entry/EditEntryButton";

export default function ForumPostDetails() {
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState(false);
  const [entriesWithUserInfo, setEntriesWithUserInfo] = useState<ForumEntry[]>(
    []
  );
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/forum/forumpost/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profile/profile/${post.poster}`)
      .then((res) => {
        setPoster(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [post]);

  useEffect(() => {
    const fetchUserInfo = async (userId: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/profile/${userId}`
        );
        return response.data.profile;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    };

    const fetchEntriesWithUserInfo = async () => {
      if (post.entries) {
        const entriesPromises = post.entries.map(async (entry: ForumEntry) => {
          const userInfo = await fetchUserInfo(entry.poster);
          return { ...entry, userInfo };
        });

        const entriesWithUserInfo = await Promise.all(entriesPromises);
        setEntriesWithUserInfo(entriesWithUserInfo);
      }
    };

    fetchEntriesWithUserInfo();
  }, [post.entries]);

  return (
    <div className="outer-container">
      <Header />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="forumpostdetails-container">
          <div className="postdetails-edit-delete-container">
            {/* Users cannot edit/delete others' posts and cannot report their own posts*/}
            {post.poster == user._id ? (
              <>
                <EditPostButton postId={"" + post._id} type="forum" />
                <DeletePostButton
                  postId={"" + post._id}
                  profileId={"" + poster?._id}
                  type="forum"
                />
              </>
            ) : (
              <ReportPostButton
                postId={"" + post._id}
                profileId={"" + poster?._id}
                type="forum"
              />
            )}
            <CreateEntryButton postId={"" + post._id} />
          </div>
          <div className="forumpostdetails-first-entry-container">
            <div className="forumpostdetails-entry-top">
              <img
                src={poster?.image}
                className="forumpostdetails-profile-picture"
                title="Profile Picture"
              />
              <div className="forumpostdetails-username">
                <Link to={`/profile/` + poster?.userID}>
                  {poster?.username}
                </Link>
              </div>
              <div className="forumpostdetails-date">
                {("" + post.createdAt).slice(11, 16) +
                  " " +
                  ("" + post.createdAt).slice(0, 10)}
              </div>
            </div>

            <div className="forumpostdetails-title">{post.title}</div>

            <div className="forumpostdetails-entry-content">
              {post.description}
            </div>
          </div>

          <div className="forumpostdetails-entries-container">
            {entriesWithUserInfo &&
              entriesWithUserInfo.map((entry: ForumEntry) => (
                <div
                  className="forumpostdetails-entry-container"
                  key={entry._id}
                >
                  <div className="forumpostdetails-entry-top">
                    <img
                      src={entry.userInfo?.image || "/src/assets/cs319.png"}
                      className="forumpostdetails-profile-picture"
                      alt="Profile Picture"
                    />
                    <div className="forumpostdetails-username">
                      <Link to={`/profile/${entry.userInfo?.userID || ""}`}>
                        {entry.userInfo?.username || "Unknown User"}
                      </Link>
                    </div>
                    <div className="forumpostdetails-date">
                      {entry.createdAt.slice(11, 16) +
                        " " +
                        entry.createdAt.slice(0, 10)}
                    </div>
                    <div className="entry-edit-delete-container">
                      <EditEntryButton
                        postId={"" + post._id}
                        entryId={entry._id}
                        entryContent={entry.content}
                      />
                      <DeleteEntryButton
                        postId={"" + post._id}
                        entryId={entry._id}
                      />
                    </div>
                  </div>

                  <div className="forumpostdetails-entry-content">
                    {entry.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
