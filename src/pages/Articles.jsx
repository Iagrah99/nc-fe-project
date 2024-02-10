import { Col, Container, Row, Form } from 'react-bootstrap';
import ArticleCard from '../Components/ArticleCard';
import { fetchArticles } from '../utils/api';
import { useEffect, useState } from 'react';
import PageLoading from '../Components/PageLoading';
import NavigationBar from "../Components/Navbar";
import Footer from '../Components/Footer';
import PageError from '../Components/PageError';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from "../css/TextCSSModule.module.css"
import Header from '../Components/Header';

const Articles = () => {
  document.title = 'NC News | Articles';

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false)
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by");
  const {topic} = useParams()

  useEffect(() => {
    fetchArticles(topic, sortByQuery, orderByQuery).then((articles) => {
      setisError(false)
      setArticles(articles);
      setIsLoading(false);  
    }).catch((error) => {
      setIsLoading(false)
      setError(error)
      setisError(true)
    })
  }, [sortByQuery, orderByQuery, isError, topic]);

  const handleSortBy = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', e.target.value);
    setSearchParams(newParams);
  }

  const handleOrderBy = (e) => {
     const newParams = new URLSearchParams(searchParams);
     newParams.set('order_by', e.target.value);
     setSearchParams(newParams);
  }

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError error={error}/>

  else if (!isError) {
    return (
      <Container style={{minHeight: "100vh"}} fluid="xl">
        <NavigationBar error={error}/>
        <Header/>
        <Form style={{marginBlock: "3rem"}}>
          <Row className="justify-content-center">
            <Col md="auto" sm="auto" xs="auto">
            <Form.Group className="mb-3" controlId="SortByGroup">
            <p style={{textAlign: "center"}}>Sort By</p>
            <Form.Select aria-label="select-category" onChange={handleSortBy}>
              <option value="created_at" id="date">Date</option>
              <option value="comment_count" id="comment_count">Comment Count</option>
              <option value="votes" id="votes">Votes</option>
            </Form.Select>
            </Form.Group>
          </Col>
          <Col md="auto" sm="auto" xs="auto">
            <Form.Group className="mb-3" onChange={handleOrderBy}>
            <p style={{textAlign: "center"}}>Order By</p>
            <Form.Select aria-label="select-category">
              <option value="desc" id="descending">Descending (Default)</option>
              <option value="asc" id="ascending">Ascending</option>
            </Form.Select>
            </Form.Group>
            </Col>
            </Row>
          </Form>
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
  }
};

export default Articles;
