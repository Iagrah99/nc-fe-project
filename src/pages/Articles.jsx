import { Container } from 'react-bootstrap';
import Header from '../Components/Header';
import ArticleCard from '../Components/ArticleCard';
import { fetchArticles } from '../utils/api';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import PageLoading from '../Components/PageLoading';

const Articles = () => {
  document.title = 'NC News | Articles';

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <PageLoading/>
    );
  }

  return (
    <Container fluid="xl">
      <div style={{ marginBlock: '15px' }}></div>
      <Header />
      <div style={{ marginBlock: '75px' }}></div>
      <div>
        <Container fluid="xs">
          <Row>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.article_id} />
            ))}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default Articles;
