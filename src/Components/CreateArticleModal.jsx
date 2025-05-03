import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { addArticle } from "../utils/api";

function CreateArticleModal({ toggleModal }) {
  const [articlePosting, setArticlePosting] = useState(false);
  const [articlePosted, setArticlePosted] = useState(false);
  const [articlePostingError, setArticlePostingError] = useState(false);
  const [articleIsOnlySpaces, setArticleIsOnlySpaces] = useState(false);
  const [articleTitle, setarticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleTopic, setArticleTopic] = useState("coding");
  const [articleImgUrl, setArticleImgUrl] = useState("");

  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const addNewArticle = async (postedArticle) => {
    setArticlePosting(true);
    try {
      const { article } = await addArticle(postedArticle);
      setArticlePosted(true);
      setArticlePosting(false);
      setArticleIsOnlySpaces(false);
      setArticleBody("");
      setArticlePostingError(false);
      navigate(`/articles/article/${article.article_id}`);
    } catch (error) {
      setArticlePosted(false);
      setArticlePosting(false);
      setArticlePostingError(true);
    }
  };

  const handleTopic = (e) => {
    const selectedTopic = e.target.value;
    setArticleTopic(selectedTopic);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    setArticlePosting(true);

    const trimmedArticle = articleBody.trim();
    if (!trimmedArticle) {
      setArticleIsOnlySpaces(true);
      return;
    } else {
      const newArticle = {
        author: loggedInUser.username,
        title: articleTitle,
        topic: articleTopic,
        body: articleBody,
        article_img_url: articleImgUrl,
      };
      addNewArticle(newArticle, e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Container */}
      <div className="relative bg-slate-900 text-white rounded-lg shadow-xl w-full max-w-3xl max-h-[95vh] overflow-y-auto p-4 sm:p-8 mx-4">
        {/* Header */}
        <h2 className="text-base sm:text-xl font-semibold mb-4">
          Create a New Article
        </h2>

        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl cursor-pointer"
        >
          &times;
        </button>

        {/* Form */}
        <form onSubmit={handleSubmitPost} className="space-y-4">
          {/* Title and Topic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Title</label>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setarticleTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Topic</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                onChange={handleTopic}
                defaultValue="coding"
              >
                <option value="coding">Coding</option>
                <option value="football">Football</option>
                <option value="cooking">Cooking</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-sm">Image URL (optional)</label>
            <input
              type="text"
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setArticleImgUrl(e.target.value)}
            />
          </div>

          {/* Body */}
          <div>
            <label className="block mb-2 text-sm">Article Body</label>
            <textarea
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 h-20 lg:h-40 focus:outline-none focus:ring-2 focus:ring-white resize-none"
              placeholder="Share your thoughts..."
              maxLength="2500"
              required
              onChange={(e) => {
                const bodyValue = e.target.value;
                setArticleBody(bodyValue);
                const containsOnlySpaces = /^\s+$/.test(bodyValue);
                setArticleIsOnlySpaces(
                  containsOnlySpaces || bodyValue.trim().length === 0
                );
                setArticlePosted(false);
              }}
            ></textarea>
            {articleIsOnlySpaces && articleBody.length > 0 && (
              <p className="text-red-400 mt-2">Can't only use spaces!</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded font-semibold ${
                articleBody.trim().length === 0
                  ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }`}
              disabled={articleBody.trim().length === 0}
            >
              {articlePosting && !articlePostingError
                ? "Posting your article"
                : "Post Article"}
            </button>

            {articlePosted && !articlePostingError && (
              <p className="text-green-400">Posted Successfully!</p>
            )}
            {articlePostingError && (
              <p className="text-red-400">
                Couldn't post article, try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateArticleModal;
