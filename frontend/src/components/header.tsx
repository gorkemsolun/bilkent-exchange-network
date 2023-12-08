import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../authentication/useLogout";

export default function Header() {
  const { logout } = useLogout();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  // Dummy user data, replace with your actual user data
  const user = {
    username: "JohnDoe",
    // Add more user information as needed
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-300 flex items-center p-2 justify-center">
      {/* User Profile Section */}
      <div
        className="flex cursor-pointer relative items-center justify-start ml-2"
        style={{ width: "15%" }}
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        {/* Profile Photo */}
        <div className="px-1 relative">
          <img
            src="./src/assets/cs319.png"
            className="object-cover rounded-full"
            style={{ width: "40px", height: "40px" }}
          />

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div
              className="fixed mt-2 mr-1 w-48 bg-white rounded-md shadow-lg z-50 text-left"
              style={{ zIndex: 50, textAlign: "left" }} // Set a high z-index value
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 text-left"
              >
                View Profile
              </Link>
              <Link to="/saved-posts" className="block px-4 py-2 text-gray-800">
                Saved Posts
              </Link>
              <Link to="/login" className="block px-4 py-2 text-gray-800" onClick={handleClick}>
                Logout
              </Link>
            </div>
          )}
        </div>

        {/* Username */}
        <span className="text-white text-xl" style={{ fontSize: "18px" }}>
          {user.username}
        </span>
      </div>

      {/* Bilkent Exchange Network */}
      <div className="flex justify-center" style={{ width: "70%" }}>
        <Link
          className="px-4 justify-center text-2xl text-white flex items-center"
          to="/secondhand"
        >
          <img className="w-20 p-2" src="./src/assets/logo.png" alt="Logo" />
          Bilkent Exchange Network
        </Link>
      </div>

      <div style={{ width: "15%" }}>
        <Link to="/login" className="block px-4 py-2 text-gray-800">
          Message
        </Link>
      </div>
    </div>
  );
}
