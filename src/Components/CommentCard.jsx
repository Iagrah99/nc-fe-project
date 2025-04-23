import { Button, Card, Col } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { removeComment } from "../utils/api";
import { format } from "date-fns";

const CommentCard = ({ comment, setDeleted, deleted }) => {
  const { loggedInUser } = useContext(UserContext);
  const [deletingComment, setDeletingComment] = useState(false);
  const [deletingError, setDeletingError] = useState("");
  const datePosted = comment.created_at;

  const formattedDate = format(datePosted, "dd/MM/yyyy 'at' HH:mm");

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

  return (
    <div className="w-full xl:col-span-12 md:col-span-12 sm:col-span-12">
      <div className="bg-gray-900 w-full rounded-lg shadow-md my-6 p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">By {comment.author}</h2>
        <p className="mb-2">{comment.body}</p>
        <p className="mb-2">Votes: {comment.votes}</p>
        <p className="mb-4">Posted On: {formattedDate}</p>

        {loggedInUser.username === comment.author && (
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-medium py-2 px-4 rounded"
          >
            Delete Comment
          </button>
        )}

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
