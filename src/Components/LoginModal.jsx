const LoginModal = ({
  toggleLoginModal,
  handleLoginUser,
  username,
  setUsername,
  isLoggingIn,
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
          Login to Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleLoginUser}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setUsername(e.target.value);
                setIsError(false);
              }}
              onFocus={() => setIsError(false)}
              value={username}
              required
            />
          </div>

          {isError && (
            <p className="text-red-500">No user with that username exists</p>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={toggleLoginModal}
              className="bg-gray-600 px-6 py-2 rounded-lg shadow text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded font-semibold ${
                username.trim().length === 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
              }`}
              disabled={username.trim().length === 0}
            >
              {isLoggingIn ? "Logging In" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
