import ArticleCard from "../Components/ArticleCard";
import { fetchArticles, fetchTopics } from "../utils/api";
import { useEffect, useState } from "react";
import PageLoading from "../Components/PageLoading";
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
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const [totalCount, setTotalCount] = useState(0);

  const { topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (page === 1 && hasLoadedOnce) {
      setRefreshingArticles(true); // Only show "Reloading..." if not the first load
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
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <NavigationBar error={error} />

        <main>
          <section className="mt-6 sm:px-6 lg:px-8">
            {hasLoadedOnce && (
              <>
                <Header />
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
                    <div className="flex flex-col items-center">
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
                            {topic.slug[0].toUpperCase() + topic.slug.slice(1)}{" "}
                            Articles
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
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
    );
  }
};

export default Articles;
