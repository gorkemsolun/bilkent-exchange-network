import { useEffect } from "react";
import image from "../../assets/ver-asset.jpg";
import { SuccessModalProps } from "../../data-types/props";

export default function VerificationModal({
  message = "Please verify your email!",
  prompt = "You can close this page now.\nWe have sent an email to",
  email: initialEmail,
  width = "100px",
  height = "100px",
}: SuccessModalProps) {
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
}
