import React, { useState, useEffect, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import API from './services/api';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationSystem from './components/Notification';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/CalendarPage';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Saudade from './pages/Saudade';

const AppLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();

  // Close mobile sidebar on route navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks for layout:', err);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, fetchTasks]);

  const pendingRemindersCount = tasks.filter(
    (t) => t.status === 'pending' && !t.isOverdue
  ).length;

  return (
    <div className="app-container">
      {isAuthenticated && (
        <Navbar
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          pendingRemindersCount={pendingRemindersCount}
          onNotificationClick={() => setIsNotificationDrawerOpen((prev) => !prev)}
        />
      )}

      <div className={`app-body ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}>
        {isAuthenticated && (
          <Sidebar
            isOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
        )}

        <main className="app-main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard tasks={tasks} fetchTasks={fetchTasks} />}
              />
              <Route
                path="/add-task"
                element={<AddTask onTaskCreated={fetchTasks} />}
              />
              <Route
                path="/tasks"
                element={<Tasks tasks={tasks} fetchTasks={fetchTasks} />}
              />
              <Route
                path="/calendar"
                element={<CalendarPage tasks={tasks} fetchTasks={fetchTasks} />}
              />
              <Route
                path="/analytics"
                element={<Analytics tasks={tasks} fetchTasks={fetchTasks} />}
              />
              <Route
                path="/settings"
                element={<Settings />}
              />
              <Route
                path="/saudade"
                element={<Saudade />}
              />
            </Route>

            {/* Default Route */}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
            />
          </Routes>

          {isAuthenticated && (
            <NotificationSystem
              tasks={tasks}
              onTaskUpdate={fetchTasks}
              isDrawerOpen={isNotificationDrawerOpen}
              onCloseDrawer={() => setIsNotificationDrawerOpen(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
