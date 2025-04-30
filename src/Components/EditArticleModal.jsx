import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { updateArticleById } from "../utils/api";

function EditArticleModal({ toggleEditModal, selectedArticle, articleUpdating, setArticleUpdating, setArticleUpdated }) {
  const [articleUpdatingError, setArticleUpdatingError] = useState(false);
  const [articleIsOnlySpaces, setArticleIsOnlySpaces] = useState(false);
  const [articleId, setArticleId] = useState(selectedArticle.article_id);
  const [articleTitle, setarticleTitle] = useState(selectedArticle.title);
  const [articleBody, setArticleBody] = useState(selectedArticle.body);
  const [articleTopic, setArticleTopic] = useState(selectedArticle.topic);
  const [articleImgUrl, setArticleImgUrl] = useState(
    selectedArticle.article_img_url
  );

  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedArticle) {
      setArticleId(selectedArticle.article_id);
      setarticleTitle(selectedArticle.title);
      setArticleBody(selectedArticle.body);
      setArticleImgUrl(selectedArticle.article_img_url || "");
      setArticleTopic(selectedArticle.topic);
    }
  }, [selectedArticle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleEditModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleUpdateArticle = async (updatedArticle) => {
    setArticleUpdated(true);
    try {
        await updateArticleById(
        updatedArticle.article_id,
        updatedArticle.title,
        updatedArticle.topic,
        updatedArticle.article_img_url,
        updatedArticle.article_body
      )
      setArticleUpdated(true);
      setArticleUpdating(false);
      setArticleIsOnlySpaces(false);
      setArticleBody("");
      setArticleUpdatingError(false);
      toggleEditModal(null)
      setArticleUpdated(false)
    } catch (error) {
      setArticleUpdated(false);
      setArticleUpdating(false);
      setArticleUpdatingError(true);
    }
  };

  const handleTopic = (e) => {
    const selectedTopic = e.target.value;
    setArticleTopic(selectedTopic);
  };

  const handleSubmitUpdatedPost = (e) => {
    e.preventDefault();

    e.target[4].disabled = true;
    setArticleUpdating(true);

    const trimmedArticle = articleBody.trim();
    if (!trimmedArticle) {
      setArticleIsOnlySpaces(true);
      return;
    } else {
      const updatedArticle = {
        article_id: articleId,
        title: articleTitle,
        topic: articleTopic,
        article_body: articleBody,
        article_img_url: articleImgUrl,
      };
      handleUpdateArticle(updatedArticle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>
      <div className="bg-slate-900 text-white rounded-lg shadow-xl w-full max-w-3xl p-8 relative">
        <h2 className="text-xl font-semibold mb-4">Edit Article</h2>

        {/* Close Button */}
        <button
          onClick={toggleEditModal}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg cursor-pointer"
        >
          &times;
        </button>

        <form onSubmit={handleSubmitUpdatedPost}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm">Title</label>
              <input
                type="text"
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                onChange={(e) => setarticleTitle(e.target.value)}
                value={articleTitle}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Topic</label>
              <select
                className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                onChange={handleTopic}
                value={articleTopic}
              >
                <option value="coding">Coding</option>
                <option value="football">Football</option>
                <option value="cooking">Cooking</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm">Image URL (optional)</label>
            <input
              type="text"
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              onChange={(e) => setArticleImgUrl(e.target.value)}
              value={articleImgUrl}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm">Article Body</label>
            <textarea
              rows="6"
              className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white resize-none"
              placeholder=""
              maxLength="2500"
              required
              value={articleBody}
              onChange={(e) => {
                const bodyValue = e.target.value;
                setArticleBody(bodyValue);

                const containsOnlySpaces = /^\s+$/.test(bodyValue);
                setArticleIsOnlySpaces(containsOnlySpaces);

                const disableButton =
                  containsOnlySpaces || bodyValue.trim().length === 0;
                e.target.form[4].disabled = disableButton;

                setArticleUpdated(false);
              }}
            ></textarea>
            {articleIsOnlySpaces && articleBody.length > 0 && (
              <p className="text-red-400 mt-2">Can't only use spaces!</p>
            )}
          </div>

          <div className="flex flex-col items-start">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 mb-2 text-white px-6 py-2 rounded font-semibold cursor-pointer"
            >
              {articleUpdating && !articleUpdatingError
                ? "Updating article"
                : " Update Article"}
            </button>
            {articleUpdatingError && (
              <p className="text-red-400 mt-2">
                Couldn't update article, try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticleModal;
