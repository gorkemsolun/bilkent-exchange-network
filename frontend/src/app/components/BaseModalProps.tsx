interface BaseModalProps {
  title?: string;
  message?: string;
  onClose?: () => void; // Callback for when the modal is closed
  onConfirm?: () => void; // Callback for when the user confirms or accepts
  onCancel?: () => void; // Callback for when the user cancels or rejects
  showCloseButton?: boolean; // Flag to determine whether to show a close button
  customClass?: string; // Custom CSS class for styling
  disableOverlayClick?: boolean; // Flag to disable closing the modal on overlay click
  modalWidth?: string; // Custom width for the modal
  modalHeight?: string; // Custom height for the modal
  draggable?: boolean; // Flag to enable dragging the modal
}

export default BaseModalProps;
