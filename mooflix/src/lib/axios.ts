import axios from "axios";

const axAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axAPI.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axAPI;
