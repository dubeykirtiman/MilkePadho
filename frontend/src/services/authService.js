import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    console.log("Login API Response:", response.data);

    if (!response.data.token) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Invalid email or password");
  }
};


export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; 
};


export const getAuthToken = () => localStorage.getItem("token");


export const fetchDashboardData = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await axios.get("http://localhost:8080/api/user/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Dashboard fetch error:", error.response?.data?.message || error.message);

    if (error.response?.status === 401) {
      logoutUser();
    }

    throw new Error(error.response?.data?.message || "Failed to fetch dashboard data");
  }
};
