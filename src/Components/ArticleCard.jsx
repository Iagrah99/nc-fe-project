import { Card, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CardDiv } from "../styled_components/StyledCardDiv";

const ArticleCard = ({ article }) => {
  const postedDate = article.created_at;

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/articles/article/${id}`);
  };

  return (
    <div className="w-full sm:w-1/2 xl:w-1/4 p-2">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        <div className="overflow-hidden">
          <img
            src={article.article_img_url}
            alt={`An article image about ${article.topic}`}
            onClick={() => handleClick(article.article_id)}
            className="h-70 w-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4 flex-1 space-y-2">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          <p>Topic: {article.topic}</p>
          <p>Author: {article.author}</p>
          <p>Posted On: {formattedDate}</p>
          <p>Votes: {article.votes}</p>
          <p>Comment Count: {article.comment_count}</p>
        </div>
        {/* <button
        onClick={() => handleClick(article.article_id)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-base w-full"
      >
        Visit Article
      </button> */}
      </div>
    </div>
  );
};

export default ArticleCard;
