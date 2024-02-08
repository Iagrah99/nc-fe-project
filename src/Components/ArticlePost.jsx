import { Card, Col, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { decrementArticleVotes, incrementArticleVotes} from "../utils/api"
import CommentSection from "./CommentSection"
import "../css/Voting.css"

const ArticlePost = ({article, articleId}) => { 

  const [showComments, setShowComments] = useState(false)
  const [articleVotes, setArticleVotes] = useState(article.votes)
  const [activeBtn, setActiveBtn] = useState("none")
  const [error, setError] = useState(null);

  const handleDisplayComments = (e) => {
    e.target.innerText = showComments ? "Show Comments" : "Hide Comments";
    setShowComments(showComments ? false : true);
  }
  
  const handleReactionClick = (reaction) => {
    if (activeBtn === "none") {
      if (reaction === "like") {
        setArticleVotes((currentVotes) => currentVotes + 1)
        setActiveBtn("like");
        incrementArticleVotes(articleId).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes - 1)
        })
      } else if (reaction === "dislike") {
        setArticleVotes((currentVotes) => currentVotes - 1)
        setActiveBtn("dislike");
        decrementArticleVotes(articleId).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes + 1)
        })
      }
    } else if (activeBtn === reaction) {
      if (reaction === "like") {
        setArticleVotes((currentVotes) => currentVotes - 1)
        decrementArticleVotes(articleId).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes + 1)
        })
      } else if (reaction === "dislike") {
        setArticleVotes((currentVotes) => currentVotes + 1)
        incrementArticleVotes(articleId).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes - 1)
        })
      }
      setActiveBtn("none");
    } else if (activeBtn !== reaction) {
      if (reaction === "like") {
        setArticleVotes((currentVotes) => currentVotes + 2)
        setActiveBtn("like");
        incrementArticleVotes(articleId, 2).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes - 2)
        })
      } else if (reaction === "dislike") {
        setArticleVotes((currentVotes) => currentVotes - 2)
        setActiveBtn("dislike");
        decrementArticleVotes(articleId, 2).catch((err) => {
          setError("Error updating vote")
          setArticleVotes((currentVotes) => currentVotes + 2)
        })
      }
    }
  };
  

  const navigate = useNavigate()

  const handleClick = () => navigate(-1)
  
  const datePosted = article.created_at.slice(0, -14)

  return ( 
    <Col xl="12" md="12" sm="12" xs="12">
    <Card bg="red" style={{ width: '100%'}} >
    <Card.Body >
    <figure style={{display: "flex"}}>
      <Card.Img src={article.article_img_url} style={{width: "100%", margin: "auto"}} alt={`An article image about ${article.topic}`} />
     </figure>
     <Button style={{display: "block", marginBottom: "15px"}} variant="danger" onClick={handleClick}>Go Back</Button>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>By {article.author}</Card.Text>
      <Card.Text>Posted: {datePosted}</Card.Text>
      <Card.Text>Votes: {articleVotes}</Card.Text> 
      {error ? <p>{error}</p> : null}
      <Card.Text>{article.body}</Card.Text>
        <button title="I like this" className={`btn like-btn ${activeBtn === "like" ? "like-active" : ""}`} onClick={() => handleReactionClick("like")}><span    className="material-symbols-outlined">thumb_up</span>
        </button>
        <button title="I dislike this" className={`btn dislike-btn ${activeBtn === "dislike" ? "dislike-active" : ""}`} onClick={() => handleReactionClick("dislike")}> <span className="material-symbols-outlined">thumb_down</span> 
        </button>
      <Button style={{display: "block", marginBlock: "25px"}} onClick={handleDisplayComments} variant="primary">Show Comments</Button>
     </Card.Body>
   </Card>
   
   { showComments ? <CommentSection articleId={articleId}/> : null }
  </Col>
   );
}
 
export default ArticlePost;