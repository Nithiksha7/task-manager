import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, Bell, CheckSquare, User, LogOut } from 'lucide-react';

const Navbar = ({ toggleSidebar, pendingRemindersCount = 0, onNotificationClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          className="mobile-hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <CheckSquare size={22} className="brand-icon" />
          </div>
          <span className="brand-name">TaskFlow</span>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="notification-badge-btn"
          onClick={onNotificationClick}
          title="Task Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {pendingRemindersCount > 0 && (
            <span className="badge-pulse">{pendingRemindersCount}</span>
          )}
        </button>

        {user && (
          <div className="user-profile-pill">
            <div className="avatar-circle">
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button className="quick-logout-btn" onClick={logout} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
