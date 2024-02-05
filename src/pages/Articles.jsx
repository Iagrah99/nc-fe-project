import { Container } from "react-bootstrap";
import Header from "../Components/Header";
import ArticleCard from "../Components/ArticleCard";
import { fetchArticles } from "../utils/app";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";


const Articles = () => {
  document.title = "NC News | Articles"

  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetchArticles().then((response) => {
      setArticles(response.data.articles)
    })
    
  }, []);

  console.log(articles);

  return ( 
    <Container fluid="xl">
    <div style={{marginBlock: "15px"}}></div>
    <Header/>
    <div style={{marginBlock: "75px"}}></div>
    <div>
    <Container fluid="xs">
        <Row>
          {articles.map(article => (
            <ArticleCard article={article}/>
          ))}
        </Row>
      </Container>
      </div>
    </Container>
   );
}
 
export default Articles;