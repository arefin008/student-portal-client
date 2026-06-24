import api from "./axiosInstance";
export const getResults = () => api.get("/api/results");
export const getStudentResult = (id) => api.get(`/api/results/student/${id}`);
export const createResult = (data) => api.post("/api/results", data);
