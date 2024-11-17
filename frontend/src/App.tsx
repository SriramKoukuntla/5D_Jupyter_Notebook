import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import ProjectDashboard from "./components/ProjectDashboard";
import DataActivity from "./DataActivity";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <ProjectDashboard /> : <Login /> // Redirect to Login if not authenticated
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dataActivity" element={<DataActivity />} />
      </Routes>
    </Router>
  );
};

export default App;
