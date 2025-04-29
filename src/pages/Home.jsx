import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ArticleCard from "../Components/ArticleCard";
import { useState, useEffect, useContext } from "react";
import { fetchArticles, fetchArticlesByUsername, fetchUserComments } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import Header from "../Components/Header";
import CommentPreviewCard from "../Components/CommentPreviewCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState(null);

  const { loggedInUser } = useContext(UserContext);

  const userArticles = articles.filter(
    (article) => article.author === loggedInUser.username
  );

  document.title = "NC News | Home";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("sort_by");
  const sortByQuery = searchParams.get("sort_by");

  // const handleSortBy = (e) => {
  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.set("sort_by", e.target.value);
  //   setSortBy(e.target.value);
  //   setSearchParams(newParams);
  // };

  useEffect(() => {
    fetchArticlesByUsername(loggedInUser.username)
      .then(({ articles }) => {
        setisError(false);
        setArticles(articles);
        setArticlesLoading(false);
      })
      .catch((error) => {
        setArticlesLoading(false);
        setError(error);
        setisError(true);
      });
  }, [isError]);

  useEffect(() => {
    fetchUserComments(loggedInUser.username, sortByQuery)
      .then(({ comments }) => {
        setisError(false);
        setComments(comments);
        setCommentsLoading(false);
      })
      .catch((error) => {
        setCommentsLoading(false);
        setError(error);
        setisError(error);
      });
  }, [sortByQuery]);

  useEffect(() => {
    if (!articlesLoading && !commentsLoading) {
      setIsLoading(false);
    }
  }, [articlesLoading, commentsLoading]);

  const handleVisitComment = (comment) => {
    console.log(comment);
    navigate(`/articles/article/${comment.article_id}#comment_id=${comment.comment_id}`);
  };

  if (isError) return <PageError error={error} />;

  return (
    <>
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <NavigationBar />
        <main>
          {isLoading ? (
            <PageLoading contentType="Homepage" />
          ) : (
            <article className="flex flex-col justify-center mt-6 sm:px-6 lg:px-8">
              <Header />
              <section>
                <h1 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  Your Top Articles
                </h1>
              </section>

              <div
                className={`${
                  userArticles.length < 4
                    ? "flex justify-center gap-6 mb-12"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6 mb-12"
                }`}
              >
                {userArticles.slice(0, 8).map((article) => (
                  <div className={`${userArticles.length < 4 ? 'w-2xl' : ''}`} key={article.article_id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              <section>
                <h1 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  {/* Your {sortBy === "votes" ? "Top" : "Latest"} Comments */}
                  Your Top Comments
                </h1>
              </section>

              {/* <div className="flex flex-col items-center mb-10">
                <select
                  onChange={handleSortBy}
                  className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-24 border-r-12 pl-1 text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                  defaultValue={"sort_by"}
                >
                  <option value="sort_by" id="sort_by" disabled>
                    Sort By
                  </option>
                  <option value="created_at" id="date">
                    Date
                  </option>
                  <option value="votes" id="votes">
                    Votes
                  </option>
                </select>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 mb-24">
                {comments
                  .slice(0, 8)
                  .map(
                    (comment) =>
                      loggedInUser.username === comment.author && (
                        <CommentPreviewCard
                          comment={comment}
                          user={loggedInUser}
                          handleVisitComment={handleVisitComment}
                          key={comment.comment_id}
                        />
                      )
                  )}
              </div>
            </article>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
