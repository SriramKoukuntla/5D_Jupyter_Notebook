import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Auth"; // Import LogoutButton from Auth.js

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth0(); // Access user details

  const goToMainApp = () => {
    navigate("/main"); // Navigate to Main Application
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard, {user?.name}</h1>
      <button
        onClick={goToMainApp}
        style={{ padding: "10px 20px", margin: "10px" }}
      >
        Go to Main Application
      </button>
      {/* Include Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
