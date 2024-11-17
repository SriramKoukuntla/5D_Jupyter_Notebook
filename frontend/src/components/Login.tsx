import React from "react";
import "./App.css"; // Custom CSS for additional styling

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <div className="logo-container">
            {/* <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="LeetCode Logo"
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
          <div className="captcha-section">
            <p className="success-text">✔ Success!</p>
            <img
              src="https://via.placeholder.com/100" // Replace with Cloudflare logo or captcha image
              alt="Captcha"
              className="captcha-image"
            />
          </div>
          <button type="submit" className="sign-in-btn">
            Sign In
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


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     navigate("/dashboard"); // Navigate to Dashboard
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ margin: "10px", padding: "10px" }}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ margin: "10px", padding: "10px" }}
//       />
//       <br />
//       <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
//         Login
//       </button>
//     </div>
//   );
// };
