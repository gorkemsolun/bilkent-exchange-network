/**
 * Renders an error modal component.
 *
 * @component
 * @param {ErrorModalProps} props - The props for the ErrorModal component.
 * @param {string} props.message - The error message to be displayed. Defaults to "An unspecified error occurred".
 * @param {Function} props.onClose - The function to be called when the modal is closed. Defaults to an empty function.
 * @param {number} props.autoCloseDelay - The delay in milliseconds before the modal automatically closes. Defaults to 1850.
 * @returns {JSX.Element} The rendered ErrorModal component.
 */
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
