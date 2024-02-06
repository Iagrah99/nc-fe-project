import { Container, Card, Col, Button } from "react-bootstrap"
import Header from "../Components/Header"
import { fetchArticleById } from "../utils/app"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PageLoading from '../Components/PageLoading';

const ViewArticle = () => {

  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  

  document.title = `NC News | ${article.title}`

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const idQuery = searchParams.get("article_id")

  useEffect(() => {
    fetchArticleById(idQuery).then((response) => {
      setArticle(response.data.article)
      setIsLoading(false)
    })
    
  }, [])

  const handleClick = () => {
    navigate(-1)
  }

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
    <Col xl="6" md="6" sm="12" xs="12">
     <Card bg="dark" style={{ width: '100%'}} >
      <Card.Img src={article.article_img_url} style={{height: "50%" }} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>By {article.author}</Card.Text>
        <Button variant="danger" onClick={handleClick}>Go Back</Button>
        <div style={{marginBlock: "15px"}}></div>
        <Card.Text>{article.body}</Card.Text>
      </Card.Body>
    </Card>
   </Col>
   </main>   
   </Container>
   )
}
 
export default ViewArticle;