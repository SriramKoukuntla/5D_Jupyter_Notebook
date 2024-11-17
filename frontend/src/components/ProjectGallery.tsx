import React from "react";

interface Project {
  id: number;
  title: string;
  description: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  onProjectClick,
}) => {
  return (
    <div className="row">
      {projects.map((project) => (
        <div key={project.id} className="col-md-4">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => onProjectClick(project.id)} // Trigger the click handler
          >
            <div className="card-body">
              <h5 className="card-title">{project.title}</h5>
              <p className="card-text">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;
