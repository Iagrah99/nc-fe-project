import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { decrementArticleVotes, incrementArticleVotes} from "../utils/api"
import CommentSection from "./CommentSection"
import "../css/Voting.css"
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto bg-gray-800 text-white ">
      <div className="text-white overflow-hidden">
        <div className="p-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-8">{article.title}</h1>
  
          {/* Image */}
          <figure className="flex justify-center mb-6">
            <img
              src={article.article_img_url}
              alt={`An article image about ${article.topic}`}
              className="w-full rounded"
            />
          </figure>
  
          {/* Go Back */}
          {/* <button
            onClick={handleClick}
            className="block mb-6 bg-slate-900 text-white cursor-pointer font-medium px-4 py-2 rounded hover:bg-slate-800 transition"
          >
            Go Back
          </button> */}
  
          {/* Article Info */}
          <p className="text-sm mb-4">
            <span className="font-semibold"><i className="fa-solid fa-calendar text-green-400 w-5"></i></span> {formattedDate} &nbsp;
            <span className="font-semibold"> <i className="fa-solid fa-user text-blue-400 w-5"></i></span> {article.author}
          </p>
  
          {/* Article Body */}
          <p className="text-base leading-relaxed">{article.body}</p>
  
          {error && <p className="text-red-300 text-sm">{error}</p>}
        </div>
  
        {/* Footer Info */}
        <div className="px-6 py-4">
          <p className="mb-2">
            <span className="mr-4">💬 Comments: {article.comment_count}</span>
            👍 Votes: {articleVotes}
          </p>
          <hr className="border-gray-400 mb-4" />
  
          <p className="mb-2">What did you think of it?</p>
  
          {/* Like/Dislike Buttons */}
          <div className="flex items-center gap-4">
            <button
              title="I like this"
              className={`btn like-btn cursor-pointer ${activeBtn === "like" ? "like-active" : ""}`}
              onClick={() => handleReactionClick("like")}
            >
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button
              title="I dislike this"
              className={`btn dislike-btn cursor-pointer ${activeBtn === "dislike" ? "dislike-active" : ""}`}
              onClick={() => handleReactionClick("dislike")}
            >
              <span className="material-symbols-outlined">thumb_down</span>
            </button>
          </div>
  
          {/* Show/Hide Comments Button */}
          <button
            onClick={handleDisplayComments}
            className="block mt-6 bg-blue-600 cursor-pointer text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Hide Comments
          </button>
        </div>
      </div>
  
      {/* Comments Section */}
      {showComments && <CommentSection articleId={articleId} />}
    </div>
  );
  
}
 
export default ArticlePost;