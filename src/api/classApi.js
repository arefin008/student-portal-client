import api from "./axiosInstance";
export const getClasses = () => api.get("/api/classes");
export const createClass = (data) => api.post("/api/classes", data);
export const updateClass = (id, data) => api.put(`/api/classes/${id}`, data);
export const deleteClass = (id) => api.delete(`/api/classes/${id}`);
