import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Auth"; // Import LogoutButton from Auth.js
import "./dashboard.css"; // Import the CSS for styling

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth0(); // Access user details

  const goToMainApp = () => {
    navigate("/main"); // Navigate to Main Application
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
      </div>
      <div className="dashboard-actions">
        <button onClick={goToMainApp} className="dashboard-button">
          Go to Main Application
        </button>
        <LogoutButton className="dashboard-button" />
      </div>
    </div>
  );
};
