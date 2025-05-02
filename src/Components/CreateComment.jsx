import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { addComment } from "../utils/api";

const CreateComment = ({ articleId, setSuccess }) => {
  const [comment, setComment] = useState("");
  const [commentPosted, setCommentPosted] = useState(false);
  const [commentIsOnlySpaces, setCommentIsOnlySpaces] = useState(false);
  const [commentPosting, setCommentPosting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { loggedInUser } = useContext(UserContext);

  const addNewComment = (postedComment, e) => {
    setIsError(false);
    addComment(articleId, postedComment)
      .then((commentFromApi) => {
        e.target[2].disabled = false;
        setCommentPosted(true);
        setCommentPosting(false);
        setCommentIsOnlySpaces(false);
        setComment("");
        setSuccess(commentFromApi.comment_id);
      })
      .catch((error) => {
        setCommentPosted(false);
        setCommentPosting(false);
        setIsError(true);
        setError(error);
      });
  };

  useEffect(() => {
    if (commentPosted) {
      const timer = setTimeout(() => {
        setCommentPosted(false);
      }, 3000);

      // Cleanup in case component unmounts early
      return () => clearTimeout(timer);
    }
  }, [commentPosted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    e.target[2].disabled = true;
    setCommentPosting(true);

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      setCommentIsOnlySpaces(true);
      return;
    } else {
      const newComment = {
        username: loggedInUser?.username,
        body: comment,
      };
      addNewComment(newComment, e);
    }
  };

  return (
    <div className="w-full xl:col-span-12 md:col-span-12 sm:col-span-12">
      <div className="w-full p-6 text-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-xl font-semibold mb-6">
            Join The Discussion
          </h3>

          {/* Username */}
          <div className="mb-6">
            <input
              type="text"
              id="username"
              value={loggedInUser?.username}
              disabled
              className=" bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white hidden"
            />
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label htmlFor="comment" className="block mb-2 text-sm font-medium">
              Comment
            </label>
            <textarea
              id="comment"
              rows={3}
              placeholder="What are your thoughts?"
              maxLength={2500}
              value={comment}
              required
              onFocus={() => setIsError(false)}
              onChange={(e) => {
                const inputValue = e.target.value;
                setComment(inputValue);

                const containsOnlySpaces = /^\s+$/.test(inputValue);
                setCommentIsOnlySpaces(containsOnlySpaces);

                const disableButton =
                  containsOnlySpaces || inputValue.trim().length === 0;
                e.target.form[2].disabled = disableButton;

                setCommentPosted(false);
              }}
              className="w-full bg-slate-700 text-white rounded lg:h-40 px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            ></textarea>
          </div>

          <div className="mb-6">
            {/* Validation Messages */}
            {/* {comment.length >= 2500 && (
              <p className="text-red-400 mb-4">
                Your comment is too long! The max character length is 2500.
              </p>
            )}
            {commentIsOnlySpaces && comment.length > 0 && (
              <p className="text-red-400 mb-4">Can't only use spaces!</p>
            )} */}

            <button
              type="submit"
              className={`px-6 py-2 rounded flex items-center gap-2 font-semibold ${
                comment.trim().length === 0
                  ? "bg-blue-600 hover:bg-blue-600 opacity-50 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
              }`}
              disabled={isError || comment.trim().length === 0}
            >
              <i className="fa-regular fa-paper-plane"></i>
              Post Comment
            </button>

            {commentPosted && (
              <p className="text-green-400 mt-4">✅ Posted Successfully!</p>
            )}
            {commentPosting && (
              <div className="flex gap-3 mt-7">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white text-sm">Posting comment...</p>
              </div>
            )}
            {isError && (
              <p className="mt-4 text-red-400">
                {error.response.data.msg === "Not found"
                  ? "Please login to make a comment"
                  : "There was an error posting your comment"}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
