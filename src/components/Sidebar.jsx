import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Home,
  ClipboardList,
  PlusSquare,
  Calendar,
  BarChart2,
  Settings,
  Heart,
  LogOut,
  X,
  CheckSquare,
  ChevronDown,
} from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: Home,
    },
    {
      label: 'My Tasks',
      path: '/tasks',
      icon: ClipboardList,
    },
    {
      label: 'Add Task',
      path: '/add-task',
      icon: PlusSquare,
    },
    {
      label: 'Calendar',
      path: '/calendar',
      icon: Calendar,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: BarChart2,
    },
    {
      label: 'Saudade',
      path: '/saudade',
      icon: Heart,
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          {/* Logo Header inside Sidebar */}
          <div className="sidebar-brand">
            <div className="brand-icon-wrapper">
              <CheckSquare size={22} className="brand-icon" />
            </div>
            <span className="brand-name">
              <span className="brand-dark">Task</span>
              <span className="brand-blue">Flow</span>
            </span>
            <button className="sidebar-close-btn" onClick={closeSidebar}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path + item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <Icon size={20} className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with User Card & Logout Button */}
        <div className="sidebar-footer">
          {user && (
            <div className="sidebar-user-card">
              <div className="avatar-circle">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name || 'User'}</span>
                <span className="user-email">{user.email || 'user@example.com'}</span>
              </div>
              <ChevronDown size={14} className="user-dropdown-icon" />
            </div>
          )}

          <button className="sidebar-logout-btn" onClick={logout}>
            <LogOut size={18} className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
