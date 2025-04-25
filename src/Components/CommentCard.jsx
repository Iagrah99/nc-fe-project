import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import {
  removeComment,
  incrementCommentVotes,
  decrementCommentVotes,
  fetchUsers,
} from "../utils/api";
import { format } from "date-fns";

const CommentCard = ({ comment, setDeleted, deleted }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletingComment, setDeletingComment] = useState(false);
  const [deletingError, setDeletingError] = useState("");
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [activeBtn, setActiveBtn] = useState("none");
  const [voteError, setVoteError] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const datePosted = comment.created_at;

  const formattedDate = format(datePosted, "dd/MM/yyyy 'at' HH:mm");

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
      setUser(users.find((user) => user.username === comment.author));
    });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setDeletingComment(comment.comment_id);

    const deletedComment = {
      username: comment.author,
      body: comment.body,
    };

    removeComment(comment.comment_id, deletedComment)
      .then(() => {
        setDeleted(!deleted);
        setDeletingError("");
      })
      .catch((err) => {
        setDeletingError(
          "There was a problem deleting your comment, please try again."
        );
      });
  };

  const voteDeltaMap = {
    like: {
      like: -1,
      none: 1,
      dislike: 2,
    },
    dislike: {
      like: -2,
      none: -1,
      dislike: 1,
    },
  };

  const handleReactionClick = (reaction) => {
    const delta = voteDeltaMap[reaction][activeBtn];
    const newActive = activeBtn === reaction ? "none" : reaction;
    const voteAPI =
      reaction === "like" ? incrementCommentVotes : decrementCommentVotes;

    // 💡 Optimistically update UI
    setCommentVotes((votes) => votes + delta);
    setActiveBtn(newActive);

    voteAPI(comment.comment_id, Math.abs(delta)).catch(() => {
      setVoteError("Error updating vote");
      // Revert on failure
      setCommentVotes((votes) => votes - delta);
      setActiveBtn(activeBtn); // Revert to previous state
    });
  };

  return (
    <div className="w-full xl:col-span-12 md:col-span-12 sm:col-span-12">
      <div className="bg-gray-900 w-full rounded-lg shadow-md my-6 p-6 text-white flex flex-col justify-between relative">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar_url}
            width="1024"
            height="1024"
            alt="User Avatar"
            loading="lazy"
            className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-md object-cover"
          />
          <h2 className="text-lg font-semibold text-white">{comment.author}</h2>
        </div>

        <p className="mb-2">{comment.body}</p>
        <div className="mb-2 flex items-center gap-4">
          <span>
            <i className="fa-solid fa-thumbs-up text-pink-500 w-5 mr-2"></i>
            {commentVotes}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleReactionClick("like")}
              className={`btn like-btn cursor-pointer ${
                activeBtn === "like" ? "like-active" : ""
              }`}
              title="Upvote"
            >
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button
              onClick={() => handleReactionClick("dislike")}
              className={`btn dislike-btn cursor-pointer ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              title="Downvote"
            >
              <span className="material-symbols-outlined">thumb_down</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p>
            <i className="fa-solid fa-calendar text-green-400 w-5 mr-2"></i>
            {formattedDate}
          </p>

          {loggedInUser.username === comment.author && (
            <button
              onClick={handleDelete}
              title="Delete Comment"
              className="text-red-500 hover:text-red-600 transition text-xl scale-110 cursor-pointer"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>

        {deletingComment && (
          <p className="mt-4 mb-4">Deleting Your Comment...</p>
        )}

        {deletingError && (
          <p className="mt-4 mb-4 text-red-400">{deletingError}</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
