import React, { useEffect } from 'react';
import {
  BarChart2,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  Calendar,
  ListTodo,
  Zap,
} from 'lucide-react';

const Analytics = ({ tasks = [], fetchTasks }) => {
  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const overdue = tasks.filter((t) => t.isOverdue && t.status !== 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending' && !t.isOverdue).length;

  const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0;
  const overduePercent = total > 0 ? Math.round((overdue / total) * 100) : 0;

  // Productivity Score Calculation
  const productivityScore = Math.max(0, Math.min(100, Math.round(completionPercent * 0.9 - overduePercent * 0.5 + 10)));

  return (
    <div className="analytics-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Task Analytics</h1>
        <p className="page-subtitle">Productivity reports, completion metrics, and deadline performance insights</p>
      </div>

      {/* Analytics Overview Cards */}
      <div className="analytics-metrics-grid">
        <div className="analytics-card card-score">
          <div className="analytics-icon-badge primary">
            <Award size={24} />
          </div>
          <div className="analytics-info">
            <span className="analytics-label">Productivity Score</span>
            <h2 className="analytics-value">{productivityScore}/100</h2>
            <span className="analytics-subtext text-success">
              <TrendingUp size={14} /> Based on on-time completion
            </span>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon-badge success">
            <CheckCircle2 size={24} />
          </div>
          <div className="analytics-info">
            <span className="analytics-label">Completion Rate</span>
            <h2 className="analytics-value">{completionPercent}%</h2>
            <span className="analytics-subtext">{completed} of {total} tasks done</span>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon-badge warning">
            <Clock size={24} />
          </div>
          <div className="analytics-info">
            <span className="analytics-label">Pending Backlog</span>
            <h2 className="analytics-value">{pendingPercent}%</h2>
            <span className="analytics-subtext">{pending} tasks in progress</span>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon-badge danger">
            <AlertTriangle size={24} />
          </div>
          <div className="analytics-info">
            <span className="analytics-label">Overdue Ratio</span>
            <h2 className="analytics-value">{overduePercent}%</h2>
            <span className="analytics-subtext">{overdue} tasks past deadline</span>
          </div>
        </div>
      </div>

      {/* Breakdown Progress Bars Section */}
      <div className="analytics-section-card mt-4">
        <div className="section-header">
          <div className="flex-align gap-2">
            <BarChart2 size={22} className="text-primary" />
            <h3 className="section-title">Status Breakdown & Workload Distribution</h3>
          </div>
        </div>

        <div className="breakdown-list mt-3">
          {/* Completed Bar */}
          <div className="breakdown-item">
            <div className="breakdown-label-row">
              <span className="flex-align gap-2 font-medium">
                <CheckCircle2 size={18} className="text-success" /> Completed Tasks
              </span>
              <span className="font-bold">{completed} ({completionPercent}%)</span>
            </div>
            <div className="progress-track-bar">
              <div className="progress-fill-bar bg-success" style={{ width: `${completionPercent}%` }}></div>
            </div>
          </div>

          {/* Pending Bar */}
          <div className="breakdown-item mt-3">
            <div className="breakdown-label-row">
              <span className="flex-align gap-2 font-medium">
                <Clock size={18} className="text-warning" /> Pending Tasks
              </span>
              <span className="font-bold">{pending} ({pendingPercent}%)</span>
            </div>
            <div className="progress-track-bar">
              <div className="progress-fill-bar bg-warning" style={{ width: `${pendingPercent}%` }}></div>
            </div>
          </div>

          {/* Overdue Bar */}
          <div className="breakdown-item mt-3">
            <div className="breakdown-label-row">
              <span className="flex-align gap-2 font-medium">
                <AlertTriangle size={18} className="text-danger" /> Overdue Tasks
              </span>
              <span className="font-bold">{overdue} ({overduePercent}%)</span>
            </div>
            <div className="progress-track-bar">
              <div className="progress-fill-bar bg-danger" style={{ width: `${overduePercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="analytics-section-card mt-4">
        <div className="section-header">
          <div className="flex-align gap-2">
            <Zap size={22} className="text-primary" />
            <h3 className="section-title">Smart Productivity Insights</h3>
          </div>
        </div>

        <div className="insights-grid mt-3">
          <div className="insight-card">
            <Award size={24} className="text-primary mb-2" />
            <h4>Task Efficiency Status</h4>
            <p>
              {completionPercent >= 70
                ? 'Excellent performance! You are completing over 70% of your created tasks on schedule.'
                : 'Focus on tackling pending items with upcoming deadlines to boost your score.'}
            </p>
          </div>

          <div className="insight-card">
            <Calendar size={24} className="text-success mb-2" />
            <h4>Total Items Managed</h4>
            <p>You have managed a total of <strong>{total} tasks</strong> in your TaskFlow system workspace.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
