import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import DoubtPage from "./pages/DoubtPage";
import AuthGuard from "./utils/AuthGuard";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-wrap">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/doubts" element={<AuthGuard><DoubtPage /></AuthGuard>} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
