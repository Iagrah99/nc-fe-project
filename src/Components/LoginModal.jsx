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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"></div>

      {/* Modal Content */}
      <div className="relative bg-slate-50 dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
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
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className={`px-6 py-2 w-fit rounded font-semibold transition ${
                  username.trim().length === 0
                    ? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                }`}
                disabled={username.trim().length === 0}
              >
                {isLoggingIn ? "Logging In" : "Login"}
              </button>
            )}

            {!isLoggingIn && (
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-fit text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition cursor-pointer"
                disabled={isLoggingIn}
              >
                {isLoggingInAsGuest ? "Logging In" : "Continue As Guest"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
