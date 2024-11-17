import React, { useState } from "react";
import { loginWithGoogle } from "./";
import "./App.css"; // Custom CSS for additional styling

function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { user, session, error } = await loginWithGoogle();

      if (error) {
        throw new Error(error);
      }

      setSuccessMessage("Logged in successfully!");
      console.log("Logged in user:", user);
      // Redirect or update state after login if needed
    } catch (err: any) {
      setErrorMessage(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <div className="logo-container">
            {/* Replace with your logo if needed */}
            {/* <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="Logo"
              className="logo"
            /> */}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username or E-mail"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </div>

          {/* Display success message if login is successful */}
          {successMessage && <p className="success-text">{successMessage}</p>}

          {/* Display error message if login fails */}
          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <div className="captcha-section">
            <p className="success-text">✔ Success!</p>
            <img
              src="https://via.placeholder.com/100" // Replace with your captcha image or Cloudflare logo
              alt="Captcha"
              className="captcha-image"
            />
          </div>

          <button
            type="button"
            className="sign-in-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In with Google"}
          </button>

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
