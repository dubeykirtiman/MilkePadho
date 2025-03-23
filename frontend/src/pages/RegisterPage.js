import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/RegisterPage.css"; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userClass: "",
    exam: "IIT JEE", 
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser(formData);
      alert("Registration Successful!");
      localStorage.setItem("token", response.token); 
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input type="text" name="userClass" placeholder="Class" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <select name="exam" onChange={handleChange} required>
            <option value="IIT JEE">IIT JEE</option>
            <option value="NEET">NEET</option>
            <option value="Boards">Boards</option>
            <option value="Olympiads">Olympiads</option>
          </select>
        </div>

        <div className="input-group">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        </div>

        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
