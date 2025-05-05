const LoginModal = ({
  toggleLoginModal,
  handleLoginUser,
  username,
  setUsername,
  password,
  setPassword,
  isLoggingIn,
  isLoggingInAsGuest,
  handleGuestLogin,
  isError,
  setIsError,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-1 sm:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Content */}
      <div className="relative bg-slate-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-96 z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Login to Your Account
        </h2>

        <button
          onClick={toggleLoginModal}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl cursor-pointer"
        >
          &times;
        </button>

        <form className="space-y-6" onSubmit={handleLoginUser}>
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="text-sm sm:text-base w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setUsername(e.target.value);
                setIsError(false);
              }}
              onFocus={() => setIsError(false)}
              value={username}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="text-sm sm:text-base w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setPassword(e.target.value);
                setIsError(false);
              }}
              onFocus={() => setIsError(false)}
              value={password}
              required
            />
          </div>

          {/* Error Message */}
          {isError && (
            <p className="text-red-500 text-sm">
              No user with that username exists.
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {!isLoggingInAsGuest && (
              <button
                type="submit"
                className={`text-sm sm:text-base w-fit flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow transition  ${
                  username.trim().length === 0
                    ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                disabled={username.trim().length === 0}
              >
                {isLoggingIn ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Logging In
                  </>
                ) : (
                  "Login"
                )}
              </button>
            )}

            {!isLoggingIn && (
              <button
                type="button"
                onClick={handleGuestLogin}
                className="text-sm sm:text-base w-fit flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingInAsGuest ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Logging In
                  </>
                ) : (
                  "Continue As Guest"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
