import { Container, Row } from "react-bootstrap";
import NavigationBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, useEffect, useContext } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "../Components/ArticleCard";
import textStyles from "../css/TextCSSModule.module.css";
import { UserContext } from "../contexts/UserContext";
import PageLoading from "../Components/PageLoading";
import PageError from "../Components/PageError";
import Main from "../styled_components/StyledMain";
import { H1, H2 } from "../styled_components/StyledHeadings"

const Articles = () => {
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
    <Container fluid="xs">
      <NavigationBar />
      <Main>
        {isLoading ? (
          <PageLoading contentType={`${loggedInUser.username}'s Articles`} />
        ) : (
          <Container fluid="xs">
            <H1>Hey {loggedInUser.username}!</H1>
            <H2>Here Are Your Articles...</H2>
            <Row>
              {articles.map((article) =>
                article.author === loggedInUser.username ? (
                  <ArticleCard article={article} key={article.article_id} />
                ) : null
              )}
            </Row>
            <section>
              <H2>Post Article</H2>

            </section>
          </Container>
        )}
      </Main>
      <Footer />
    </Container>
  );
};

export default Articles;
