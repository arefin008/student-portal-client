import api from "./axiosInstance";
export const getDashboardStatsApi = () => api.get("/api/dashboard/stats");
