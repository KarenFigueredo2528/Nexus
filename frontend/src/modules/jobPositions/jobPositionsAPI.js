import axios from 'axios';

const API_URL = 'http://localhost:3000/api/job-positions';

export const fetchJobPositions = () => axios.get(API_URL);
export const createJobPosition = (data) => axios.post(API_URL, data);
export const updateJobPosition = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteJobPosition = (id) => axios.delete(`${API_URL}/${id}`);