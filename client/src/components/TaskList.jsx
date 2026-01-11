import { tasksAPI } from '../api';

function TaskList({ tasks, onTaskDeleted }) {
  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(taskId);
        onTaskDeleted();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isDeadlinePassed = (dateString) => {
    if (!dateString) return false;
    const deadline = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
  };

  const getStatusClass = (status) => {
    const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-');
    if (normalizedStatus === 'in-progress') return 'in-progress';
    if (normalizedStatus === 'completed') return 'completed';
    return 'pending';
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="task-list-header">
          <h2>Tasks</h2>
        </div>
        <div className="empty-state">
          <p>No tasks in this project yet. Create your first task!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks</h2>
      </div>
      {tasks.map((task) => {
        const deadlinePassed = isDeadlinePassed(task.deadline);
        const statusClass = getStatusClass(task.status);
        
        return (
          <div key={task.id} className="task-item">
            <div className="task-info">
              <h4>{task.title}</h4>
              <div className="task-details">
                <span>
                  <span className="label">Assigned to:</span>
                  {task.user?.name || 'Unassigned'}
                </span>
                <span className={deadlinePassed ? 'deadline-overdue' : ''}>
                  <span className="label">Deadline:</span>
                  {formatDate(task.deadline)}
                </span>
              </div>
            </div>
            <div className="task-actions">
              <span className={`status-pill ${statusClass}`}>
                {task.status}
              </span>
              <button
                className="btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
