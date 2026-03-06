import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_PROTOCOL === 'http'
  ? `http://${import.meta.env.VITE_DOMAIN}:${import.meta.env.VITE_PORT}/api`
  : `https://${import.meta.env.VITE_DOMAIN}/api`;

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;