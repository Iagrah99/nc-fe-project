import { Card, Col, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { decrementArticleVotes, incrementArticleVotes} from "../utils/api"
import CommentSection from "./CommentSection"
import "../css/Voting.css"
import imgStyles from "../css/ImageCSSModule.module.css"
import { format } from 'date-fns'

const ArticlePost = ({article, articleId}) => { 

  const [showComments, setShowComments] = useState(true)
  const [articleVotes, setArticleVotes] = useState(article.votes)
  const [activeBtn, setActiveBtn] = useState("none")
  const [error, setError] = useState(null);

  const postedDate = article.created_at

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

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

  return ( 
    <Col xl="12" md="12" sm="12" xs="12">
    <Card bg="red" style={{ width: '100%'}}>
    <Card.Body >
    <Card.Title style={{marginBlock: "2rem", textAlign: "center", fontSize: "2rem"}}>{article.title}</Card.Title>
    <figure style={{display: "flex"}}>
      <Card.Img src={article.article_img_url} className={imgStyles.articleImg} alt={`An article image about ${article.topic}`} />
     </figure>
     <Button style={{display: "block", marginBottom: "15px"}} variant="danger" onClick={handleClick}>Go Back</Button>
      <Card.Text>Posted: {formattedDate} By {article.author}</Card.Text>   
      <Card.Text style={{marginBlock: "1rem"}}>{article.body}</Card.Text>
      {error ? <p>{error}</p> : null}
      </Card.Body>
      <Card.Footer>
      <Card.Text><span style={{marginRight: "1rem"}}>Comments: {article.comment_count}</span> Votes: {articleVotes}</Card.Text>
      <hr />
      <Card.Text>What did you think of it?</Card.Text>
        <button title="I like this" className={`btn like-btn ${activeBtn === "like" ? "like-active" : ""}`} onClick={() => handleReactionClick("like")}><span    className="material-symbols-outlined">thumb_up</span>
        </button>
        <button title="I dislike this" className={`btn dislike-btn ${activeBtn === "dislike" ? "dislike-active" : ""}`} onClick={() => handleReactionClick("dislike")}> <span className="material-symbols-outlined">thumb_down</span> 
        </button>
      <Button style={{display: "block", marginBlock: "25px"}} onClick={handleDisplayComments} variant="dark">Hide Comments</Button>
      </Card.Footer>
   </Card>
   
   { showComments ? <CommentSection articleId={articleId}/> : null }
  </Col>
   );
}
 
export default ArticlePost;