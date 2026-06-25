import api from "./axiosInstance";
export const getSubjectsApi = () => api.get("/api/subjects");
export const createSubjectApi = (data) => api.post("/api/subjects", data);
export const updateSubjectApi = (id, data) =>
  api.put(`/api/subjects/${id}`, data);
export const deleteSubjectApi = (id) => api.delete(`/api/subjects/${id}`);
