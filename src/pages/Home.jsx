import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ArticleCard from "../Components/ArticleCard";
import { useState, useEffect, useContext } from "react";
import {
  fetchUserComments,
  fetchTopics,
  fetchArticlesByUsername,
} from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import Header from "../Components/Header";
import CommentPreviewCard from "../Components/CommentPreviewCard";
import CreateArticleModal from "../Components/CreateArticleModal";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isArticleDeleted, setIsArticleDeleted] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalCount, setTotalCount] = useState(0);

  const { loggedInUser } = useContext(UserContext);
  const { topic } = useParams();

  document.title = "NC News | Home";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("sort_by");
  const sortByQuery = searchParams.get("sort_by");

  const [orderBy, setOrderBy] = useState("order_by");
  const orderByQuery = searchParams.get("order_by");

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSortBy(e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", e.target.value);
    setOrderBy(e.target.value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    console.log("Fetching articles for page:", page);
    fetchArticlesByUsername(
      topic,
      sortByQuery,
      orderByQuery,
      page,
      limit,
      loggedInUser.username
    )
      .then(({ articles, total_count }) => {
        setIsError(false);
        setArticles(articles);
        setArticlesLoading(false);
        setTotalCount(total_count)
      })
      .catch((error) => {
        setArticlesLoading(false);
        setError(error);
        setIsError(true);
      });
  }, [isError, isArticleDeleted, sortByQuery, orderByQuery, topic, page]);

  useEffect(() => {
    fetchUserComments(loggedInUser.username)
      .then(({ comments }) => {
        setIsError(false);
        setComments(comments);
        setCommentsLoading(false);
      })
      .catch((error) => {
        setCommentsLoading(false);
        setError(error);
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    setIsLoadingTopics(true);
    fetchTopics()
      .then((topics) => {
        setIsError(false);
        setTopics(topics);
        setIsLoadingTopics(false);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoadingTopics(false);
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (!articlesLoading && !commentsLoading) {
      setIsLoading(false);
    }
  }, [articlesLoading, commentsLoading]);

  const handleVisitComment = (comment) => {
    console.log(comment);
    navigate(
      `/articles/article/${comment.article_id}#comment_id=${comment.comment_id}`
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
                <div
                  onClick={toggleModal}
                  className="cursor-pointer bg-slate-800 text-slate-400 hover:text-white px-6 py-4 rounded-lg border-1 shadow-md w-full max-w-3xl mx-auto transition duration-200 ease-in-out hover:bg-slate-700"
                >
                  Compose an article...
                </div>
              </section>

              <section>
                <h2 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  Your Articles
                </h2>
              </section>

              <form className="mb-8">
                <div className="flex flex-wrap gap-6 lg:justify-center sm:justify-between justify-center ">
                  {/* Sort By */}
                  <div className="flex flex-col items-center">
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
                      <option value="comment_count" id="comment_count">
                        Comment Count
                      </option>
                      <option value="votes" id="votes">
                        Votes
                      </option>
                    </select>
                  </div>

                  {/* Order By */}
                  <div className="flex flex-col items-center">
                    <select
                      onChange={handleOrderBy}
                      className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-24 border-r-12 pl-1 text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                      defaultValue={"order_by"}
                    >
                      <option value="order_by" id="order_by" disabled>
                        Order By
                      </option>
                      <option value="desc" id="descending">
                        Descending
                      </option>
                      <option value="asc" id="ascending">
                        Ascending
                      </option>
                    </select>
                  </div>

                  {/* Filter By */}
                  {/* <div className="flex flex-col items-center">
                        <select
                          onChange={handleFilterBy}
                          className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-24 border-r-12 pl-1 text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                          defaultValue={"filter_by"}
                        >
                          <option value="filter_by" id="filter_by" disabled>
                            Filter By
                          </option>
                          {topics.map((topic) => (
                            <option
                              value={topic.slug}
                              id={topic.slug}
                              key={topic.slug}
                            >
                              {topic.slug[0].toUpperCase() +
                                topic.slug.slice(1)}{" "}
                              Articles
                            </option>
                          ))}
                        </select>
                      </div> */}
                </div>
              </form>

              <div
                className={`${
                  articles.length < 4
                    ? "flex justify-center gap-6 mb-12"
                    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6 mb-12"
                }`}
              >
                {articles.map((article) => (
                  <div
                    className={`${articles.length < 4 ? "w-2xl" : ""}`}
                    key={article.article_id}
                  >
                    <ArticleCard
                      article={article}
                      setIsError={setIsError}
                      setError={setError}
                      setIsArticleDeleted={setIsArticleDeleted}
                    />
                  </div>
                ))}
              </div>

              {totalCount > limit && (
                <div className="flex justify-center mb-16">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      { length: Math.ceil(totalCount / limit) },
                      (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setPage(i + 1)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            page === i + 1
                              ? "bg-red-600 text-white"
                              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              <section>
                <h2 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  Your Top Comments
                </h2>
              </section>

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
          {isModalOpen && <CreateArticleModal toggleModal={toggleModal} />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
