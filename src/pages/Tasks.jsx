import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import DeleteModal from '../components/DeleteModal';
import {
  Search,
  Filter,
  Plus,
  CheckSquare,
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const Tasks = ({ tasks = [], fetchTasks }) => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'overdue'
  const [searchQuery, setSearchQuery] = useState('');
  
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchTasks();
      setLoading(false);
    };
    load();
  }, []);

  const handleToggleComplete = async (task) => {
    try {
      await API.patch(`/tasks/${task._id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, updatedData);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
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

  // Filter & Search Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const isCompleted = task.status === 'completed';
    const isOverdue = task.isOverdue && !isCompleted;

    if (!matchesSearch) return false;

    if (activeFilter === 'pending') {
      return !isCompleted && !isOverdue;
    }
    if (activeFilter === 'completed') {
      return isCompleted;
    }
    if (activeFilter === 'overdue') {
      return isOverdue;
    }

    return true;
  });

  return (
    <div className="tasks-page animate-fade-in">
      {/* Header */}
      <div className="tasks-page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">Manage, edit, filter and track your tasks</p>
        </div>
        <Link to="/add-task" className="btn btn-primary shadow-glow">
          <Plus size={18} />
          <span>Add New Task</span>
        </Link>
      </div>

      {/* Control Bar: Search and Filters */}
      <div className="tasks-control-bar">
        <div className="search-input-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-field"
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <ListTodo size={16} />
            <span>All ({tasks.length})</span>
          </button>
          <button
            className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            <Clock size={16} />
            <span>Pending ({tasks.filter((t) => t.status === 'pending' && !t.isOverdue).length})</span>
          </button>
          <button
            className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            <CheckCircle2 size={16} />
            <span>Completed ({tasks.filter((t) => t.status === 'completed').length})</span>
          </button>
          <button
            className={`filter-tab ${activeFilter === 'overdue' ? 'active' : ''}`}
            onClick={() => setActiveFilter('overdue')}
          >
            <AlertTriangle size={16} />
            <span>Overdue ({tasks.filter((t) => t.isOverdue && t.status !== 'completed').length})</span>
          </button>
        </div>
      </div>

      {/* Task Cards Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner-ring"></div>
          <p>Loading your task collection...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state-card">
          <CheckSquare size={48} className="empty-icon" />
          <h4>No Tasks Match Your Filter</h4>
          <p>
            {searchQuery
              ? `No tasks found matching "${searchQuery}".`
              : `You have no ${activeFilter !== 'all' ? activeFilter : ''} tasks at the moment.`}
          </p>
          {searchQuery && (
            <button className="btn btn-secondary mt-3" onClick={() => setSearchQuery('')}>
              Clear Search Query
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-grid mt-4">
          {filteredTasks.map((task) => (
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

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal-backdrop">
          <div className="modal-content modal-large animate-scale-up">
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

export default Tasks;
