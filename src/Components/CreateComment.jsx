import { Form, Col, Card, Row, Button } from "react-bootstrap"
import { useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import textStyles from "../css/TextCSSModule.module.css"
import { addComment } from "../utils/api";
import { useNavigate } from "react-router-dom"

const CreateComment = ({ articleId, setSuccess }) => {
  const [comment, setComment] = useState("")
  const [commentPosted, setCommentPosted] = useState(false)
  const [commentPostingError, setCommentPostingError] = useState(false)
  const [commentIsOnlySpaces, setCommentIsOnlySpaces] = useState(false)
  const [commentPosting, setCommentPosting] = useState(false)
  const { loggedInUser } = useContext(UserContext);

  const navigate = useNavigate()

  const addNewComment = (postedComment, e) => {
    addComment(articleId, postedComment).then((commentFromApi) => {
      e.target[2].disabled = false
      setCommentPosted(true)
      setCommentPosting(false)
      setCommentIsOnlySpaces(false);
      setComment("")
      setSuccess(commentFromApi.comment_id)

    }).catch((error) => {
      setCommentPosted(false)
      setCommentPostingError(true)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    e.target[2].disabled = true
    setCommentPosting(true)

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      setCommentIsOnlySpaces(true);
      return;
    } else {
      const newComment = {
        username: loggedInUser.username,
        body: comment
      }
      addNewComment(newComment, e)
    }
  }

  return (
<div className="w-full xl:col-span-12 md:col-span-12 sm:col-span-12">
  <div className="w-full p-6 text-white">
    <form onSubmit={handleSubmit}>
      <h3 className="text-center text-xl font-semibold mb-6">Join The Discussion</h3>

      {/* Username */}
      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
        <input
          type="text"
          id="username"
          value={loggedInUser.username}
          disabled
          className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label htmlFor="comment" className="block mb-2 text-sm font-medium">Comment</label>
        <textarea
          id="comment"
          rows={3}
          placeholder="What are your thoughts?"
          maxLength={2500}
          value={comment}
          required
          onChange={(e) => {
            const inputValue = e.target.value;
            setComment(inputValue);

            const containsOnlySpaces = /^\s+$/.test(inputValue);
            setCommentIsOnlySpaces(containsOnlySpaces);

            const disableButton = containsOnlySpaces || inputValue.trim().length === 0;
            e.target.form[2].disabled = disableButton;

            setCommentPosted(false);
          }}
          className="w-full bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-white"
        ></textarea>
      </div>

      {/* Validation Messages */}
      <div className="mb-6">
        {comment.length >= 2500 && (
          <p className="text-red-400 mb-4">Your comment is too long! The max character length is 2500.</p>
        )}
        {commentIsOnlySpaces && comment.length > 0 && (
          <p className="text-red-400 mb-4">Can't only use spaces!</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        >
          Post Comment
        </button>

        {commentPosted && (
          <p className="text-green-400 mt-4">Posted Successfully!</p>
        )}
        {commentPosting && (
          <p className="mt-4">Posting Your Comment...</p>
        )}
        {commentPostingError && (
          <p className="mt-4 text-red-400">Couldn't post comment, try again later.</p>
        )}
      </div>
    </form>
  </div>
</div>

  );
}

export default CreateComment;