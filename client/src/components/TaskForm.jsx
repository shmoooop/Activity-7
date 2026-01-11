import { useState, useEffect } from 'react';
import { tasksAPI, usersAPI } from '../api';

function TaskForm({ projectId, users, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    status: 'pending',
    deadline: '',
    userId: users.length > 0 ? users[0].id : '',
    projectId: projectId,
  });
  const [loading, setLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(users);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers();
    } else {
      setAvailableUsers(users);
    }
  }, [users]);

  const loadUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setAvailableUsers(response.data);
      if (response.data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          userId: response.data[0].id,
        }));
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await tasksAPI.create(formData);
      onSuccess();
      setFormData({
        title: '',
        status: 'pending',
        deadline: '',
        userId: availableUsers.length > 0 ? availableUsers[0].id : '',
        projectId: projectId,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task. Make sure a user exists.');
    } finally {
      setLoading(false);
    }
  };

  if (availableUsers.length === 0) {
    return (
      <div className="form-container">
        <p>Please create a user first before creating tasks.</p>
        <div className="actions-bar">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Status *</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Assign to User *</label>
          <select
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: parseInt(e.target.value) })
            }
            required
          >
            {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="actions-bar">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
