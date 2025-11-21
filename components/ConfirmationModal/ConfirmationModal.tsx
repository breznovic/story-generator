"use client";

import s from "./ConfirmationModal.module.css";

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
      className={s.modalOverlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className={s.modal} role="dialog" aria-labelledby="modal-title">
        <div className={s.modalHeader}>
          <h3 id="modal-title" className={s.modalTitle}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className={s.modalCloseBtn}
            disabled={isProcessing}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={s.modalBody}>
          <p>{message}</p>
        </div>

        <div className={s.modalFooter}>
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
