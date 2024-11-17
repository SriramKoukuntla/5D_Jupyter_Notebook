import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./components/LandingPage"; // Import LandingPage component
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { MainApplication } from "./components/MainApplication";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        {/* LandingPage is now the first screen seen */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainApplication />} />
      </Routes>
    </Router>
  );
};

export default App;
