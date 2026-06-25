import api from "./axiosInstance";
export const getClassesApi = () => api.get("/api/classes");
export const createClassApi = (data) => api.post("/api/classes", data);
export const updateClassApi = (id, data) => api.put(`/api/classes/${id}`, data);
export const deleteClassApi = (id) => api.delete(`/api/classes/${id}`);
