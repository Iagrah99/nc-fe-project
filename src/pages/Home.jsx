import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ArticleCard from "../Components/ArticleCard";
import { useState, useEffect, useContext } from "react";
import {
  fetchUserComments,
  fetchTopics,
  fetchArticlesByUsername,
  removeArticleById,
} from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import CommentPreviewCard from "../Components/CommentPreviewCard";
import CreateArticleModal from "../Components/CreateArticleModal";
import DeleteArticleModal from "../Components/DeleteArticleModal";
import greetingTime from "greeting-time";
import EditArticleModal from "../Components/EditArticleModal";

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
  const [isArticleDeleting, setIsArticleDeleting] = useState(false);
  const [isArticleDeleted, setIsArticleDeleted] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [articleUpdating, setArticleUpdating] = useState(false);
  const [articleUpdated, setArticleUpdated] = useState(false);

  const [cardsPerView, setCardsPerView] = useState(
    window.innerWidth < 1024 ? 1 : 4
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = (articleId) => {
    setSelectedArticleId(articleId);
    setIsDeleteModalOpen((prev) => !prev);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedArticle(null);
  };

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const { loggedInUser } = useContext(UserContext);
  const { topic } = useParams();

  document.title = "NC News | Home";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("sort_by");
  const sortByQuery = searchParams.get("sort_by");

  const [orderBy, setOrderBy] = useState("order_by");
  const orderByQuery = searchParams.get("order_by");

  const greeting = greetingTime(new Date());
  const greetingsMap = {
    "Good morning": "Good Morning☀️",
    "Good afternoon": "Good Afternoon☀️",
    "Good evening": "Good Evening🌙",
  };

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
    const handleResize = () => {
      setCardsPerView(window.innerWidth < 1024 ? 1 : 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;
    fetchArticlesByUsername(
      topic,
      sortByQuery,
      orderByQuery,
      1,
      1000,
      loggedInUser.username
    )
      .then(({ articles, total_count }) => {
        setIsError(false);
        setArticles(articles);
        setArticlesLoading(false);
        setTotalCount(total_count);
      })
      .catch((error) => {
        setArticlesLoading(false);
        setError(error);
        setIsError(true);
      });
  }, [
    isError,
    isArticleDeleted,
    sortByQuery,
    orderByQuery,
    topic,
    articleUpdated,
  ]);

  useEffect(() => {
    if (!loggedInUser) return;
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
    if (!loggedInUser) return;
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
    if (!loggedInUser) return;
    if (!articlesLoading && !commentsLoading) {
      setIsLoading(false);
    }
  }, [articlesLoading, commentsLoading]);

  const handleVisitComment = (comment) => {
    navigate(
      `/articles/article/${comment.article_id}#comment_id=${comment.comment_id}`
    );
  };

  const handleDeleteArticle = async (articleId) => {
    setIsArticleDeleting(true);
    try {
      const articleDeleted = await removeArticleById(articleId);
      articleDeleted && setIsArticleDeleted(true);
      setIsArticleDeleting(false);
      toggleDeleteModal(null);
    } catch (error) {
      setIsError(true);
      setError(error);
    }
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
              <header className="text-center py-12 bg-slate-950">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
                  {greetingsMap[greeting] || ""}
                </h1>

                <p className="text-lg sm:text-2xl text-slate-400">
                  Welcome back,{" "}
                  <span className="text-white font-semibold">
                    {loggedInUser.username}
                  </span>
                  !
                </p>
              </header>

              <section className="mx-4">
                <div
                  onClick={toggleModal}
                  className="cursor-pointer bg-slate-800 text-slate-400 hover:text-white px-6 py-4 rounded-lg border-1 shadow-md sm:mx-auto  w-full max-w-3xl transition duration-200 ease-in-out hover:bg-slate-700"
                >
                  Compose an article...
                </div>
              </section>

              <section>
                <h2 className="bg-slate-950 text-center text-2xl sm:text-3xl py-10 text-white">
                  Your Articles
                </h2>
              </section>

              <form className="mb-8">
                <div className="flex flex-wrap gap-6 lg:justify-center justify-center ">
                  {/* Sort By */}
                  <div className="flex flex-col items-center">
                    <select
                      onChange={handleSortBy}
                      className="bg-slate-800 text-white lg:px-3 py-3 sm:py-2 lg:w-60 w-36 border-r-12 pl-1 text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
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
                      className="bg-slate-800 text-white lg:px-3 py-3 sm:py-2 lg:w-60 w-36 border-r-12 pl-1 text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
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
                </div>
              </form>

              <div className="overflow-hidden relative w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (slideIndex * 100) / cardsPerView
                    }%)`,
                  }}
                >
                  {articles.map((article) => (
                    <div
                      key={article.article_id}
                      className=" min-w-[100%] sm:min-w-[50%] xl:min-w-[25%] px-2" // 25% width per card for 4-per-view
                    >
                      <ArticleCard
                        article={article}
                        toggleDeleteModal={toggleDeleteModal}
                        toggleEditModal={() => openEditModal(article)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {totalCount > 4 && (
                <div className="flex justify-center items-center gap-4 mt-4 mb-8">
                  <button
                    onClick={() =>
                      setSlideIndex((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={slideIndex === 0}
                    className={`px-4 py-2 text-xl rounded-full transition ${
                      slideIndex === 0
                        ? "text-slate-500 cursor-not-allowed"
                        : "text-white hover:bg-slate-700 cursor-pointer"
                    }`}
                  >
                    ←
                  </button>

                  <span className="text-slate-300 text-sm">
                    {slideIndex + 1} of {totalCount - 3}
                  </span>

                  <button
                    onClick={() =>
                      setSlideIndex((prev) =>
                        prev < totalCount - 4 ? prev + 1 : prev
                      )
                    }
                    disabled={slideIndex >= totalCount - 4}
                    className={`px-4 py-2 text-xl rounded-full transition ${
                      slideIndex >= totalCount - 4
                        ? "text-slate-500 cursor-not-allowed"
                        : "text-white hover:bg-slate-700 cursor-pointer"
                    }`}
                  >
                    →
                  </button>
                </div>
              )}

              <section>
                <h2 className="bg-slate-950 text-center text-2xl sm:text-3xl py-10 text-white">
                  Your Top Comments
                </h2>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 lg:mb-32 px-2">
                {comments
                  .slice(0, 4)
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

          {isDeleteModalOpen && (
            <DeleteArticleModal
              toggleDeleteModal={toggleDeleteModal}
              handleDeleteArticle={handleDeleteArticle}
              selectedArticleId={selectedArticleId}
              isArticleDeleting={isArticleDeleting}
            />
          )}

          {isEditModalOpen && selectedArticle && (
            <EditArticleModal
              toggleEditModal={closeEditModal}
              selectedArticle={selectedArticle}
              articleUpdating={articleUpdating}
              setArticleUpdating={setArticleUpdating}
              setArticleUpdated={setArticleUpdated}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
