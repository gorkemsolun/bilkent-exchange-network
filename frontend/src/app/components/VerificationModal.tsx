import React, { useEffect } from "react";
import image from "../../assets/ver-asset.jpg";
import BaseModalProps from "./BaseModalProps";

interface SuccessModalProps extends BaseModalProps {
  email: string;
  width?: string;
  height?: string;
  prompt?: string;
}

const VerificationModal: React.FC<SuccessModalProps> = ({
  message = "Please verify your email!",
  prompt = "We have sent an email to",
  email: initialEmail,
  width = "100px",
  height = "100px",
}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="okay-modal">
      <div className="okay-content">
        <img
          src={image}
          alt="Awatinig Verification"
          style={{
            width,
            height,
            display: "block",
            margin: "auto",
          }}
        />
        <p style={{ color: "green" }}>{message}</p>
        <p style={{ color: "green" }}>{prompt}</p>
        <p style={{ color: "green" }}>{initialEmail}</p>
      </div>
    </div>
  );
};

export default VerificationModal;
