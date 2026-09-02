import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import DeleteModal from '../components/DeleteModal';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const CalendarPage = ({ tasks = [], fetchTasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Helper to format date string YYYY-MM-DD
  const formatDateKey = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Filter tasks for selected day
  const selectedDateKey = formatDateKey(selectedDate);
  const dayTasks = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const taskDateStr = new Date(t.dueDate).toISOString().split('T')[0];
    return taskDateStr === selectedDateKey;
  });

  const handleToggleComplete = async (task) => {
    try {
      await API.patch(`/tasks/${task._id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to toggle complete task:', err);
    }
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, updatedData);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to edit task:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTask) return;
    setIsDeleting(true);
    try {
      await API.delete(`/tasks/${deletingTask._id}`);
      setDeletingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Build calendar days array
  const calendarCells = [];
  // Empty leading cells
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(new Date(year, month, d));
  }

  return (
    <div className="calendar-page animate-fade-in">
      {/* Header */}
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Calendar Schedule</h1>
          <p className="page-subtitle">View and schedule task deadlines by month and day</p>
        </div>
        <Link to="/add-task" className="btn btn-primary">
          <Plus size={16} />
          <span>Add Task</span>
        </Link>
      </div>

      {/* Calendar Control Bar */}
      <div className="calendar-control-card">
        <div className="month-navigation">
          <button className="btn btn-secondary btn-sm" onClick={handlePrevMonth} title="Previous Month">
            <ChevronLeft size={18} />
          </button>
          <h2>{monthNames[month]} {year}</h2>
          <button className="btn btn-secondary btn-sm" onClick={handleNextMonth} title="Next Month">
            <ChevronRight size={18} />
          </button>
          <button className="btn btn-secondary btn-sm ml-2" onClick={handleToday}>
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="calendar-grid-card">
        <div className="calendar-days-header">
          {daysOfWeek.map((day) => (
            <div key={day} className="calendar-day-label">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-dates-grid">
          {calendarCells.map((dateObj, idx) => {
            if (!dateObj) {
              return <div key={`empty-${idx}`} className="calendar-cell empty"></div>;
            }

            const cellDateKey = formatDateKey(dateObj);
            const isToday = formatDateKey(new Date()) === cellDateKey;
            const isSelected = selectedDateKey === cellDateKey;

            // Get tasks on this day
            const tasksOnDay = tasks.filter((t) => {
              if (!t.dueDate) return false;
              return new Date(t.dueDate).toISOString().split('T')[0] === cellDateKey;
            });

            return (
              <div
                key={cellDateKey}
                className={`calendar-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedDate(dateObj)}
              >
                <div className="cell-date-number">{dateObj.getDate()}</div>

                {tasksOnDay.length > 0 && (
                  <div className="cell-task-chips">
                    {tasksOnDay.slice(0, 3).map((task) => (
                      <span
                        key={task._id}
                        className={`cell-chip status-${task.status === 'completed' ? 'completed' : task.isOverdue ? 'overdue' : 'pending'}`}
                        title={task.title}
                      >
                        {task.title}
                      </span>
                    ))}
                    {tasksOnDay.length > 3 && (
                      <span className="more-chip">+{tasksOnDay.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tasks for Selected Date Section */}
      <div className="selected-date-tasks-section mt-4">
        <div className="section-header">
          <div>
            <h3 className="section-title">
              Tasks for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <p className="section-description">
              {dayTasks.length} task(s) scheduled for this date
            </p>
          </div>
        </div>

        {dayTasks.length === 0 ? (
          <div className="empty-state-card">
            <CalendarIcon size={40} className="empty-icon" />
            <h4>No Tasks Scheduled</h4>
            <p>No deadlines found for this date. Click below to add a new task.</p>
            <Link to="/add-task" className="btn btn-primary mt-3">
              <Plus size={16} />
              <span>Add Task for This Date</span>
            </Link>
          </div>
        ) : (
          <div className="tasks-grid mt-3">
            {dayTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={(taskToEdit) => setEditingTask(taskToEdit)}
                onDelete={(taskToDelete) => setDeletingTask(taskToDelete)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal-backdrop">
          <div className="modal-content modal-large">
            <div className="modal-header">
              <h3>Edit Task</h3>
            </div>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingTask(null)}
              submitBtnText="Save Changes"
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deletingTask}
        taskTitle={deletingTask?.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CalendarPage;
