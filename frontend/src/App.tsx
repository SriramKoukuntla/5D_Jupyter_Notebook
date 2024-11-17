import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { MainApplication } from "./components/MainApplication";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route path="/main" element={<MainApplication />} />
      </Routes>
    </Router>
  );
};

export default App;
