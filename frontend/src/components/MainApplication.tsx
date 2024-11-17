import React from "react";
import { LogoutButton } from "./Auth"; // Import LogoutButton from Auth.js
import "./mainApplication.css"; // Import the CSS for styling

export const MainApplication = () => {
  return (
    <div className="main-app-container">
      <div className="main-app-header">
        <h1>Main Application</h1>
        <p>Welcome to the Main Application!</p>
      </div>
      <div className="main-app-actions">
        <LogoutButton className="main-app-button" />
      </div>
    </div>
  );
};
