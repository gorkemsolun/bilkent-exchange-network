import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { defaultImage, forumUrl, profileUrl } from "../../data-types/constants";
import {
  ForumEntry,
  ProfileContextType,
  UserContextType,
  UserProfile,
} from "../../data-types/datatypes";
import { ForumPost } from "../../data-types/posts";
import {
  useAuthContext,
  useProfileContext,
} from "../authentication/AuthHelpers";
import DeletePostButton from "../components/DeletePostButton";
import EditPostButton from "../components/EditPostButton";
import ErrorModal from "../components/ErrorModal";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ReportPostButton from "../components/ReportPostButton";
import CreateEntryButton from "./entry/CreateEntryButton";
import DeleteEntryButton from "./entry/DeleteEntryButton";
import EditEntryButton from "./entry/EditEntryButton";

export default function ForumPostDetails() {
  const [post, setPost] = useState<ForumPost>({} as ForumPost);
  const [poster, setPoster] = useState<UserProfile>({} as UserProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entriesWithUserInfo, setEntriesWithUserInfo] = useState<ForumEntry[]>(
    []
  );
  const { id } = useParams();
  const user = (useAuthContext() as unknown as UserContextType).user;
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;

  /**
   * Fetches the forum post details from the server and updates the state.
   * @param {number} id - The ID of the forum post.
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${forumUrl}/${id}`)
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

  /**
   * Fetches the poster information for the forum post.
   * If the post's poster is the same as the current user's profile, sets the poster as the current user's profile.
   * Otherwise, makes a GET request to retrieve the poster's profile information from the server.
   * Sets the poster state with the retrieved profile data.
   * Handles any errors that occur during the process.
   *
   * @param {Object} post - The forum post object.
   * @param {Object} profile - The current user's profile object.
   */
  useEffect(() => {
    if (post.poster === profile?.userID) {
      setPoster(profile);
    } else {
      axios
        .get(`${profileUrl}/${post.poster}`)
        .then((res) => {
          setPoster(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, [post, profile]);

  /**
   * Fetches user information for a given user ID.
   * @param userId - The ID of the user.
   * @returns The user's profile information.
   */
  useEffect(() => {
    const fetchUserInfo = async (userId: string) => {
      try {
        const response = await axios.get(`${profileUrl}/${userId}`);
        return response.data.profile;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    };

    /**
     * Fetches entries with user information and updates the state.
     */
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
            {post.poster == user?._id ? (
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
                title={post.title}
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
                <Link to={`/profile/` + poster?.userID} className="link">
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
                      src={entry.userInfo?.image || defaultImage}
                      className="forumpostdetails-profile-picture"
                      alt="Profile Picture"
                    />
                    <div className="forumpostdetails-username">
                      <Link
                        to={`/profile/${entry.userInfo?.userID || ""}`}
                        className="link"
                      >
                        {entry.userInfo?.username || "Unknown User"}
                      </Link>
                    </div>
                    <div className="forumpostdetails-date">
                      {entry.createdAt?.slice(11, 16) +
                        " " +
                        entry.createdAt?.slice(0, 10)}
                    </div>
                    {entry.userInfo?.userID == user?._id && (
                      <div className="entry-edit-delete-container">
                        <EditEntryButton
                          postId={"" + post._id}
                          entryId={entry._id as string}
                          entryContent={entry.content}
                        />
                        <DeleteEntryButton
                          postId={"" + post._id}
                          entryId={entry._id as string}
                        />
                      </div>
                    )}
                  </div>

                  <div className="forumpostdetails-entry-content">
                    {entry.content}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => {
            setError(null);
          }}
        />
      )}
    </div>
  );
}
