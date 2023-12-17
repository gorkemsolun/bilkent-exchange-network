import { useEffect } from "react";
import okTickImage from "../../assets/gr-tick.avif";
import { SuccessModalProps } from "../../data-types/props";

export default function SuccessModal({
  message = "Done Successfully!",
  width = "100px",
  height = "100px",
}: SuccessModalProps) {
  useEffect(() => {
    return () => {
      window.location.reload();
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
}
