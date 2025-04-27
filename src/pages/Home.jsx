import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ArticleCard from "../Components/ArticleCard";
import { useState, useEffect, useContext } from "react";
import { fetchArticles, fetchUserComments } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import Header from "../Components/Header";
import CommentPreviewCard from "../Components/CommentPreviewCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [error, setError] = useState(null);
  const { loggedInUser } = useContext(UserContext);
  document.title = "NC News | Home";

  useEffect(() => {
    fetchArticles()
      .then((articles) => {
        setisError(false);
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setisError(true);
      });
  }, [isError]);

  useEffect(() => {
    fetchUserComments(loggedInUser.username)
      .then(({ comments }) => {
        setisError(false);
        setComments(comments);
        setIsLoading(false);
        console.log(comments);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setisError(error);
      });
  }, [isError]);

  // Next feature to Include:
  // Fetch User Comments, show which article each one belongs to with their votes.

  if (isError) return <PageError error={error} />;

  return (
    <>
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <NavigationBar />
        <main>
          {isLoading ? (
            <PageLoading contentType="Your Homepage" />
          ) : (
            <article className="flex flex-col justify-center mt-6 sm:px-6 lg:px-8">
              <Header />
              <section>
                <h1 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  Your Articles
                </h1>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6 mb-24">
                {articles.map(
                  (article) =>
                    loggedInUser.username === article.author && (
                      <ArticleCard article={article} />
                    )
                )}
              </div>

              <section>
                <h1 className="bg-slate-950 text-center text-3xl py-10 text-white">
                  Your Top Comments
                </h1>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-6 mb-24">
                {comments.map(
                  (comment) =>
                    loggedInUser.username === comment.author &&
                    comment.votes > 15 && (
                      <CommentPreviewCard comment={comment} user={loggedInUser} />
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
