import { Card, Container, Row } from 'react-bootstrap';
import Header from '../Components/Header';
import NavigationBar from "../Components/Navbar";
import Footer from '../Components/Footer';
import { useState, useEffect, useContext } from 'react';
import { fetchArticles } from '../utils/api';
import ArticleCard from '../Components/ArticleCard';
import textStyles from "../css/TextCSSModule.module.css"
import { UserContext } from '../contexts/UserContext';
import PageLoading from '../Components/PageLoading';
import PageError from '../Components/PageError';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setisError] = useState(false)
  const [error, setError] = useState(null);
  const { loggedInUser } = useContext(UserContext);
  document.title = 'NC News | Articles';

  useEffect(() => {
    fetchArticles().then((articles) => {
      setisError(false)
      setArticles(articles);
      setIsLoading(false);  
    }).catch((error) => {
      setIsLoading(false)
      setError(error)
      setisError(true)
    })
  }, [isError]);

  // Next feature to Include:
  // Fetch User Comments, show which article each one belongs to with their votes.

  if (isLoading) return <PageLoading/>
  if (isError) return <PageError error={error}/>

    return (
      <Container fluid="xl">
        <NavigationBar/>
        <main style={{minHeight: "75vh"}}>
        <h1 className={textStyles.center} style={{margin: "3rem 0 2.5rem 0"}}>Hey {loggedInUser.username}!</h1>
        

        <Container fluid="xs">
        
            <Row>
            <h2 className={textStyles.center} style={{marginBlock: "1.5rem"}}>Your Articles</h2>
              {articles.map((article) => (
                 article.author === loggedInUser.username ? (
                  <ArticleCard article={article} key={article.article_id} />
                ) : null
              ))}
            </Row>
          </Container>
        </main>
        <Footer/>
      </Container>
    );
}

export default Articles;
