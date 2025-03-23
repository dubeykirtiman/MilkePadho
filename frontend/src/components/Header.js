import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <header className={`header-container ${token ? "logged-in" : ""}`}>
      <div className="header-content">
        <h1 className="header-logo">Doubt Discussion Portal</h1>
        <nav className="nav">
          <ul className="nav-links">
            {!token ? (
              <>
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button className="nav-link logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
