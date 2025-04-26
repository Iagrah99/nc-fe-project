import { UserContext } from "../contexts/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { loggedInUser } = useContext(UserContext);

  const handleLink = (e) => {
    e.preventDefault();
    if (e.target.id === "/") {
      navigate("/");
    } else {
      navigate(`/${e.target.id}`);
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
            <button
              onClick={handleLink}
              id="post-article"
              className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
            >
              Post Article
            </button>
            <button
              onClick={handleLink}
              id="login"
              className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
            >
              Switch User
            </button>
          </div>

          {/* Logged-in Status - Right */}
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
              id="post-article"
              className="text-sm font-medium cursor-pointer hover:text-red-400 transition"
            >
              Post Article
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
    </nav>
  );
};

export default NavigationBar;
