import React from 'react';
import { Calendar, Clock, CheckCircle2, Circle, Edit3, Trash2, AlertTriangle } from 'lucide-react';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  // Format date helper to prevent timezone shift
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const parts = dateStr.split('T')[0].split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts.map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format 24h time to 12h AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Calculate status
  const isCompleted = task.status === 'completed';
  const isOverdue = task.isOverdue || (!isCompleted && checkOverdueLocal(task.dueDate, task.endingTime));
  const isCompletionDisabled = isOverdue && !isCompleted;

  function checkOverdueLocal(dueDate, endingTime) {
    if (!dueDate) return false;
    const parts = dueDate.split('T')[0].split('-');
    let due;
    if (parts.length === 3) {
      const [year, month, day] = parts.map(Number);
      due = new Date(year, month - 1, day);
    } else {
      due = new Date(dueDate);
    }

    if (endingTime) {
      const [h, m] = endingTime.split(':').map(Number);
      due.setHours(h, m, 0, 0);
    } else {
      due.setHours(23, 59, 59, 999);
    }
    return new Date() > due;
  }

  let statusBadgeClass = 'status-pending';
  let statusText = 'Pending';

  if (isCompleted) {
    statusBadgeClass = 'status-completed';
    statusText = 'Completed';
  } else if (isOverdue) {
    statusBadgeClass = 'status-overdue';
    statusText = 'Overdue';
  }

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-title-wrapper">
          <button
            className={`complete-checkbox-btn ${isCompleted ? 'checked' : ''} ${isCompletionDisabled ? 'disabled' : ''}`}
            onClick={() => !isCompletionDisabled && onToggleComplete(task)}
            disabled={isCompletionDisabled}
            title={
              isCompletionDisabled
                ? 'Task deadline expired. Click Edit to update task deadline.'
                : isCompleted
                ? 'Mark as Pending'
                : 'Mark as Completed'
            }
            aria-label="Toggle task completion"
          >
            {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          </button>
          <h3 className={`task-title ${isCompleted ? 'line-through' : ''}`}>{task.title}</h3>
        </div>
        <span className={`status-badge ${statusBadgeClass}`}>
          {isOverdue && !isCompleted && <AlertTriangle size={12} style={{ marginRight: '4px' }} />}
          {statusText}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-meta">
        <div className="meta-item" title="Task Due Date">
          <Calendar size={15} />
          <span>Deadline: {formatDate(task.dueDate)}</span>
        </div>
        {task.endingTime && (
          <div className="meta-item" title="Task Deadline Time">
            <Clock size={15} />
            <span>Time: {formatTime(task.endingTime)}</span>
          </div>
        )}
      </div>

      <div className="task-card-actions">
        <button
          className={`action-btn mark-btn ${isCompleted ? 'undo' : ''} ${isCompletionDisabled ? 'disabled' : ''}`}
          onClick={() => !isCompletionDisabled && onToggleComplete(task)}
          disabled={isCompletionDisabled}
          title={
            isCompletionDisabled
              ? 'Deadline expired. Click Edit to update task deadline.'
              : isCompleted
              ? 'Mark Pending'
              : 'Mark Completed'
          }
        >
          {isCompleted ? 'Mark Pending' : 'Mark Completed'}
        </button>
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          <Edit3 size={16} />
          <span>Edit</span>
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task)}
          title="Delete Task"
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
