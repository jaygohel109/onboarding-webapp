import axios from "axios";

const API_BASE_URL = "https://onboarding-webapp-production.up.railway.app"; // Change this if hosted

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add Authorization token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
