import { useState, useEffect } from 'react';
import { projectsAPI, tasksAPI, usersAPI } from '../api';
import ProjectCard from './ProjectCard';
import TaskList from './TaskList';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';
import UserForm from './UserForm';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  // Load tasks when project is selected
  useEffect(() => {
    if (selectedProject) {
      loadTasks(selectedProject.id);
    } else {
      setTasks([]);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async (projectId) => {
    try {
      const response = await tasksAPI.getAll(projectId);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setTasks([]);
  };

  const handleProjectCreated = () => {
    setShowProjectForm(false);
    loadProjects();
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    if (selectedProject) {
      loadTasks(selectedProject.id);
    }
    loadProjects();
  };

  const handleUserCreated = () => {
    setShowUserForm(false);
    loadUsers();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-state">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  // Show tasks view
  if (selectedProject) {
    return (
      <>
        <div className="nav-bar">
          <div className="nav-bar-content">
            <a href="#" className="nav-title" onClick={(e) => { e.preventDefault(); handleBackToProjects(); }}>
              Task Management
            </a>
          </div>
        </div>
        <div className="container">
          <button className="btn-text back-button" onClick={handleBackToProjects}>
            ← Back to Projects
          </button>
          
          <div className="page-header">
            <h1 className="page-title">{selectedProject.name}</h1>
            {selectedProject.description && (
              <p className="page-subtitle">{selectedProject.description}</p>
            )}
          </div>

          <div className="actions-bar">
            <button className="btn-primary" onClick={() => setShowTaskForm(true)}>
              Add New Task
            </button>
            <button className="btn-secondary" onClick={() => setShowUserForm(true)}>
              Add User
            </button>
          </div>

          {showTaskForm && (
            <TaskForm
              projectId={selectedProject.id}
              users={users}
              onClose={() => setShowTaskForm(false)}
              onSuccess={handleTaskCreated}
            />
          )}

          {showUserForm && (
            <UserForm
              onClose={() => setShowUserForm(false)}
              onSuccess={handleUserCreated}
            />
          )}

          <TaskList tasks={tasks} onTaskDeleted={() => loadTasks(selectedProject.id)} />
        </div>
      </>
    );
  }

  // Show projects view
  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar-content">
          <a href="#" className="nav-title" onClick={(e) => e.preventDefault()}>
            Task Management
          </a>
        </div>
      </div>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Manage your projects and tasks</p>
        </div>
        
        <div className="actions-bar">
          <button className="btn-primary" onClick={() => setShowProjectForm(true)}>
            Create New Project
          </button>
          <button className="btn-secondary" onClick={() => setShowUserForm(true)}>
            Add User
          </button>
        </div>

        {showProjectForm && (
          <ProjectForm
            onClose={() => setShowProjectForm(false)}
            onSuccess={handleProjectCreated}
          />
        )}

        {showUserForm && (
          <UserForm
            onClose={() => setShowUserForm(false)}
            onSuccess={handleUserCreated}
          />
        )}

        <div className="project-list">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No projects yet. Create your first project!</p>
            </div>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
