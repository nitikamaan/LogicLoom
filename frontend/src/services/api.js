import axios from "axios";

const API = "http://localhost:5000/api";

// Employee APIs
export const addEmployee = (data) =>
  axios.post(`${API}/employees`, data);

export const getEmployees = () =>
  axios.get(`${API}/employees`);

export const deleteEmployee = (id) =>
  axios.delete(`${API}/employees/${id}`);

// AI API
export const getAIRecommendation = (data) =>
  axios.post(`${API}/ai/recommendation`, data);