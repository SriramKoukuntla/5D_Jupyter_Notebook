import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectGallery from "./ProjectGallery";

interface Project {
  id: number;
  title: string;
  description: string;
}

const ProjectDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 0,
      title: "Project Alpha",
      description:
        "An amazing project that involves creating something spectacular.",
    },
    {
      id: 1,
      title: "Project Beta",
      description:
        "Another fantastic project that aims to revolutionize technology.",
    },
    // Add more projects as needed
  ]);

  const navigate = useNavigate();

  const handleProjectClick = (projectId: number) => {
    navigate(`/dataActivity/${projectId}`);
  };

  return (
    <div className="container mt-4">
      <h1>Projects</h1>
      <ProjectGallery
        projects={projects}
        onProjectClick={handleProjectClick} // Navigate to DataActivity
      />
    </div>
  );
};

export default ProjectDashboard;
