import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import DeleteModal from '../components/DeleteModal';
import { getDailyQuote } from '../data/saudadeQuotes';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  Sparkles,
  Heart,
} from 'lucide-react';

const Dashboard = ({ tasks = [], fetchTasks }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const todayQuote = getDailyQuote(new Date());
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchTasks();
      setLoading(false);
    };
    load();
  }, []);

  // Ensure continuous video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay handled:', err);
      });
    }
  }, []);

  // Compute analytics numbers
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending' && !t.isOverdue).length;
  const overdueTasks = tasks.filter((t) => t.isOverdue && t.status !== 'completed').length;

  // Recent/Upcoming tasks (up to 6 tasks)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 6);

  // Dynamic time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 🌅';
    if (hour < 18) return 'Good Afternoon ☀️';
    return 'Good Evening 🌙';
  };

  const handleToggleComplete = async (task) => {
    try {
      await API.patch(`/tasks/${task._id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status:', err);
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

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Welcome Hero Section with Real Looping Ocean Tides Video */}
      <div className="dashboard-welcome-banner ocean-welcome-card">
        {/* Real HD Beach Ocean Tides Video (No trees, pure beach & ocean water) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="ocean-video-bg"
        >
          <source src="/beach-waves.mp4" type="video/mp4" />
        </video>

        {/* Subtle Overlay for High Text Readability */}
        <div className="ocean-overlay"></div>

        <div className="welcome-content">
          <div className="welcome-text">
            <span className="welcome-greeting-tag">{getGreeting()}</span>
            <h2>Welcome back, {user?.name || 'User'} ✨</h2>
            <p>Stay focused, stay consistent and make progress every day.</p>
          </div>
          <Link to="/add-task" className="btn btn-welcome-action">
            <div className="btn-icon-glow">
              <Plus size={16} />
            </div>
            <span>Create New Task</span>
            <Sparkles size={16} className="btn-sparkle-icon" />
          </Link>
        </div>
      </div>

      {/* Clean Statistics Cards Grid */}
      <div className="summary-cards-grid">
        <div className="summary-card card-total">
          <div className="card-icon-wrapper">
            <ListTodo size={22} />
          </div>
          <div className="card-content">
            <span className="card-label">Total Tasks</span>
            <h3 className="card-value">{totalTasks}</h3>
            <span className="card-subtext">All created items</span>
          </div>
        </div>

        <div className="summary-card card-pending">
          <div className="card-icon-wrapper">
            <Clock size={22} />
          </div>
          <div className="card-content">
            <span className="card-label">Pending Tasks</span>
            <h3 className="card-value">{pendingTasks}</h3>
            <span className="card-subtext">In progress</span>
          </div>
        </div>

        <div className="summary-card card-completed">
          <div className="card-icon-wrapper">
            <CheckCircle2 size={22} />
          </div>
          <div className="card-content">
            <span className="card-label">Completed Tasks</span>
            <h3 className="card-value">{completedTasks}</h3>
            <span className="card-subtext">Done</span>
          </div>
        </div>

        <div className="summary-card card-overdue">
          <div className="card-icon-wrapper">
            <AlertTriangle size={22} />
          </div>
          <div className="card-content">
            <span className="card-label">Overdue Tasks</span>
            <h3 className="card-value">{overdueTasks}</h3>
            <span className="card-subtext">Requires action</span>
          </div>
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Recent Tasks</h3>
            <p className="section-description">Upcoming tasks sorted by deadline</p>
          </div>
          <Link to="/tasks" className="view-all-link">
            <span>View All Tasks</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner-ring"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : recentTasks.length === 0 ? (
          <div className="empty-state-card">
            <ListTodo size={44} className="empty-icon" />
            <h4>No Tasks Found</h4>
            <p>You haven't created any tasks yet. Start organizing your workflow today!</p>
            <Link to="/add-task" className="btn btn-primary mt-3">
              <Plus size={16} />
              <span>Add Your First Task</span>
            </Link>
          </div>
        ) : (
          <div className="tasks-grid">
            {recentTasks.map((task) => (
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

      {/* Dedicated Saudade Quote Widget Card */}
      {todayQuote && (
        <div className="dashboard-saudade-widget mt-4">
          {todayQuote.photo?.url && (
            <div
              className="dashboard-saudade-photo-bg"
              style={{ backgroundImage: `url("${todayQuote.photo.url}")` }}
            />
          )}
          <div className="dashboard-saudade-overlay" />

          <div className="dashboard-saudade-content">
            <div className="saudade-widget-header">
              <div className="saudade-badge">
                <Heart size={14} className="fill-heart text-primary inline-icon" />
                <span>SAUDADE</span>
              </div>
            </div>
            <blockquote className="saudade-widget-quote">
              "{todayQuote.text}"
            </blockquote>
            <div className="saudade-widget-footer">
              <span className="saudade-widget-author">— {todayQuote.author}</span>
              <Link to="/saudade" className="btn btn-secondary btn-sm">
                <span>Read More</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal Dialog */}
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

export default Dashboard;
