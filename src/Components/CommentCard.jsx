import { Button, Card, Col } from "react-bootstrap"
import { UserContext } from '../contexts/UserContext';
import { useContext, useState } from 'react';
import { removeComment } from "../utils/api";
import { format } from 'date-fns'

const CommentCard = ({comment, setDeleted}) => {  
  const { loggedInUser } = useContext(UserContext);
  const [deletingComment, setDeletingComment] = useState(false)
  const [deletingError, setDeletingError] = useState("")
  const datePosted = comment.created_at

  const formattedDate = format(datePosted, "dd/MM/yyyy 'at' HH:mm");

  const handleDelete = (e) => {
    e.preventDefault()
    e.target.disabled = true
    setDeletingComment(comment.comment_id)

    const deletedComment = {
      username: comment.author,
      body: comment.body
      }

    removeComment(comment.comment_id, deletedComment).then(() => {
      setDeleted(comment.comment_id)
      setDeletingComment(false)
      setDeletingError("")
    }).catch((err) => {
      setDeletingComment(false)
      setDeletingError("There was a problem deleting your comment, please try again.")
    })
  }

  return ( 
    <Col xl="12" md="12" sm="12" xs="12">
     <Card bg="dark" style={{ width: '100%'}} >
      <Card.Body>
        <Card.Title>By {comment.author}</Card.Title>
        <Card.Text>{comment.body}</Card.Text>
        <Card.Text>Votes: {comment.votes}</Card.Text>
        <Card.Text>Posted On: {formattedDate}</Card.Text>
        {loggedInUser.username === comment.author ? <Button variant="danger" onClick={handleDelete}>Delete Comment</Button>: null}
        {deletingComment ? <p style={{marginBlock: "15px"}}>Deleting Your Comment...</p> : null}
        {deletingError ? <p style={{marginBlock: "15px"}}>{deletingError}</p> : null}
      </Card.Body>
    </Card>
   </Col>
   );
}
 
export default CommentCard;