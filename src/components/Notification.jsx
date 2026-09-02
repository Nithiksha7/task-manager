import React, { useEffect, useState } from 'react';
import { Bell, X, AlertCircle, CheckCircle2, Clock, Volume2 } from 'lucide-react';
import API from '../services/api';

export const requestBrowserNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notifications');
    return false;
  }
  if (Notification.permission === 'granted') {
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const triggerSystemNotification = (title, options) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.svg',
      ...options,
    });
  }
};

const NotificationSystem = ({ tasks = [], onTaskUpdate, isDrawerOpen, onCloseDrawer }) => {
  const [toasts, setToasts] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  );
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const addToast = (title, message, type = 'info', taskId = null) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type, taskId }]);
    
    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRequestPermission = async () => {
    const granted = await requestBrowserNotificationPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
    if (granted) {
      addToast(
        'Notifications Enabled!',
        'You will now receive desktop alerts 30 minutes before tasks end.',
        'success'
      );
    }
  };

  // 30-minute Reminder Checking Engine
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const checkReminders = () => {
      const now = new Date();

      tasks.forEach((task) => {
        // Only check pending tasks that haven't sent a reminder yet
        if (task.status === 'completed' || task.reminderSent) return;

        const due = new Date(task.dueDate);
        if (task.endingTime) {
          const [hours, minutes] = task.endingTime.split(':').map(Number);
          due.setHours(hours, minutes, 0, 0);
        } else {
          due.setHours(23, 59, 59, 999);
        }

        const diffInMinutes = (due.getTime() - now.getTime()) / (1000 * 60);

        // Send reminder if task is ending within 30 minutes (and not yet past by more than 5 min)
        if (diffInMinutes > -5 && diffInMinutes <= 30) {
          const minutesLabel = Math.max(1, Math.round(diffInMinutes));
          const reminderTitle = `⏰ Task Reminder: ${task.title}`;
          const reminderBody = `Task "${task.title}" is due in ${minutesLabel} minute(s) (Ending at ${task.endingTime}).`;

          // In-App Toast
          addToast(reminderTitle, reminderBody, 'warning', task._id);

          // Browser Native Notification
          triggerSystemNotification(reminderTitle, {
            body: reminderBody,
            tag: `task-reminder-${task._id}`,
          });

          // Update backend & local task state to prevent duplicate notifications
          API.put(`/tasks/${task._id}`, { reminderSent: true })
            .then(() => {
              if (onTaskUpdate) onTaskUpdate();
            })
            .catch((err) => console.error('Error updating reminder flag:', err));
        }
      });
    };

    // Run check immediately on load/update and then every 30 seconds
    checkReminders();
    const interval = setInterval(checkReminders, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <>
      {/* Redesigned Bottom Notification Banner Matching User Reference */}
      {permissionStatus === 'default' && !bannerDismissed && (
        <div className="bottom-notification-banner animate-slide-in">
          <button
            className="banner-close-x"
            onClick={() => setBannerDismissed(true)}
            aria-label="Close notification banner"
          >
            <X size={16} />
          </button>

          <div className="banner-bell-wrapper">
            <div className="bell-icon-container">
              <Bell size={26} className="golden-bell-icon" />
              <span className="bell-badge-count">1</span>
            </div>
          </div>

          <div className="banner-text-content">
            <h4 className="banner-title">Stay on top of your tasks</h4>
            <p className="banner-subtitle">
              Get notified 30 minutes before your task deadlines so you never miss what matters.
            </p>
          </div>

          <div className="banner-actions-group">
            <button
              className="banner-maybe-later-btn"
              onClick={() => setBannerDismissed(true)}
            >
              Maybe later
            </button>
            <button
              className="btn btn-enable-alerts"
              onClick={handleRequestPermission}
            >
              <Bell size={16} />
              <span>Enable Alerts</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating In-App Toast List */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type} animate-slide-in`}>
            <div className="toast-icon">
              {toast.type === 'success' && <CheckCircle2 size={20} />}
              {toast.type === 'warning' && <Clock size={20} />}
              {toast.type === 'error' && <AlertCircle size={20} />}
              {toast.type === 'info' && <Bell size={20} />}
            </div>
            <div className="toast-content">
              <h4 className="toast-title">{toast.title}</h4>
              <p className="toast-message">{toast.message}</p>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Notifications Drawer (Slide-out) */}
      {isDrawerOpen && (
        <div className="notification-drawer-backdrop" onClick={onCloseDrawer}>
          <div className="notification-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="flex-align gap-2">
                <Bell size={20} />
                <h3>Notifications & Reminders</h3>
              </div>
              <button className="drawer-close-btn" onClick={onCloseDrawer}>
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {permissionStatus !== 'granted' && (
                <div className="drawer-permission-box">
                  <Volume2 size={24} />
                  <p>Browser desktop alerts are currently disabled.</p>
                  <button className="btn btn-sm btn-primary" onClick={handleRequestPermission}>
                    Allow Desktop Alerts
                  </button>
                </div>
              )}

              <h4 className="section-subtitle">Upcoming Deadlines (Next 2 Hours)</h4>

              {tasks.filter((t) => t.status === 'pending').length === 0 ? (
                <div className="empty-drawer-state">
                  <CheckCircle2 size={36} className="text-muted" />
                  <p>All caught up! No pending reminders right now.</p>
                </div>
              ) : (
                <div className="reminder-list">
                  {tasks
                    .filter((t) => t.status === 'pending')
                    .map((task) => (
                      <div key={task._id} className="reminder-item">
                        <div className="reminder-info">
                          <span className="reminder-title">{task.title}</span>
                          <span className="reminder-time">
                            Due: {new Date(task.dueDate).toLocaleDateString()} at {task.endingTime}
                          </span>
                        </div>
                        {task.reminderSent && (
                          <span className="badge badge-sent">Reminder Sent</span>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;
