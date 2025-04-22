import { Card, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import { CardDiv } from "../styled_components/StyledCardDiv"

const ArticleCard = ({ article }) => {
  const postedDate = article.created_at

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const navigate = useNavigate()
  const handleClick = (id) => {
    navigate(`/articles/article/${id}`)
  }

  return (
    <Col xxl="3" xl="3" lg="6" md="6" sm="12" xs="12">
      <CardDiv>
        <Card bg="dark" style={{ minHeight: "42rem" }} >
          <Card.Img src={article.article_img_url} style={{ height: "20rem" }} alt={`An article image about ${article.topic}`} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>Topic: {article.topic}</Card.Text>
            <Card.Text>Author: {article.author}</Card.Text>
            <Card.Text>Posted On: {formattedDate}</Card.Text>
            <Card.Text>Votes: {article.votes}</Card.Text>
            <Card.Text>Comment Count: {article.comment_count}</Card.Text>
          </Card.Body>
          <Button onClick={() => handleClick(article.article_id)} variant="danger" style={{ fontSize: "1rem" }}>Visit Article</Button>
        </Card>
        <div className="mb-5"></div>
      </CardDiv>
    </Col>
  )
}

export default ArticleCard;