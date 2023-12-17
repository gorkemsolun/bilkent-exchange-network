import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultImage, defaultUserProfile } from "../../data-types/constants";
import { ProfileContextType, UserProfile } from "../../data-types/datatypes";
import { HeaderProps } from "../../data-types/props";
import { useLogout, useProfileContext } from "../authentication/AuthHelpers";

export default function Header(props: HeaderProps) {
  const { logout } = useLogout();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(
    defaultUserProfile
  );
  const profile = (useProfileContext() as unknown as ProfileContextType)
    .profile;

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  return (
    <div className="header-outer">
      <div
        className="header-profile-outer"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="header-profile">
          <img
            src={userProfile?.image || defaultImage}
            className="header-profile-image"
            alt="Profile"
            title="Profile"
          />
          <div className="header-profile-username">
            <span>{userProfile?.username}</span>
          </div>

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
              {profile?._isAdmin == true && (
                <Link to="/admin" className="header-profile-dropdown-link">
                  Admin Page
                </Link>
              )}
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
          <span className="header-title-text">Bilkent Exchange Network</span>
        </Link>
      </div>
      <div className="header-message-link">
        <img
          src="/src/assets/dmbox.png"
          className="header-dmbox-image"
          onClick={props.onMessengerClick}
          alt="DMs"
        />
      </div>
    </div>
  );
}
