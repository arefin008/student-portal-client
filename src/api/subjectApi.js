import api from "./axiosInstance";
export const getSubjects = () => api.get("/api/subjects");
export const createSubject = (data) => api.post("/api/subjects", data);
export const updateSubject = (id, data) => api.put(`/api/subjects/${id}`, data);
export const deleteSubject = (id) => api.delete(`/api/subjects/${id}`);
