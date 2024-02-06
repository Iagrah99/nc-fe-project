import { Card, Col, Button } from "react-bootstrap"
import { useState } from "react"
import ArticleComments from "../Components/ArticleComments"
import { useNavigate } from "react-router-dom"
import { decrementArticleVotes, incrementArticleVotes,} from "../utils/api"

const ArticlePost = ({article, articleId}) => { 

  const [showComments, setShowComments] = useState(false)
  const [articleVotes, setArticleVotes] = useState(article.votes)
  const [error, setError] = useState(null);
  const [variantColour, setVariantColour] = useState("success")

  const handleDisplayComments = (e) => {
    if (!showComments) {
      e.target.innerText = "Hide Comments"
      setShowComments(true)
    } else if (showComments) {
      e.target.innerText = "Show Comments"
      setShowComments(false)
    }
  }

  const handleIncrementVotes = (e) => {
    if (e.target.innerText === "Upvote") {
      e.target.innerText = "Downvote"
      setVariantColour("danger")
      setArticleVotes((currentVotes) => currentVotes + 1)
      setError(null);
      incrementArticleVotes(articleId).then((response) => {
        setArticleVotes(response.data.article.votes)
       }).catch((err) => {
        setError("Error updating votes, please try again")
        setArticleVotes((currentVotes) => currentVotes - 1)
       })
    } else if (e.target.innerText === "Downvote") {
      e.target.innerText = "Upvote"
      setVariantColour("success")
      setArticleVotes((currentVotes) => currentVotes - 1)
      decrementArticleVotes(articleId).then((response) => {
        setArticleVotes(response.data.article.votes)
       }).catch((err) => {
        setError("Error updating votes, please try again")
        setArticleVotes((currentVotes) => currentVotes + 1)
       })
    }
  }

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  const datePosted = article.created_at.slice(0, -14)

  return ( 
    <Col xl="6" md="8" sm="10" xs="12">
    <Card bg="dark" style={{ width: '100%'}} >
     <Card.Img src={article.article_img_url} style={{height: "50%" }} alt={`An article image about ${article.topic}`} />
     <Card.Body>
     <div style={{marginBlock: "15px"}}></div>
     <Button variant="danger" onClick={handleClick}>Go Back</Button>
     <div style={{marginBlock: "15px"}}></div>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>By {article.author}</Card.Text>
      <Card.Text>Posted: {datePosted}</Card.Text>
      <Card.Text>Votes: {articleVotes}</Card.Text> 
      {error ? <p>{error}</p> : null}
      <Card.Text>{article.body}</Card.Text>
      <div style={{marginBlock: "15px"}}></div>
      <Button style={{marginRight: "10px"}} onClick={(e) => handleIncrementVotes(e)} variant={variantColour}>Upvote</Button>
      <div style={{marginBlock: "15px"}}></div>
      <Button onClick={handleDisplayComments} variant="primary">Show Comments</Button>
     </Card.Body>
   </Card>
   { showComments ? <ArticleComments articleId={articleId}/> : null }
  </Col>
   );
}
 
export default ArticlePost;