import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext, useLogout } from "../authentication/authHelpers";
import axios from "axios";
import { UserProfile } from "../../data-types/datatypes";
import { Button } from "../../bootstrap";

interface HeaderProps {
  onMessageLinkClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMessageLinkClick }) => {
  const { logout } = useLogout();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuthContext();
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profile/profile/${user._id}`)
      .then((res) => {
        setUserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [userProfile]);

  return (
    <div className="header-outer">
      <div
        className="header-profile-outer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="header-profile">
          <img
            src={userProfile.image}
            className="header-profile-image"
            alt="Profile"
            title="Profile"
          />
          <span>{userProfile.username}</span>
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
        <button className="btn btn-primary" onClick={onMessageLinkClick}>
          Message
        </button>
      </div>
    </div>
  );
};

export default Header;
