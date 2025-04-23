import { Container } from "react-bootstrap";
import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../utils/api";
import CreateArticle from "../Components/CreateArticle";
import { UserContext } from "../contexts/UserContext";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import Main from "../styled_components/StyledMain";
import { H1 } from "../styled_components/StyledHeadings"

const Home = () => {
  const [articles, setArticles] = useState([]);
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

  // Next feature to Include:
  // Fetch User Comments, show which article each one belongs to with their votes.

  if (isError) return <PageError error={error} />;

  return (
    <>
      <NavigationBar />
      <Main>
        {isLoading ? (
          <PageLoading contentType="Your Homepage" />
        ) : (
          <div>
            <article id="post-article">
              <CreateArticle />
            </article>
          </div>
        )
        }
      </Main >
      <Footer />
    </>
  );
};

export default Home;
