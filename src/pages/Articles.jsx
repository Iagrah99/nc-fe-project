import ArticleCard from "../Components/ArticleCard";
import { fetchArticles, fetchTopics } from "../utils/api";
import { useEffect, useState } from "react";
import PageLoading from "../Components/PageLoading";
import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageError from "../Components/PageError";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Main from "../styled_components/StyledMain";

const Articles = () => {
  document.title = "NC News | Articles";

  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState([])
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState("sort_by");
  const [orderBy, setOrderBy] = useState("order_by");

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by");

  const { topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(topic, sortByQuery, orderByQuery)
      .then((articles) => {
        setisError(false);
        setArticles(articles);
        setIsLoadingArticles(false);
      })
      .catch((error) => {
        setIsLoadingArticles(false);
        setError(error);
        setisError(true);
      });
  }, [sortByQuery, orderByQuery, isError, topic]);

  useEffect(() => {
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

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSortBy(e.target.value)
    setSearchParams(newParams);
  };

  const handleOrderBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", e.target.value);
    setOrderBy(e.target.value)
    setSearchParams(newParams);
  };

  const handleFilterBy = (e) => {
    setSortBy("sort_by")
    setOrderBy("order_by")
    navigate(`/articles/${e.target.value}`);
  };

  if (isError) return <PageError error={error} />;
  else if (!isError) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <NavigationBar error={error} />
    
        <main className="flex-grow">
          {isLoadingArticles ? (
            <PageLoading contentType={`All ${topic ? topic : ""} Articles`} />
          ) : (
            <section className="mt-6 px-4 sm:px-6 lg:px-8">
              <Header />
    
              {/* Filter Controls */}
              <form className="mb-10">
                <div className="flex flex-wrap gap-6 lg:justify-center sm:justify-between ">
                  {/* Sort By */}
                  <div className="flex flex-col items-center">
                    <select
                      onChange={handleSortBy}
                      className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-28 border-r-12 border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                      defaultValue={"sort_by"}
                      value={sortBy}
                    >
                      <option value="sort_by" id="sort_by">Sort By</option>
                      <option value="created_at" id="date">Date</option>
                      <option value="comment_count" id="comment_count">Comment Count</option>
                      <option value="votes" id="votes">Votes</option>
                    </select>
                  </div>
    
                  {/* Order By */}
                  <div className="flex flex-col items-center">
                    <select
                      onChange={handleOrderBy}
                      className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-28 border-r-12 border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                      defaultValue={"order_by"}
                      value={orderBy}
                    >
                      <option value="order_by" id="order_by" disabled>Order By</option>
                      <option value="desc" id="descending">Descending (Default)</option>
                      <option value="asc" id="ascending">Ascending</option>
                    </select>
                  </div>
    
                  {/* Filter By */}
                  <div className="flex flex-col items-center">
                    <select
                      onChange={handleFilterBy}
                      className="bg-slate-800 text-white lg:px-3 py-2 lg:w-60 w-28 border-r-12 border-transparent cursor-pointer rounded shadow focus:outline-none focus:ring-2 focus:ring-white"
                      defaultValue={"filter_by"}
                    >
                      <option value="filter_by" id="filter_by" disabled>Filter By</option>
                      {topics.map((topic) => (
                        <option value={topic.slug} id={topic.slug} key={topic.slug}>
                          {topic.slug[0].toUpperCase() + topic.slug.slice(1)} Articles
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
    
              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                {articles.map((article) => (
                  <ArticleCard article={article} key={article.article_id} />
                ))}
              </div>
            </section>
          )}
        </main>
    
        <Footer />
      </div>
    );
    
  }
};

export default Articles;
