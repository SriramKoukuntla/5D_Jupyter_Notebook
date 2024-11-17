import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Don't run the effect if still loading

    if (isAuthenticated) {
      // If already authenticated, navigate to the Dashboard
      navigate("/dashboard");
    } else {
      // Otherwise, initiate the login flow
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, navigate]);

  return null; // No UI is needed
}

export default Login;
