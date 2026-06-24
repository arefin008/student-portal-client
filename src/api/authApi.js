import api from "./axiosInstance";
export const login = (data) => api.post("/api/auth/login", data);
