import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { LogoutButton } from "./Auth"; // Import LogoutButton from Auth.js
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs
import "./Dashboard.css"; // Custom CSS for styling

interface Project {
  id: string;
  name: string;
}

export const Dashboard = () => {
  const { user, logout } = useAuth0(); // Access user details and logout function
  const [projects, setProjects] = useState<Project[]>([]); // State for user projects
  const navigate = useNavigate(); // Initialize navigate function

  // Load projects from local storage when component mounts
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Function to add a new project
  const addProject = () => {
    const newProjectName = prompt("Enter new project name");
    if (newProjectName) {
      const newProject = {
        id: uuidv4(), // Generate a unique ID
        name: newProjectName,
      };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Save to local storage
    }
  };

  // Function to delete a project by ID
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Save updated list to local storage
  };

  // Function to edit a project by ID
  const editProject = (id: string) => {
    const newProjectName = prompt("Edit project name");
    if (newProjectName) {
      const updatedProjects = projects.map((project) =>
        project.id === id ? { ...project, name: newProjectName } : project
      );
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Save updated list to local storage
    }
  };

  // Handle logout and clear projects from local storage
  const handleLogout = () => {
    localStorage.removeItem("projects"); // Remove projects from local storage
    logout({ returnTo: window.location.origin }); // Logout user
  };

  // Function to navigate to Main Application with project name
  const handleProjectClick = (projectName: string) => {
    navigate("/main-application", { state: { projectName } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to your Dashboard!</h1>
      </div>

      {/* Projects Section */}
      <div className="projects-container">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => handleProjectClick(project.name)}
          >
            <h3>{project.name}</h3>
            <div className="project-card-actions">
              <button
                className="edit-project-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  editProject(project.id);
                }}
              >
                ✏️
              </button>
              <button
                className="delete-project-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Button */}
      <button className="add-project-btn" onClick={addProject}>
        +
      </button>

      {/* Logout Button (Fixed to the bottom left) */}
      <LogoutButton onClick={handleLogout} />
    </div>
  );
};
