import Header from "../Components/Header";
import { fetchArticleById} from "../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import ArticlePost from "../Components/ArticlePost";
import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ViewArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { articleId } = useParams();


  useEffect(() => {
    fetchArticleById(articleId)
      .then((article) => {
        setIsError(false);
        setArticle(article);
        setIsLoading(false);
        document.title = `NC News | ${article.title}`;
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        setIsError(true);
      });
  }, []);

 

  if (isError) return <PageError error={error} />;

  return (
    <>
      <NavigationBar />

      <>
        <main className="flex-1 min-h-screen bg-slate-950">
          {isLoading ? (
            <PageLoading contentType="Article" />
          ) : (
            <>
              <Header />
              <article className="pb-40 bg-slate-950">
                <ArticlePost article={article} articleId={articleId} />
              </article>
            </>
          )}
        </main>
      </>

      <Footer />
    </>
  );
};

export default ViewArticle;
