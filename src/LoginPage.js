// frontend/src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Your CSS file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("faculty");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          loginType,
        }),
      });

      // Handle response
      const data = await response.json();

      if (!response.ok) {
        // Show error message if login fails
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
        return;
      }

      // If login is successful
      console.log("Login successful:", data);

      // Store the token (if using JWT)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Store user role and email in local storage
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("email", data.user.email); // Store the email here

      // Navigate to the respective dashboard
      if (data.user.role === "faculty") {
        navigate("/faculty-form"); // Navigate to the profile page directly after login
      } else if (data.user.role === "authority") {
        navigate("/higherAuthorityHome");
      } else {
        // Handle other roles if necessary
        console.warn("Unknown user role:", data.user.role);
        setErrorMessage("Login successful, but unable to determine dashboard.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{loginType === "faculty" ? "Faculty Login" : "Higher Authority Login"}</h2>
        <div className="login-toggle">
          <button
            className={loginType === "faculty" ? "active" : ""}
            onClick={() => setLoginType("faculty")}
          >
            Faculty Login
          </button>
          <button
            className={loginType === "higherAuthority" ? "active" : ""}
            onClick={() => setLoginType("higherAuthority")}
          >
            Higher Authority Login
          </button>
        </div>
        <form onSubmit={handleLogin}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;