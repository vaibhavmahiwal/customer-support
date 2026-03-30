import axios from "axios";

const client = axios.create({
  // This looks for VITE_API_URL in Vercel settings; falls back to localhost for your VS Code
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/dashboard")) {
        localStorage.removeItem("token");
        localStorage.removeItem("agent");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default client;