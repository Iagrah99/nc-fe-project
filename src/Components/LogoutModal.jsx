const LogoutModal = ({
  toggleLogoutModal,
  handleLogoutUser,
  isLoggingOut,
  isError,
  setIsError,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Content */}
      <div className="relative bg-slate-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Confirm Logout
        </h2>
        <p>Are you sure you want to logout?</p>

        <form className="space-y-6" onSubmit={handleLogoutUser}>
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={toggleLogoutModal}
              className="bg-gray-600 px-6 py-2 rounded-lg shadow text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition cursor-pointer"
            >
              {isLoggingOut ? "Logging Out" : "Logout"}
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
