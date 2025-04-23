import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserCard = ({ user }) => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <div
      key={user.username}
      className="w-full px-2 mb-12"
    >
      <div className="bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col items-center hover:scale-105 transition text-white p-6">
        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          className="w-24 h-24 rounded-full object-fit mb-4"
        />

        {/* User Info */}
        <h3 className="text-lg mb-5">{user.username}</h3>

        {/* Button */}
        {user.username !== loggedInUser.username ? (
          <button
            id={user.username}
            onClick={() => setLoggedInUser(user)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 w-32 rounded text-base cursor-pointer"
          >
            Login
          </button>
        ) : (
          <button
            id={user.username}
            className="bg-blue-600 text-white font-medium py-2 px-4 w-32 rounded text-base cursor-default"
          >
            Logged In
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
