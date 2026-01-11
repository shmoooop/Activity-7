import { useState } from 'react';
import { usersAPI } from '../api';

function UserForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await usersAPI.create(formData);
      onSuccess();
      setFormData({ name: '' });
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <button 
        type="button"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: 'var(--color-text-tertiary)',
          padding: '0.25rem',
          width: '2rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--color-bg-surface)';
          e.target.style.color = 'var(--color-danger)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'var(--color-text-tertiary)';
        }}
      >
        ×
      </button>
      <h2>👤 Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="actions-bar">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Creating...' : '✨ Create User'}
          </button>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
