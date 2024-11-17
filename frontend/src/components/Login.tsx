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
            {/* <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="LeetCode Logo"
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
