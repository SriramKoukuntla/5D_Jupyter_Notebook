import React from "react";
import { LogoutButton } from "./Auth"; // Import the LogoutButton from Auth.js

const MainApplication = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Main Application</h1>
      <p>Welcome to the Main Application!</p>
      {/* Add Logout Button */}
      <LogoutButton />
    </div>
  );
};