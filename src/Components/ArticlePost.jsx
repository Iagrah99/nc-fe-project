import { Card, Col, Button } from "react-bootstrap"
import { useState } from "react"
import ArticleComments from "../Components/ArticleComments"
import { useNavigate } from "react-router-dom"

const ArticlePost = ({article, articleId}) => { 

  const [showComments, setShowComments] = useState(false)

  const handleDisplayComments = (e) => {
    if (!showComments) {
      e.target.innerText = "Hide Comments"
      setShowComments(true)
    } else if (showComments) {
      e.target.innerText = "Show Comments"
      setShowComments(false)
    }
  }

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return ( 
    <Col xl="6" md="6" sm="12" xs="12">
    <Card bg="dark" style={{ width: '100%'}} >
     <Card.Img src={article.article_img_url} style={{height: "50%" }} />
     <Card.Body>
       <Card.Title>{article.title}</Card.Title>
       <Card.Text>By {article.author}</Card.Text>
       <Button variant="danger" onClick={handleClick}>Go Back</Button>
       <div style={{marginBlock: "15px"}}></div>
       <Card.Text>{article.body}</Card.Text>
       <Button onClick={handleDisplayComments} variant="primary">Show Comments</Button>
     </Card.Body>
   </Card>
   { showComments ? <ArticleComments articleId={articleId}/> : null }
  </Col>
   );
}
 
export default ArticlePost;