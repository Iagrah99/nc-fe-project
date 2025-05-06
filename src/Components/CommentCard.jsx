import { UserContext } from "../contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditCommentModal from "./EditCommentModal";
import {
  removeComment,
  incrementCommentVotes,
  decrementCommentVotes,
  fetchUsers,
  updateCommentBody,
} from "../utils/api";
import { format } from "date-fns";
import DeleteCommentModal from "./DeleteCommentModal";

const CommentCard = ({
  comment,
  setDeleted,
  deleted,
  setIsCommentUpdated,
  isCommentUpdated,
}) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletingComment, setDeletingComment] = useState(false);
  const [deletingError, setDeletingError] = useState("");
  const [updatedComment, setUpdatedComment] = useState(
    comment.body || updatedComment
  );
  const [isCommentUpdating, setIsCommentUpdating] = useState(false);
  const [highlightedCommentId, setHighlightedCommentId] = useState(null);
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const [activeBtn, setActiveBtn] = useState("none");
  const [voteError, setVoteError] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const commentId = String(location.hash.split("=")[1]);
      setHighlightedCommentId(commentId);
      const element = document.getElementById(commentId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const datePosted = comment.created_at;

  const formattedDate = format(datePosted, "dd/MM/yyyy 'at' HH:mm");

  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      // setIsLoading(false);
      setUser(users.find((user) => user.username === comment.author));
    });
  }, []);

  const handleDeleteComment = (e) => {
    e.preventDefault();
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

  const handleUpdateBody = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setIsCommentUpdating(true);
    try {
      await updateCommentBody(comment.comment_id, updatedComment);
      setIsCommentUpdated(!isCommentUpdated);
      setIsCommentUpdating(false);
    } catch (error) {
      console.log(error.response.data.msg);
      setIsCommentUpdating(false);
    }
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

    // Optimistically update UI
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
    <>
      <div
        className="w-full xl:col-span-12 md:col-span-12 sm:col-span-12 scroll-mt-72"
        id={`${comment.comment_id}`}
      >
        <div
          className={`bg-gray-900 w-full rounded-lg shadow-md my-6 p-6 text-white flex flex-col justify-between relative 
          transition-colors duration-300 delay-600 ${
            highlightedCommentId == comment.comment_id
              ? "border-2 border-blue-400"
              : "border-2 border-transparent"
          }`}
        >
          {isCommentUpdating || deletingComment ? (
            <div className="flex flex-col items-center justify-center w-full h-48">
              <div
                className={`w-8 h-8 border-4 ${
                  deletingComment ? "border-red-500" : "border-blue-500"
                } border-t-transparent rounded-full animate-spin mb-4`}
              ></div>
              <p className="text-white text-sm">
                {isCommentUpdating ? "Updating" : "Deleting"} comment...
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.avatar_url}
                  width="1024"
                  height="1024"
                  alt="User Avatar"
                  loading="lazy"
                  className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-md object-cover cursor-pointer"
                  crossOrigin="anonymous"
                  onClick={() => navigate(`/users/${user?.username}`)}
                />
                <h2 className="text-lg font-semibold text-white">
                  {comment.author}
                </h2>
              </div>

              <p className="mb-2 text-sm lg:text-base">{comment.body}</p>

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
                    <span className="material-symbols-outlined">
                      thumb_down
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p>
                  <i className="fa-solid fa-calendar text-green-400 w-5 mr-2"></i>
                  {formattedDate}
                </p>
              </div>

              {loggedInUser?.username === comment.author && (
                <div className="absolute bottom-1 right-1">
                  <button
                    onClick={() => toggleModal()}
                    title="Edit Comment"
                    className="text-blue-500 hover:text-blue-600 transition text-xl scale-75 sm:scale-110 cursor-pointer shadow-lg p-4"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => toggleDeleteModal()}
                    title="Delete Comment"
                    className="text-red-500 hover:text-red-600 transition text-xl scale-75 sm:scale-110 cursor-pointer shadow-lg p-4"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              )}

              {deletingError && (
                <p className="mt-4 mb-4 text-red-400">{deletingError}</p>
              )}
            </>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteCommentModal
          toggleDeleteModal={toggleDeleteModal}
          handleDeleteComment={handleDeleteComment}
        />
      )}

      {isModalOpen && (
        <EditCommentModal
          toggleModal={toggleModal}
          handleUpdateBody={handleUpdateBody}
          updatedComment={updatedComment}
          setUpdatedComment={setUpdatedComment}
        />
      )}
    </>
  );
};

export default CommentCard;
