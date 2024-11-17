import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToMainApp = () => {
    navigate("/main"); // Navigate to Main Application
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <button onClick={goToMainApp} style={{ padding: "10px 20px" }}>
        Main Application
      </button>
    </div>
  );
};
