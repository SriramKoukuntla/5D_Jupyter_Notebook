
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProjectGallery from "./ProjectGallery";

interface Project {
  id: number;
  title: string;
  description: string;
}

const ProjectDashboard: React.FC = () => {
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		const getProjects = async () => {
			const projects = await fetch("http://localhost:8080/api/project/");
			const data = await projects.json();
			setProjects(
				data.data.map((project: any) => {
					return {
						id: project.id,
						title: project.name,
						description: project.desc,
					};
				})
			);
		};

		getProjects();
	}, []);
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
