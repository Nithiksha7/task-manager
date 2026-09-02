import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

const DeleteModal = ({ isOpen, taskTitle, onConfirm, onCancel, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content animate-scale-up" role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onCancel} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="modal-icon-wrapper danger">
          <AlertTriangle size={32} />
        </div>

        <div className="modal-body">
          <h3 className="modal-title">Delete Task Confirmation</h3>
          <p className="modal-text">
            Are you sure you want to delete this task?
          </p>
          {taskTitle && (
            <div className="modal-highlight-box">
              <span className="highlight-label">Task:</span> "{taskTitle}"
            </div>
          )}
          <p className="modal-warning">This action cannot be undone.</p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Task'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
