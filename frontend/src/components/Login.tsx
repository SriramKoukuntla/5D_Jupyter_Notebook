import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css"; // Custom CSS for additional styling

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <div className="logo-container">
            {/* Optionally add a logo */}
            {/* <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="App Logo"
              className="logo"
            /> */}
          </div>
          <div className="form-group">
            <h1>Welcome to the App</h1>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="sign-in-btn"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          </div>
          <div className="links-container">
            <a href="/forgot-password" className="link">
              Forgot Password?
            </a>
            <a href="/signup" className="link">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
