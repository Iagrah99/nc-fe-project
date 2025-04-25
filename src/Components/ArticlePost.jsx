import { useState} from "react";
import { decrementArticleVotes, incrementArticleVotes } from "../utils/api";
import CommentSection from "./CommentSection";
import "../css/Voting.css";
import { format } from "date-fns";
import PageError from "./PageError";

const ArticlePost = ({ article, articleId }) => {
  const [showComments, setShowComments] = useState(true);
  const [articleVotes, setArticleVotes] = useState(article.votes);
  const [activeBtn, setActiveBtn] = useState("none");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const postedDate = article.created_at;

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const handleDisplayComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleReactionClick = (reaction) => {
    const isSameReaction = activeBtn === reaction;
    const isNewReaction = activeBtn === "none";
    const voteChange = isNewReaction ? 1 : isSameReaction ? -1 : 2;
    const voteAPI = reaction === "like" ? incrementArticleVotes : decrementArticleVotes;
    const voteDelta = reaction === "like" ? voteChange : -voteChange;
    const newActiveBtn = isSameReaction ? "none" : reaction;
    const previousActiveBtn = activeBtn; // Save previous state
  
    // 💡 Optimistically update both votes and active button
    setArticleVotes((votes) => votes + voteDelta);
    setActiveBtn(newActiveBtn);
  
    voteAPI(articleId, Math.abs(voteChange)).catch(() => {
      setError("Error updating vote");
      // Revert state if API call fails
      setArticleVotes((votes) => votes - voteDelta);
      setActiveBtn(previousActiveBtn);
    });
  };
  
  

  if (isError) return <PageError error={error} />;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-5xl mx-auto bg-gray-800 text-white ">
      <div className="text-white overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-center w-full">
              {article.title}
            </h1>
          </div>

          {/* Image */}
          <figure className="flex justify-center mb-6">
            <img
              src={article.article_img_url}
              alt={`An article image about ${article.topic}`}
              className="w-full rounded"
            />
          </figure>

          {/* Article Info */}
          <p className="text-sm mb-4">
            <span className="font-semibold">
              <i className="fa-solid fa-calendar text-green-400 w-5"></i>
            </span>{" "}
            {formattedDate} &nbsp;
            <span className="font-semibold">
              {" "}
              <i className="fa-solid fa-user text-blue-400 w-5"></i>
            </span>{" "}
            {article.author}
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
              className={`btn like-btn cursor-pointer ${
                activeBtn === "like" ? "like-active" : ""
              }`}
              onClick={() => handleReactionClick("like")}
            >
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button
              title="I dislike this"
              className={`btn dislike-btn cursor-pointer ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              onClick={() => handleReactionClick("dislike")}
            >
              <span className="material-symbols-outlined">thumb_down</span>
            </button>
          </div>

          {/* Show/Hide Comments Button */}
          <button
            onClick={handleDisplayComments}
            className="flex items-center gap-2 mt-6 bg-blue-600 cursor-pointer text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <i className="fa-regular fa-comments"></i>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && <CommentSection articleId={articleId} />}
    </div>
  );
};

export default ArticlePost;
