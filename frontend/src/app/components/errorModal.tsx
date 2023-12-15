import React, { useEffect } from "react";

interface ErrorModalProps {
  message: string;
  onClose?: () => void;
  autoCloseDelay?: number;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  message = "An unspecified error occurred",
  onClose = () => {},
  autoCloseDelay = 1850,
}) => {
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
};

export default ErrorModal;
