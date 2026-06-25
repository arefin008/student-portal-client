import api from "./axiosInstance";
export const loginApi = (data) => api.post("/api/auth/login", data);
