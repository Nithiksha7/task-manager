import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, X } from 'lucide-react';

const TaskForm = ({ initialData = null, onSubmit, onCancel, submitBtnText = 'Create Task' }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      
      if (initialData.dueDate) {
        if (typeof initialData.dueDate === 'string' && initialData.dueDate.includes('T')) {
          setDueDate(initialData.dueDate.split('T')[0]);
        } else if (typeof initialData.dueDate === 'string' && initialData.dueDate.includes('-')) {
          setDueDate(initialData.dueDate);
        } else {
          const d = new Date(initialData.dueDate);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          setDueDate(`${year}-${month}-${day}`);
        }
      } else {
        setDueDate('');
      }

      setEndingTime(initialData.endingTime || '');
    } else {
      // Default due date to today
      const today = new Date().toISOString().split('T')[0];
      setDueDate(today);
      // Default ending time to next hour
      const now = new Date();
      now.setHours(now.getHours() + 1);
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = '00';
      setEndingTime(`${hours}:${minutes}`);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!dueDate) {
      setError('Due date is required');
      return;
    }
    if (!endingTime) {
      setError('Ending time is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDate,
        endingTime,
      });
    } catch (err) {
      setError(err.message || 'Something went wrong while saving the task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form-card" onSubmit={handleSubmit}>
      {error && <div className="form-alert error">{error}</div>}

      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title <span className="required">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          className="form-input"
          placeholder="e.g. Complete Project Proposal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="task-description" className="form-label">
          Task Description
        </label>
        <textarea
          id="task-description"
          rows={4}
          className="form-textarea"
          placeholder="Add detailed context, steps, or notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group col-half">
          <label htmlFor="task-due-date" className="form-label">
            Due Date <span className="required">*</span>
          </label>
          <input
            id="task-due-date"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group col-half">
          <label htmlFor="task-ending-time" className="form-label">
            Ending Time <span className="required">*</span>
          </label>
          <input
            id="task-ending-time"
            type="time"
            className="form-input"
            value={endingTime}
            onChange={(e) => setEndingTime(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {initialData ? <Save size={16} /> : <PlusCircle size={16} />}
          <span>{isSubmitting ? 'Saving...' : submitBtnText}</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
