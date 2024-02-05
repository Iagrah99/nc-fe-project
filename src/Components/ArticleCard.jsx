import { Card, Col, Button } from "react-bootstrap";

const ArticleCard = ({article}) => {
  return ( 
    <Col xl="4" md="6" sm="12" xs="12" key={article.article_id}>
     <Card bg="dark" style={{ width: '100%', height: "40rem", cursor: "pointer"}}>
      <Card.Img src={article.article_img_url} style={{maxHeight: "20rem", minHeight: "20rem"}} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>Topic: {article.topic}</Card.Text>
        <Card.Text>Author: {article.author}</Card.Text>
        <Card.Text>Created At: {article.created_at}</Card.Text>
        <Card.Text>Votes: {article.votes}</Card.Text>
        <Card.Text>Comment Count: {article.comment_count}</Card.Text>     
      </Card.Body>
      <Button variant="danger">Visit Article</Button>
    </Card>
    <div style={{marginBlock: "75px"}}></div>
   </Col>   
  );
}
 
export default ArticleCard;