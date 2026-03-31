import axios from 'axios';

export const api = axios.create({
  baseURL: "/api/v1", // ✅ ALWAYS relative
  withCredentials: true,
});