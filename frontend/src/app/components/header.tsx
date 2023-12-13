import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../authentication/authHelpers";

export default function Header() {
  const { logout } = useLogout();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  // Dummy user data, replace with your actual user data
  const user = {
    username: "JohnDoe",
    image: "./src/assets/cs319.png",
  };

  return (
    <div className="header-outer">
      <div
        className="header-profile-outer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="header-profile">
          <img
            src={user.image}
            className="header-profile-image"
            alt="Profile"
            title="Profile"
          />
          <span>{user.username}</span>
          {isDropdownOpen && (
            <div className="header-profile-dropdown">
              <Link to="/myprofile" className="header-profile-dropdown-link">
                View Profile
              </Link>
              <Link to="/saved-posts" className="header-profile-dropdown-link">
                Saved Posts
              </Link>
              <Link
                to="/login"
                className="header-profile-dropdown-link"
                onClick={handleClick}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="header-title-outer">
        <Link className="header-title-link" to="/secondhand">
          <img
            className="header-title-image"
            src="./src/assets/logo.png"
            alt="Logo"
          />
          Bilkent Exchange Network
        </Link>
      </div>
      <div className="header-message-link">
        <Link to="/login" className="header-message-link">
          Message
        </Link>
      </div>
    </div>
  );
}
