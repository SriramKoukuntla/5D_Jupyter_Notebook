import React, { useState } from "react";
import ProjectGallery from "./ProjectGallery";
import "bootstrap/dist/css/bootstrap.min.css";

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
        "An amazing project that involves creating something spectacular. This project focuses on building an innovative solution to common problems faced in the industry. It includes a comprehensive analysis of the current market trends and proposes a novel approach.",
    },
    {
      id: 1,
      title: "Project Beta",
      description:
        "Another fantastic project that aims to revolutionize the way we think about technology. It delves deep into advanced concepts and provides practical implementations. The project spans multiple domains and integrates various technologies seamlessly.",
    },
    // Add more projects as needed
  ]);

  const handleAddProject = () => {
    // Implement the logic to add a new project
    console.log("Add New Project Clicked");
  };

  return (
    <div className="container mt-4">
      <h1
        style={{
          marginTop: "25px",
          marginBottom: "10px",
          color: "white",
        }}
      >
        Projects
      </h1>
      <ProjectGallery projects={projects} onAddProject={handleAddProject} />
    </div>
  );
};

export default ProjectDashboard;
