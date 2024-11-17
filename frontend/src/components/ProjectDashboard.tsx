import React, { useEffect, useState } from "react";
import ProjectGallery from "./ProjectGallery";
import "bootstrap/dist/css/bootstrap.min.css";

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
			<ProjectGallery
				projects={projects}
				onAddProject={handleAddProject}
			/>
		</div>
	);
};

export default ProjectDashboard;
