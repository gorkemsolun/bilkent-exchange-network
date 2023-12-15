import React, { useState } from "react";
import "../message.css"; // Link to your CSS file
import MessengerPage from "./messenger.tsx";
const MessengerWindow = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const handleToggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
  };

  return (
    <div>
      <button onClick={handleToggleWindow}>Toggle Messenger</button>

      {isWindowOpen && (
        <div className="slidingWindow">
          {/* You can include the MessengerPage component here */}
          <MessengerPage />
        </div>
      )}
    </div>
  );
};

export default MessengerWindow;
