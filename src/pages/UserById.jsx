import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  fetchArticlesByUsername,
  fetchUserByUsername,
  fetchUserComments,
} from "../utils/api"; // create this if not done
import PageError from "../Components/PageError";
import PageLoading from "../Components/PageLoading";
import NavigationBar from "../Components/Navbar";

const UserById = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userArticlesNum, setUserArticlesNum] = useState(null);
  const [userComments, setUserComments] = useState(null);
  const [userCommentsVotes, setUserCommentsVotes] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [isLoadingArticleData, setIsLoadingArticleData] = useState(true);
  const [isLoadingCommentsData, setIsLoadingCommentsData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoadingUserData(true);
    fetchUserByUsername(username)
      .then((fetchedUserData) => {
        setUser(fetchedUserData);
        setIsLoadingUserData(false);
      })
      .catch((error) => {
        setIsLoadingUserData(false);
        setIsError(true);
        setError(error);
      });
  }, [username]);

  useEffect(() => {
    setIsLoadingArticleData(true);
    fetchArticlesByUsername(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      username
    )
      .then(({ total_count }) => {
        setUserArticlesNum(total_count);
        setIsLoadingArticleData(false);
      })
      .catch((error) => {
        setIsLoadingArticleData(false);
        setIsError(true);
        setError(error);
      });
  }, [username]);

  useEffect(() => {
    setIsLoadingCommentsData(true);
    fetchUserComments(username)
      .then(({ comments: fetchedCommentData }) => {
        setUserComments(fetchedCommentData);
        setIsLoadingCommentsData(false);
      })
      .catch((error) => {
        setIsLoadingCommentsData(false);
        setIsError(true);
        setError(error);
      });
  }, [username]);

  useEffect(() => {
    if (userComments) {
      const commentsVotes = userComments.map((comment) => comment.votes);
      const totalCommentsVotes = commentsVotes.reduce(
        (acc, curr) => acc + curr,
        0
      );
      setUserCommentsVotes(totalCommentsVotes);
    }
  }, [userComments]);

  useEffect(() => {
    if (!isLoadingUserData && !isLoadingArticleData && !isLoadingCommentsData) {
      setIsLoading(false);
    }
  }, [isLoadingUserData, isLoadingArticleData, isLoadingCommentsData]);

  if (isError) return <PageError error={{ msg: "User not found." }} />;

  return (
    <>
      <NavigationBar />

      <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <PageLoading contentType="User" />
        ) : (
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl shadow-lg p-8 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url}
                alt={`${user.username}'s avatar`}
                className="w-24 h-24 rounded-full border-2 border-slate-700 shadow"
              />
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-slate-400 text-sm">@{user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-3 h-3 rounded-full ${
                  user.is_logged_in ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
              <span
                className={
                  user.is_logged_in ? "text-green-500" : "text-gray-500"
                }
              >
                {user.is_logged_in ? "Currently Online" : "Currently Offline"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-lg p-4 text-center shadow-inner border border-slate-700">
                <p className="text-3xl font-bold text-white">
                  {userArticlesNum}
                </p>
                <p className="text-sm mt-1 text-slate-400">Articles Posted</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center shadow-inner border border-slate-700">
                <p className="text-3xl font-bold text-white">
                  {userComments.length}
                </p>
                <p className="text-sm mt-1 text-slate-400">Comments Posted</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-center shadow-inner border border-slate-700">
                <p className="text-3xl font-bold text-white">
                  {userCommentsVotes}
                </p>
                <p className="text-sm mt-1 text-slate-400">Comment Karma</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserById;
