import React, { useEffect } from "react";
import okTickImage from "../../assets/gr-tick.avif";
import BaseModalProps from "./BaseModalProps";

interface SuccessModalProps extends BaseModalProps {
  width?: string;
  height?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  message = "Done Successfully!",
  width = "100px",
  height = "100px",
}) => {
  useEffect(() => {
    // No auto close logic
    return () => {
      // Cleanup or additional actions when the component is unmounted
    };
  }, []);

  return (
    <div className="okay-modal">
      <div className="okay-content">
        <img
          src={okTickImage}
          alt="Okay Tick"
          style={{
            width,
            height,
            display: "block",
            margin: "auto",
          }}
        />
        <p style={{ color: "green" }}>{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
