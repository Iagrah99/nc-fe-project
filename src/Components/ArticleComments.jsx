import { Row, Col, Card } from "react-bootstrap"
import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../utils/app";
import CommentCard from "./CommentCard";
import PageLoading from "./PageLoading";
import CommentsLoading from "./CommentsLoading";
const ArticleComments = ({articleId}) => {

  const [comments, setComments] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCommentsByArticleId(articleId).then((response) => {
      setComments(response.data)
      setIsLoading(false)
    })
    
  }, [])

  if (isLoading) {
    return (
      <CommentsLoading/>
    )
  }

  return ( 
    <Row>
    {comments.map((comment) => (
      <CommentCard comment={comment} key={comment.comment_id}/>
    ))}
    <div style={{marginBlock: "30px"}}></div>
   </Row>
   );
}
 
export default ArticleComments;