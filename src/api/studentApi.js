import api from "./axiosInstance";
export const getStudentsApi = () => api.get("/api/students");
export const createStudentApi = (data) => api.post("/api/students", data);
export const updateStudentApi = (id, data) =>
  api.put(`/api/students/${id}`, data);
export const deleteStudentApi = (id) => api.delete(`/api/students/${id}`);
