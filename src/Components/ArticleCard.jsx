import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

const ArticleCard = ({ article, toggleDeleteModal, toggleEditModal }) => {
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();

  const postedDate = article.created_at;
  const formattedDate = format(postedDate, "dd/MM/yyyy 'at' HH:mm");

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/articles/article/${id}`);
  };

  return (
    <>
      <div className="flex flex-col h-full text-white bg-slate-900 rounded-lg shadow-md relative group">
        {/* Delete Article Icon */}
        {!location.pathname.includes("articles") && (
          <>
            <button
              onClick={() => toggleDeleteModal(article.article_id)}
              className="absolute bottom-4 right-4 text-red-400 hover:text-red-600 transition z-10 cursor-pointer"
              title="Delete Article"
            >
              <i className="fa-solid fa-trash-can text-lg"></i>
            </button>

            <button
              onClick={() => toggleEditModal(article)}
              className="absolute bottom-4 right-12 text-blue-400 hover:text-blue-600 transition z-10 cursor-pointer"
              title="Edit Article"
            >
              <i className="fa-solid fa-pencil text-lg"></i>
            </button>
          </>
        )}

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={article.article_img_url}
            alt={`An article image about ${article.topic}`}
            className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 hover:opacity-75 cursor-pointer"
            crossOrigin="anonymous"
            onClick={() => handleClick(article.article_id)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 p-4">
          <h2 className="text-base font-semibold mb-3 leading-snug line-clamp-2">
            {article.title}
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <i className="fa-solid fa-tag text-yellow-400 w-5 mr-2"></i>
              <span>{article.topic}</span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-user text-blue-400 w-5 mr-2"></i>
              <span className="cursor-pointer" onClick={() => navigate(`/users/${article.author}`)}>
                {article.author}
              </span>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-calendar-days text-green-400 w-5 mr-2"></i>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex gap-4">
              <div className="flex items-center">
                <i className="fa-solid fa-thumbs-up text-pink-500 w-4 mr-1"></i>
                <span>{article.votes}</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-comments text-purple-400 w-4 mr-1"></i>
                <span>{article.comment_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
