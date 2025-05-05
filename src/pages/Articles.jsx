import ArticleCard from "../Components/ArticleCard";
import { fetchArticles, fetchTopics } from "../utils/api";
import { useEffect, useState } from "react";
import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageError from "../Components/PageError";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Components/Header";
import LoadingSpinner from "../Components/LoadingSpinner";
import FullscreenLoadingSpinner from "../Components/FullScreenLoadingSpinner";

const Articles = () => {
  document.title = "NC News | Articles";

  const [articles, setArticles] = useState([]);
  const [refreshingArticles, setRefreshingArticles] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [topics, setTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState("sort_by");
  const [orderBy, setOrderBy] = useState("order_by");

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const { topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (page === 1 && hasLoadedOnce) {
      setRefreshingArticles(true);
    }

    fetchArticles(topic, sortByQuery, orderByQuery, page)
      .then(({ articles: newArticles, total_count }) => {
        setisError(false);

        if (page === 1) {
          // 👇 only replace articles on first page
          setArticles(newArticles);
        } else {
          // 👇 append if loading more (infinite scroll)
          setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        }

        if (!hasLoadedOnce) {
          setHasLoadedOnce(true);
        }

        setTotalCount(total_count);
        setIsLoadingArticles(false);
        setLoadingNextPage(false);
        setRefreshingArticles(false);
      })
      .catch((error) => {
        setIsLoadingArticles(false);
        setError(error);
        setisError(true);
        setLoadingNextPage(false);
        setRefreshingArticles(false);
      });
  }, [sortByQuery, orderByQuery, topic, page, location.key]);

  useEffect(() => {
    setIsLoadingTopics(true);
    fetchTopics()
      .then((topics) => {
        setisError(false);
        setTopics(topics);
        setIsLoadingTopics(false);
      })
      .catch((error) => {
        setisError(true);
        setIsLoadingTopics(false);
        setError(error);
      });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setPage(1);
    setIsLoadingArticles(true);
  }, [location.key]);

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSortBy(e.target.value);
    setSearchParams(newParams);
    setPage(1);
    setRefreshingArticles(true);
  };

  const handleOrderBy = (e) => {
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", e.target.value);
    setOrderBy(e.target.value);
    setSearchParams(newParams);
    setRefreshingArticles(true);
  };

  const handleFilterBy = (e) => {
    setPage(1);
    setSortBy("sort_by");
    setOrderBy("order_by");
    setIsLoadingArticles(true);
    navigate(`/articles/${e.target.value}`);
    setRefreshingArticles(true);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setLoadingNextPage(true);
      setPage((prevPage) => prevPage + 1); // Increment page
    }
  };

  if (isError) return <PageError error={error} />;
  else if (!isError) {
    return (
      <>
        <NavigationBar error={error} />
        <div className="bg-slate-950 min-h-screen flex flex-col">
          <main>
            <section className="mt-6 sm:px-6 lg:px-8">
              {hasLoadedOnce && (
                <>
                  <Header />
                  <form className="mb-8">
                    <div className="flex flex-wrap gap-4 justify-center ">
                      {/* Sort By */}
                      <div className="flex flex-col items-center relative w-fit">
                        <select
                          onChange={handleSortBy}
                          className="appearance-none bg-slate-800 text-white lg:px-3 py-3 sm:py-2 pl-3 pr-8 lg:w-60 sm:w-32 w-full border border-transparent text-sm cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                          defaultValue="sort_by"
                        >
                          <option value="sort_by" disabled>
                            Sort By
                          </option>
                          <option value="created_at">Date</option>
                          <option value="comment_count">Comment Count</option>
                          <option value="votes">Votes</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
                          <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                      </div>

                      {/* Order By */}
                      <div className="flex flex-col items-center relative w-fit">
                        <select
                          onChange={handleOrderBy}
                          className="appearance-none bg-slate-800 text-white lg:px-3 py-3 sm:py-2 pl-2 sm:pl-3 lg:w-60 w-fit sm:w-32 border-r-12  text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
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
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
                          <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                      </div>

                      {/* Filter By */}
                      <div className="flex flex-col items-center relative w-fit">
                        <select
                          onChange={handleFilterBy}
                          className="appearance-none bg-slate-800 text-white lg:px-3 py-3 sm:py-2 pl-2 sm:pl-3 lg:w-60 w-fit sm:w-32 border-r-12  text-sm border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
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
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white">
                          <i className="fa-solid fa-chevron-down text-xs"></i>
                        </div>
                      </div>
                    </div>
                  </form>
                  <p className="text-slate-300 text-center text-lg font-medium mb-6 flex items-center justify-center gap-2">
                    {!isLoadingArticles && !isLoadingTopics && hasLoadedOnce ? (
                      <>
                        <i className="fa-regular fa-newspaper text-white text-xl"></i>
                        <span>
                          {totalCount}{" "}
                          {topic
                            ? topic[0].toUpperCase() + topic.slice(1)
                            : "Total"}{" "}
                          Article{totalCount !== 1 && "s"} Available
                        </span>
                      </>
                    ) : (
                      // 👇 Invisible placeholder that occupies space
                      <span className="invisible">
                        <i className="fa-regular fa-newspaper text-xl"></i>
                        <span>0 Total Articles Available</span>
                      </span>
                    )}
                  </p>
                </>
              )}

              {/* Articles Grid */}
              <div
                className={`transition-opacity duration-300 ${
                  refreshingArticles ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6 mb-24">
                  {articles.map((article) => (
                    <ArticleCard article={article} key={article.title} />
                  ))}
                </div>
              </div>

              {loadingNextPage && articles.length < totalCount && (
                <div className="flex justify-center mb-24">
                  <LoadingSpinner />
                </div>
              )}
            </section>

            {(isLoadingArticles || isLoadingTopics) && (
              <FullscreenLoadingSpinner
                message={`${
                  refreshingArticles && hasLoadedOnce ? "Reloading" : "Loading"
                } articles...`}
              />
            )}
          </main>
          <Footer />
        </div>
      </>
    );
  }
};

export default Articles;
