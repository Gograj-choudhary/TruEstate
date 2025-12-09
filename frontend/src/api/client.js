import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 60_000,
  headers: { "Content-Type": "application/json" },
});
