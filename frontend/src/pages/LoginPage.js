import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/LoginPage.css"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
  
    try {
      const response = await loginUser(credentials);

      console.log("Login Response:", response); 

      if (response.token) {
        localStorage.setItem("token", response.token); 
        alert("Login Successful!");
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
