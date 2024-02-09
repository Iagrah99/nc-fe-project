import { Form, Col, Card, Row, Button} from "react-bootstrap"
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import textStyles from "../css/TextCSSModule.module.css"
import { addComment } from "../utils/api";
import { useNavigate } from "react-router-dom"

const CreateComment = ({articleId, setSuccess}) => {
  const [comment, setComment] = useState("")
  const [commentPosted, setCommentPosted] = useState(false)
  const [commentPostingError, setCommentPostingError] = useState(false)
  const [commentIsOnlySpaces, setCommentIsOnlySpaces] = useState(false)
  const [commentPosting, setCommentPosting] = useState(false)
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate()

  const addNewComment=(postedComment, e) => {
    addComment(articleId, postedComment).then((commentFromApi) => {
      e.target[2].disabled = false
      setCommentPosted(true)
      setCommentPosting(false)
      setCommentIsOnlySpaces(false);
      setComment("")
      setSuccess(commentFromApi.comment_id)

    }).catch((error) => {
      setCommentPosted(false)
      setCommentPostingError(true)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    e.target[2].disabled = true
    setCommentPosting(true)

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      setCommentIsOnlySpaces(true);
      return;
    } else {
        const newComment = {
        username: loggedInUser.username,
        body: comment
        }
    addNewComment(newComment, e)
    }
  }

  return ( 
    <Col xl="12" md="12" sm="12" xs="12">
    <Card style={{ width: '100%'}}> 
    <Form onSubmit={handleSubmit}>
      <h3 style={{marginBlock: "25px"}} className={textStyles.center}>Join The Discussion</h3>
      <Form.Group className="mb-3" controlId="formGroupUsername">
      <Card.Body>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={loggedInUser.username} disabled/>
      </Card.Body>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupComment">
      <Card.Body>
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="What are your thoughts?" maxLength={2500} value={comment} required onChange={(e) => {
          const inputValue = e.target.value;
          setComment(inputValue);

          inputValue.trim().length === 0;

          const containsOnlySpaces = /^\s+$/.test(inputValue);
          setCommentIsOnlySpaces(containsOnlySpaces);
          
          const disableButton = containsOnlySpaces || inputValue.trim().length === 0;
          e.target.form[2].disabled = disableButton;

          setCommentPosted(false);
         }}/>
        <div style={{marginBlock: "25px"}}/>
        {comment.length >= 2500 ? <p style={{marginBlock: "15px", color: "red"}}>Your comment is too long! The max character length is 2500.</p> : null}
        {commentIsOnlySpaces && comment.length > 0 ? <p style={{marginBlock: "15px", color: "red"}}>Can't only use spaces!</p> : null}
        <Button type="submit" variant="primary">Post Comment</Button>
        {commentPosted ? <p style={{marginBlock: "15px", color: "green"}}>Posted Successfully!</p> : null}
        {commentPosting ? <p style={{marginBlock: "15px"}}>Posting Your Comment</p> : null}
        {commentPostingError ? <p style={{marginBlock: "15px"}}>Couldn't post comment, try again later.</p> : null}
      </Card.Body>
      
      </Form.Group>
      
    </Form>
    </Card>
   </Col>
   ); 
}
 
export default CreateComment;