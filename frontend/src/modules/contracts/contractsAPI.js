import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/contracts';

export const fetchContracts = () => axios.get(BASE_URL);
export const createContract = (data) => axios.post(BASE_URL, data);
export const updateContract = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteContract = (id) => axios.delete(`${BASE_URL}/${id}`);