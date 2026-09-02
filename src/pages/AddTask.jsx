import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import TaskForm from '../components/TaskForm';
import { PlusCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

const AddTask = ({ onTaskCreated }) => {
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleCreateTask = async (taskData) => {
    try {
      await API.post('/tasks', taskData);
      setSuccessMsg('Task created successfully!');
      
      if (onTaskCreated) {
        onTaskCreated();
      }

      setTimeout(() => {
        navigate('/tasks');
      }, 1000);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      throw new Error(message);
    }
  };

  return (
    <div className="add-task-page animate-fade-in">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <div className="page-title-group">
          <div className="title-icon-badge">
            <PlusCircle size={24} />
          </div>
          <div>
            <h1 className="page-title">Add New Task</h1>
            <p className="page-subtitle">Define deadlines and description for your task</p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="form-alert success animate-slide-in">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="form-wrapper-card">
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => navigate('/tasks')}
          submitBtnText="Create Task"
        />
      </div>
    </div>
  );
};

export default AddTask;
