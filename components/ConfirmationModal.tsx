"use client";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isProcessing?: boolean;
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isProcessing = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className="modal" role="dialog" aria-labelledby="modal-title">
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="modal-close-btn"
            disabled={isProcessing}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isProcessing}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
            disabled={isProcessing}
            autoFocus
          >
            {isProcessing ? (
              <>
                <span className="loading-spinner-small"></span>
                Deleting...
              </>
            ) : (
              <>🗑️ {confirmText}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
