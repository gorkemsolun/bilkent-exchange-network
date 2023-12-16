// DarkModeToggle.tsx
import React, { useState, useEffect } from 'react';

export const DarkModeToggle: React.FC = () => {
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Apply the dark mode class to the body
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const handleToggle = () => {
    // Toggle the dark mode state
    console.log("darkmode")
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button className="dark-mode-toggle" onClick={handleToggle}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
