import { Card, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'

const ArticleCard = ({article, topic}) => {
  const postedDate = article.created_at

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/articles/article/${id}`)
  }

  return ( 
    <Col xl="2" md="6" sm="12" xs="12">
      <article>
      <Card bg="dark" style={{ width: '100%', height: "41rem"}} >
        <Card.Img src={article.article_img_url} style={{maxHeight: "20rem", minHeight: "20rem"}} alt={`An article image about ${article.topic}`}/>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>Topic: {article.topic}</Card.Text>
          <Card.Text>Author: {article.author}</Card.Text>
          <Card.Text>Posted On: {formattedDate}</Card.Text>
          <Card.Text>Votes: {article.votes}</Card.Text>
          <Card.Text>Comment Count: {article.comment_count}</Card.Text>
        </Card.Body>
        <Button onClick={() => handleClick(article.article_id)} variant="danger" style={{fontSize: "1rem"}}>Visit Article</Button>
      </Card>
    </article>
    <div style={{marginBlock: "75px"}}></div>
   </Col>   
  )
}
 
export default ArticleCard;