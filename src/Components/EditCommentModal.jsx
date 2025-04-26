const EditCommentModal = ({ toggleModal, handleUpdateBody, updatedComment, setUpdatedComment }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"></div>
  
        {/* Modal Content */}
        <div className="relative bg-slate-50 dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Edit Comment
          </h2>
  
          {/* <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium">
            Your Comment
          </label> */}
          <textarea
            name="comment"
            id="comment"
            className="w-full h-60 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          ></textarea>
  
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={toggleModal}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-shadow shadow-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                handleUpdateBody(e, comment.comment_id);
                toggleModal(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-shadow shadow-md cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditCommentModal;
  