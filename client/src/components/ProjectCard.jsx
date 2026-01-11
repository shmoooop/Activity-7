function ProjectCard({ project, onClick }) {
  const taskCount = project.tasks ? project.tasks.length : 0;

  return (
    <div className="project-card" onClick={onClick}>
      <h3>{project.name}</h3>
      {project.description && (
        <p>{project.description}</p>
      )}
      <div className="project-meta">
        {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
      </div>
    </div>
  );
}

export default ProjectCard;
