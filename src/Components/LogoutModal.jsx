const LogoutModal = ({
  toggleLogoutModal,
  handleLogoutUser,
  isLoggingOut,
  isError,
  setIsError,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-1 sm:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Content */}
      <div className="relative bg-slate-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">
          Confirm Logout
        </h2>
        <p className="text-xs sm:text-sm font-normal text-gray-300">
          Are you sure you want to logout?
        </p>

        <form className="space-y-6" onSubmit={handleLogoutUser}>
          <div className="flex justify-end gap-4 items-center mt-6">
            <button
              type="button"
              onClick={toggleLogoutModal}
              className="text-sm sm:text-base bg-gray-600 px-6 py-2 rounded-lg shadow text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm sm:text-base w-fit flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
            >
              {isLoggingOut ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging Out
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
          {isError && (
            <p className="text-red-500">There was a problem logging you out</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LogoutModal;
