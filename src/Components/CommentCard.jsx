import { Card, Col } from "react-bootstrap"

const CommentCard = ({comment}) => {
  const datePosted = comment.created_at.slice(0, -14)
  return ( 
    <Col xl="12" md="12" sm="12" xs="12">
     <Card bg="dark" style={{ width: '100%'}} >
      <Card.Body>
        <Card.Title>By {comment.author}</Card.Title>
        <Card.Text>{comment.body}</Card.Text>
        <Card.Text>Votes: {comment.votes}</Card.Text>
        <Card.Text>Posted: {datePosted}</Card.Text>
      </Card.Body>
    </Card>
   </Col>
   );
}
 
export default CommentCard;