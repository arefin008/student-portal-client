import api from "./axiosInstance";
export const getResultsApi = () => api.get("/api/results");
export const getStudentResultApi = (id) =>
  api.get(`/api/results/student/${id}`);
export const createResultApi = (data) => api.post("/api/results", data);
