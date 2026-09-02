import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Shield,
  Palette,
  Bell,
  Info,
  CheckCircle2,
  Lock,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Save,
  Check,
} from 'lucide-react';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { themeMode, setThemeMode, accentColor, setAccentColor } = useTheme();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'appearance' | 'notifications' | 'about'
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Settings State
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [desktopPush, setDesktopPush] = useState(true);
  const [reminderTime, setReminderTime] = useState('30'); // minutes

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const triggerSaveToast = (msg) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    triggerSaveToast('Password updated successfully!');
  };

  return (
    <div className="settings-page animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account, preferences, theme, and notification settings</p>
      </div>

      {saveSuccessMsg && (
        <div className="form-alert success animate-slide-in">
          <CheckCircle2 size={18} />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="settings-container">
        <div className="settings-tabs-sidebar">
          <button
            className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile & Account</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <Palette size={18} />
            <span>Appearance & Theme</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button
            className={`settings-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <Info size={18} />
            <span>About TaskFlow</span>
          </button>
        </div>

        {/* Settings Tab Content */}
        <div className="settings-content-card">
          {/* 1. Profile & Account Tab */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <div className="section-title-wrapper">
                <User size={22} className="text-primary" />
                <div>
                  <h3>Profile & Account</h3>
                  <p>View your account information and update password</p>
                </div>
              </div>

              <div className="profile-details-card">
                <div className="avatar-large">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="profile-info-group">
                  <h4>{user?.name || 'TaskFlow User'}</h4>
                  <p>{user?.email || 'user@example.com'}</p>
                  <span className="account-role-badge">
                    <Shield size={13} /> Active Account
                  </span>
                </div>
              </div>

              <form onSubmit={handlePasswordChange} className="password-form-box mt-4">
                <h4>Change Password</h4>
                {passwordError && <div className="form-alert error">{passwordError}</div>}

                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-half">
                    <label className="form-label">New Password</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="input-icon" />
                      <input
                        type="password"
                        className="form-input"
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-half">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="input-icon" />
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. Appearance & Theme Tab */}
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <div className="section-title-wrapper">
                <Palette size={22} className="text-primary" />
                <div>
                  <h3>Appearance & Theme</h3>
                  <p>Customize the visual interface and accent colors</p>
                </div>
              </div>

              <div className="theme-options-grid">
                <div
                  className={`theme-card ${themeMode === 'light' ? 'selected' : ''}`}
                  onClick={() => {
                    setThemeMode('light');
                    triggerSaveToast('Theme preference set to Light Mode!');
                  }}
                >
                  <div className="theme-icon-box">
                    <Sun size={24} />
                  </div>
                  <h4>Light Mode</h4>
                  <p>Clean white cards with crisp high-contrast text</p>
                  {themeMode === 'light' && <Check size={18} className="selected-check" />}
                </div>

                <div
                  className={`theme-card ${themeMode === 'dark' ? 'selected' : ''}`}
                  onClick={() => {
                    setThemeMode('dark');
                    triggerSaveToast('Theme preference set to Dark Mode!');
                  }}
                >
                  <div className="theme-icon-box">
                    <Moon size={24} />
                  </div>
                  <h4>Dark Mode</h4>
                  <p>Dark slate interface easy on the eyes in low light</p>
                  {themeMode === 'dark' && <Check size={18} className="selected-check" />}
                </div>

                <div
                  className={`theme-card ${themeMode === 'system' ? 'selected' : ''}`}
                  onClick={() => {
                    setThemeMode('system');
                    triggerSaveToast('Theme preference set to Auto System!');
                  }}
                >
                  <div className="theme-icon-box">
                    <Monitor size={24} />
                  </div>
                  <h4>System Default</h4>
                  <p>Automatically match your device system settings</p>
                  {themeMode === 'system' && <Check size={18} className="selected-check" />}
                </div>
              </div>

              <div className="accent-color-picker-box mt-4">
                <h4>Primary Accent Color</h4>
                <div className="color-swatches">
                  {[
                    { name: 'Ocean Blue', hex: '#2563eb' },
                    { name: 'Emerald Green', hex: '#059669' },
                    { name: 'Royal Violet', hex: '#7c3aed' },
                    { name: 'Rose Red', hex: '#e11d48' },
                  ].map((color) => (
                    <button
                      key={color.hex}
                      className={`color-swatch-btn ${accentColor === color.hex ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => {
                        setAccentColor(color.hex);
                        triggerSaveToast(`Accent color updated to ${color.name}!`);
                      }}
                      title={color.name}
                    >
                      {accentColor === color.hex && <Check size={16} color="#ffffff" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="section-title-wrapper">
                <Bell size={22} className="text-primary" />
                <div>
                  <h3>Notification Preferences</h3>
                  <p>Configure how and when you receive task deadline alerts</p>
                </div>
              </div>

              <div className="toggle-setting-row">
                <div className="toggle-setting-info">
                  <div className="toggle-icon">
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <h4>In-App Sound Notifications</h4>
                    <p>Play a gentle alert sound when a task deadline is approaching</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => {
                      setSoundAlerts(e.target.checked);
                      triggerSaveToast(`Sound alerts ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-setting-row">
                <div className="toggle-setting-info">
                  <div className="toggle-icon">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4>Desktop Push Notifications</h4>
                    <p>Show system desktop popups when TaskFlow is running in background</p>
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={desktopPush}
                    onChange={(e) => {
                      setDesktopPush(e.target.checked);
                      triggerSaveToast(`Desktop notifications ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Reminder Timing Preference</label>
                <select
                  className="form-input"
                  value={reminderTime}
                  onChange={(e) => {
                    setReminderTime(e.target.value);
                    triggerSaveToast(`Reminder timing set to ${e.target.value} minutes before deadline.`);
                  }}
                >
                  <option value="15">15 Minutes Before Deadline</option>
                  <option value="30">30 Minutes Before Deadline (Recommended)</option>
                  <option value="60">1 Hour Before Deadline</option>
                  <option value="120">2 Hours Before Deadline</option>
                </select>
              </div>
            </div>
          )}

          {/* 4. About TaskFlow Tab */}
          {activeTab === 'about' && (
            <div className="settings-section">
              <div className="section-title-wrapper">
                <Info size={22} className="text-primary" />
                <div>
                  <h3>About TaskFlow</h3>
                  <p>Application version, architecture details, and features overview</p>
                </div>
              </div>

              <div className="about-app-card">
                <div className="about-header">
                  <div className="about-logo-badge">
                    <span>TF</span>
                  </div>
                  <div>
                    <h4>TaskFlow SaaS Dashboard</h4>
                    <span className="version-pill">Version 2.4.0 (Production Build)</span>
                  </div>
                </div>
                <p className="about-description">
                  TaskFlow is a modern, high-performance task management web application built for daily productivity. It combines intuitive task organization, live visual ocean tide banners, real-time deadline notifications, and responsive SaaS analytics.
                </p>

                <div className="about-features-grid">
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>Real-time CRUD Task Synchronization</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>JWT Authentication & Secure MongoDB Backend</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>Background Deadline Notification Engine</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-success" />
                    <span>Continuous HD Live Ocean Tide Hero Banner</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
