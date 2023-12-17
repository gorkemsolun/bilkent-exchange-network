import { useEffect } from "react";
import { ErrorModalProps } from "../../data-types/props";

export default function ErrorModal({
  message = "An unspecified error occurred",
  onClose = () => {},
  autoCloseDelay = 1850,
}: ErrorModalProps) {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onClose();
    }, autoCloseDelay);
    return () => {
      clearTimeout(timerId);
    };
  }, [onClose, autoCloseDelay]);

  return (
    <div className="error-modal">
      <div className="error-content">
        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
}
