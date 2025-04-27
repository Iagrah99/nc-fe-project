import React from "react";

function CommentPreviewCard({comment, user}) {
  return (
    <div key={comment.comment_id} className="w-full">
      <div className="bg-gray-900 w-full rounded-lg shadow-md p-6 text-white flex flex-col justify-between relative">
        {/* Top Row: Avatar + Author */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.avatar_url}
            width="1024"
            height="1024"
            alt="User Avatar"
            loading="lazy"
            className="w-10 h-10 rounded-full border-2 border-gray-700 shadow-md object-cover"
          />
          <h2 className="text-lg font-semibold">{comment.author}</h2>
        </div>

        {/* Comment Body */}
        <p className="mb-4 overflow-hidden line-clamp-3">{comment.body}</p>

        {/* Votes and Date */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
          <span className="flex items-center text-pink-500">
            <i className="fa-solid fa-thumbs-up mr-2"></i>
            {comment.votes}
          </span>
          <span className="flex items-center text-green-400 text-sm">
            <i className="fa-solid fa-calendar mr-2"></i>
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentPreviewCard;
