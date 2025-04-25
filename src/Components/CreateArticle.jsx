import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { addArticle } from "../utils/api";

function CreateArticle({ setSuccess }) {
  const [articlePosting, setArticlePosting] = useState(false);
  const [articlePosted, setArticlePosted] = useState(false);
  const [articlePostingError, setArticlePostingError] = useState(false);
  const [articleIsOnlySpaces, setArticleIsOnlySpaces] = useState(false);
  const [articleTitle, setarticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleTopic, setArticleTopic] = useState("");
  const [articleImgUrl, setArticleImgUrl] = useState("");

  const { loggedInUser } = useContext(UserContext);

  const addNewArticle = (postedArticle, e) => {
    addArticle(postedArticle)
      .then((articleFromApi) => {
        e.target[2].disabled = false;
        setArticlePosted(true);
        setArticlePosting(false);
        setArticleIsOnlySpaces(false);
        setArticleBody("");
        setSuccess(articleFromApi.article_id);
      })
      .catch((error) => {
        setArticlePosted(false);
        setArticlePostingError(true);
      });
  };

  const handleTopic = (e) => {
    const selectedTopic = e.target.value;
    console.log(selectedTopic);
    setArticleTopic(selectedTopic);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    e.target[5].disabled = true;
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
      console.log(newArticle);
      addNewArticle(newArticle, e);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmitPost}
          className="w-full max-w-3xl bg-slate-800 p-6 rounded-lg shadow-md text-white"
        >
          <div className="grid grid-cols-2 gap-3 ">
            {/* Username */}
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium">
                Username:
              </label>
              <input
                type="text"
                value={loggedInUser.username}
                disabled
                className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              />
            </div>

            {/* Article Title */}
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium">
                Article Title:
              </label>
              <input
                type="text"
                placeholder={`${loggedInUser.username}'s article`}
                required
                onChange={(e) => setarticleTitle(e.target.value)}
                className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Article Topic */}
          <div className="grid grid-cols-2 gap-3 ">
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium">
                Article Topic:
              </label>
              <select
                aria-label="select-category"
                onChange={handleTopic}
                className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="cooking">Cooking</option>
                <option value="coding">Coding</option>
                <option value="football">Football</option>
              </select>
            </div>

            {/* Article Image URL */}
            <div className="mb-6 w-full">
              <label className="block mb-2 text-sm font-medium">
                Article Image URL (optional):
              </label>
              <input
                type="text"
                placeholder="Your image link"
                value={articleImgUrl}
                onChange={(e) => setArticleImgUrl(e.target.value)}
                className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Article Body */}
          <div className="mb-6 w-full">
            <label className="block mb-2 text-sm font-medium">
              Article Body:
            </label>
            <textarea
              rows={7}
              placeholder="What would you like to talk about?"
              maxLength={3000}
              value={articleBody}
              required
              onChange={(e) => {
                const bodyValue = e.target.value;
                setArticleBody(bodyValue);

                const containsOnlySpaces = /^\s+$/.test(bodyValue);
                setArticleIsOnlySpaces(containsOnlySpaces);

                const disableButton =
                  containsOnlySpaces || bodyValue.trim().length === 0;
                e.target.form[5].disabled = disableButton;

                setArticlePosted(false);
              }}
              className="w-full bg-slate-700 text-white rounded px-4 py-2 resize-none border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
            ></textarea>
            {articleIsOnlySpaces && articleBody.length > 0 && (
              <p className="text-red-400 mt-4">Can't only use spaces!</p>
            )}
          </div>

          {/* Submit and Feedback */}
          <div className="flex flex-col items-start w-full mt-4">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded mb-4 cursor-pointer disabled:opacity-50"
            >
              Post Article
            </button>
            {articlePosted && (
              <p className="text-green-400 mb-2">Posted Successfully!</p>
            )}
            {articlePosting && !articlePostingError && (
              <p className="mb-2">Posting Your Article...</p>
            )}
            {articlePostingError && (
              <p className="text-red-400 mb-2">
                Couldn't post article, try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateArticle;
