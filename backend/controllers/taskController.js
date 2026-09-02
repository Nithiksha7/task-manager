import Task from '../models/Task.js';

// Helper function to calculate if task is overdue
export const checkIsOverdue = (task) => {
  if (task.status === 'completed') return false;
  
  const due = new Date(task.dueDate);
  if (task.endingTime) {
    const [hours, minutes] = task.endingTime.split(':').map(Number);
    due.setHours(hours, minutes, 0, 0);
  } else {
    due.setHours(23, 59, 59, 999);
  }
  
  return new Date() > due;
};

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ dueDate: 1, endingTime: 1 });
    
    // Add computed overdue property
    const formattedTasks = tasks.map((task) => {
      const taskObj = task.toObject();
      taskObj.isOverdue = checkIsOverdue(task);
      return taskObj;
    });

    res.json(formattedTasks);
  } catch (error) {
    console.error('Get Tasks Error:', error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, endingTime } = req.body;

    if (!title || !dueDate || !endingTime) {
      return res.status(400).json({ message: 'Title, due date, and ending time are required' });
    }

    const task = await Task.create({
      title,
      description: description || '',
      dueDate,
      endingTime,
      user: req.user._id,
      status: 'pending',
      reminderSent: false,
    });

    const taskObj = task.toObject();
    taskObj.isOverdue = checkIsOverdue(task);

    res.status(201).json(taskObj);
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

// @desc    Update task details
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, endingTime, status, reminderSent } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
    task.endingTime = endingTime !== undefined ? endingTime : task.endingTime;
    if (status !== undefined) task.status = status;
    if (reminderSent !== undefined) task.reminderSent = reminderSent;

    const updatedTask = await task.save();
    const taskObj = updatedTask.toObject();
    taskObj.isOverdue = checkIsOverdue(updatedTask);

    res.json(taskObj);
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// @desc    Toggle or complete task
// @route   PATCH /api/tasks/:id/complete
// @access  Private
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    // Check if task is overdue and pending
    const isOverdue = checkIsOverdue(task);
    if (isOverdue && task.status !== 'completed') {
      return res.status(400).json({
        message: 'Task deadline has expired. Please edit the task deadline before marking as completed.'
      });
    }

    task.status = task.status === 'completed' ? 'pending' : 'completed';

    const updatedTask = await task.save();
    const taskObj = updatedTask.toObject();
    taskObj.isOverdue = checkIsOverdue(updatedTask);

    res.json(taskObj);
  } catch (error) {
    console.error('Complete Task Error:', error);
    res.status(500).json({ message: 'Failed to complete task', error: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    await Task.deleteOne({ _id: task._id });
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};
