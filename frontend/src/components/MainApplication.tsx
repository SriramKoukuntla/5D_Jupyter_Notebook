import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate from react-router-dom
import { LogoutButton } from "./Auth"; // Import LogoutButton from Auth.js
import "./mainApplication.css"; // Import the CSS for styling

export const MainApplication = () => {
  const location = useLocation(); // Access location object
  const navigate = useNavigate(); // Use navigate hook to programmatically navigate
  const { projectName } = location.state || {}; // Get the project name from location state

  // Function to handle back navigation
  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the Dashboard
  };

  return (
    <div className="main-app-container">
      <div className="main-app-header">
        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          &#8592; {/* Left arrow symbol */}
        </button>
        <h1>Main Application</h1>
        {projectName && <p>Viewing Project: {projectName}</p>}{" "}
        {/* Display project name */}
        <p>Welcome to the Main Application!</p>
      </div>

      <div className="main-app-actions">
        <LogoutButton className="main-app-button" />
      </div>
    </div>
  );
};
