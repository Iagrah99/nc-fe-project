import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ArticleCard = ({ article }) => {
  const postedDate = article.created_at;

  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/articles/article/${id}`);
  };

  return (
    <div>
      <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        <div className="overflow-hidden">
          <img
            src={article.article_img_url}
            alt={`An article image about ${article.topic}`}
            onClick={() => handleClick(article.article_id)}
            className="h-70 w-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105 hover:opacity-75"
          />
        </div>
        <div className="p-4 flex-1 space-y-3">
          <h2 className="text-1xl mb-2">{article.title}</h2>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <i className="fa-solid fa-tag text-yellow-400 w-5 mr-2"></i>
              <span>{article.topic}</span>
            </div>

            <div className="flex items-center text-sm">
              <i className="fa-solid fa-user text-blue-400 w-5 mr-2"></i>
              <span>{article.author}</span>
            </div>

            <div className="flex items-center text-sm">
              <i className="fa-solid fa-calendar-days text-green-400 w-5 mr-2"></i>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center text-sm">
              <i className="fa-solid fa-thumbs-up text-pink-500 w-5 mr-2"></i>
              <span>{article.votes}</span>
            </div>

            <div className="flex items-center text-sm">
              <i className="fa-solid fa-comments text-purple-400 w-5 mr-2"></i>
              <span>{article.comment_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
