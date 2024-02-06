import { Container, Card, Col, Button } from "react-bootstrap"
import Header from "../Components/Header"
import { fetchArticleById } from "../utils/app"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PageLoading from '../Components/PageLoading';
import ArticlePost from "../Components/ArticlePost"

const ViewArticle = () => {

  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams()

  document.title = `NC News | ${article.title}`

  useEffect(() => {
    fetchArticleById(articleId).then((response) => {
      setArticle(response.data.article)
      setIsLoading(false)
    })
    
  }, [])

  if (isLoading) {
    return (
      <PageLoading/>
    );
  }

  return ( 
    <Container fluid="xl">
    <div style={{marginBlock: "15px"}}></div>
    <Header/>
    <div style={{marginBlock: "30px"}}></div>
    <main style={{display: "flex", justifyContent: "center"}}>
      <ArticlePost article={article} articleId={articleId}/>
   </main>   
   </Container>
   )
}
 
export default ViewArticle;