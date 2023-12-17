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
    <div className="success-modal">
      <div className="success-modal-content">
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
        <p className="success-modal-content-par">{message}</p>
        <p className="success-modal-content-par">{prompt}</p>
        <p className="success-modal-content-par">{initialEmail}</p>
      </div>
    </div>
  );
};

export default VerificationModal;
