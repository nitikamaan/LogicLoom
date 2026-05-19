import axios from "axios";

const API = "https://syncbasebackend.onrender.com";

// Employee APIs
export const addEmployee = (data) =>
  axios.post(`${API}/api/employees`, data);

export const getEmployees = () =>
  axios.get(`${API}/api/employees`);

export const deleteEmployee = (id) =>
  axios.delete(`${API}/api/employees/${id}`);

// AI API
export const getAIRecommendation = (data) =>
  axios.post(`${API}/api/ai/recommendation`, data);