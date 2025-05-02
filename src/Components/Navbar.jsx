import { UserContext } from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import { loginUser, logoutUser } from "../utils/api";
import LogoutModal from "./LogoutModal";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingInAsGuest, setIsLoggingInAsGuest] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toggleLoginModal = () => {
    setIsError(false);
    setIsLoginModalOpen((prev) => !prev);
  };

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const toggleLogoutModal = () => {
    setIsLogoutModalOpen((prev) => !prev);
  };

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    !loggedInUser && location.pathname === "/" && navigate("/articles");
  }, []);

  const handleLink = (e) => {
    e.preventDefault();
    if (e.target.id === "/" && loggedInUser) {
      navigate("/");
    } else if (e.target.id === "/" && !loggedInUser) {
      navigate("/articles");
    } else {
      navigate(`/${e.target.id}`);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoggingInAsGuest(true);
    setIsError(false);

    const guestUsername = "tickle122";
    const guestPassword = "tickle123";

    try {
      const { user } = await loginUser(guestUsername, guestPassword);
      setLoggedInUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsLoggingInAsGuest(false);
      toggleLoginModal();
      navigate("/");
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoggingIn(false);
      setIsLoggingInAsGuest(false);
    }
  };

  const handleLoginUser = async (e) => {
    setIsLoggingIn(true);
    setIsError(false);
    e.preventDefault();

    try {
      const { user } = await loginUser(username, password);
      setLoggedInUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setIsLoggingIn(false);
      toggleLoginModal(null);
      navigate("/");
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoggingIn(false);
    }
  };

  const handleLogoutUser = async (e) => {
    setIsLoggingOut(true);
    setIsError(false);
    e.preventDefault();
    try {
      await logoutUser(username);
      setLoggedInUser("");
      localStorage.removeItem("currentUser");
      toggleLogoutModal(null);
      navigate("/articles");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Brand - Left */}
          <div
            onClick={handleLink}
            id="/"
            className="text-2xl font-bold cursor-pointer select-none"
          >
            <span className="text-red-500">NC</span> News
          </div>

          {/* Centered Links - Middle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex lg:gap-5 space-x-6">
            <button
              onClick={handleLink}
              id="articles"
              className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
            >
              Articles
            </button>
            {loggedInUser ? (
              <button
                onClick={toggleLogoutModal}
                id="logout"
                className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={toggleLoginModal}
                id="login"
                className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Logged-in Status - Right */}
          {loggedInUser && (
            <div className="hidden lg:flex items-center gap-3 text-sm text-gray-300">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full">
                <span>Logged in as</span>
                <span className="font-semibold text-white">
                  {loggedInUser.username}
                </span>
                <img
                  src={loggedInUser.avatar_url}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-600 shadow-sm"
                />
              </span>
            </div>
          )}

          {/* Mobile Toggle - Right */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden pt-2 px-4 pb-4 bg-gray-800 space-y-3">
          <button
            onClick={handleLink}
            id="articles"
            className="block w-full text-left text-sm font-medium hover:text-red-400"
          >
            Articles
          </button>
          <button
            onClick={handleLink}
            id="login"
            className="block w-full text-left text-sm font-medium hover:text-red-400"
          >
            Switch User
          </button>
          <div className="text-xs text-gray-300">
            <span className="flex items-center gap-2 rounded-full">
              <span>Logged in as</span>
              <span className="font-semibold text-white">
                {loggedInUser.username}
              </span>
              <img
                src={loggedInUser.avatar_url}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-600 shadow-sm"
              />
            </span>
          </div>
        </div>
      )}

      {isLoginModalOpen && (
        <LoginModal
          toggleLoginModal={toggleLoginModal}
          handleLoginUser={handleLoginUser}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          isLoggingIn={isLoggingIn}
          isLoggingInAsGuest={isLoggingInAsGuest}
          handleGuestLogin={handleGuestLogin}
          isError={isError}
          setIsError={setIsError}
        />
      )}

      {isLogoutModalOpen && (
        <LogoutModal
          toggleLogoutModal={toggleLogoutModal}
          handleLogoutUser={handleLogoutUser}
          isLoggingOut={isLoggingOut}
          isError={isError}
        />
      )}
    </nav>
  );
};

export default NavigationBar;
