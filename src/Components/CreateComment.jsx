import { Form, Col, Card, Row, Button, FloatingLabel } from "react-bootstrap"
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import textStyles from "../css/TextCSSModule.module.css"
import { addComment } from "../utils/api";
import { useNavigate } from "react-router-dom"

const CreateComment = ({articleId, setSuccess}) => {
  const [comment, setComment] = useState("")
  const [commentPosted, setCommentPosted] = useState(false)
  const [isError, setisError] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate()

  const addNewComment=(postedComment) => {
    console.log(postedComment);
    addComment(articleId, postedComment).then(() => {
      setCommentPosted(true)
      setComment("")
      setSuccess(true)

    }).catch((error) => {
      setCommentPosted(false)
      setisError(true)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target);
    
    const newComment = {
      username: loggedInUser.username,
      body: comment
      }

    addNewComment(newComment)
  }

  if (isError) return <PageError />;

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
        <Form.Control as="textarea" rows={3} placeholder="What are your thoughts?" value={comment} required onChange={(e) => {
          setComment(e.target.value); setCommentPosted(false)
          }} />
        <div style={{marginBlock: "25px"}}/>
        <Button type="submit" variant="primary">Post Comment</Button>
        {commentPosted ? <p style={{marginBlock: "15px"}}>Posted Successfully!</p> : null}
      </Card.Body>
      
      </Form.Group>
      
    </Form>
    </Card>
   </Col>
   ); 
}
 
export default CreateComment;