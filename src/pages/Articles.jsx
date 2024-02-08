import { Container } from 'react-bootstrap';
import Header from '../Components/Header';
import ArticleCard from '../Components/ArticleCard';
import { fetchArticles } from '../utils/api';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PageLoading from '../Components/PageLoading';
import NavigationBar from "../Components/Navbar";
import Footer from '../Components/Footer';
import PageError from '../Components/PageError';

const Articles = () => {
  document.title = 'NC News | Articles';

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false)

  useEffect(() => {
    fetchArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false)
      setisError(true)
    });
  }, []);

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError/>

  return (
    <Container style={{minHeight: "100vh"}} fluid="xl">
      <NavigationBar/>
      <Header />
        <Container fluid="xs">
          <Row>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.article_id} />
            ))}
          </Row>
        </Container>
      <Footer/>
    </Container>
  );
};

export default Articles;
