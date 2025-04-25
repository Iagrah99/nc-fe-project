const DeleteArticleModal = ({ toggleModal, handleDeleteArticle, selectedArticleId }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>
      
        {/* Modal Content */}
        <div className="relative bg-slate-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 z-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Confirm Article Deletion
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete your article?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={toggleModal}
              className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 cursor-pointer rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
               onClick={() => {
                handleDeleteArticle(selectedArticleId);
                toggleModal(null);
              }}
              className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default DeleteArticleModal;
  