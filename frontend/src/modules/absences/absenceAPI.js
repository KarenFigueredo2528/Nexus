import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/absences';

export const fetchAbsences = () => axios.get(BASE_URL);
export const createAbsence = (data) => axios.post(BASE_URL, data);
export const updateAbsence = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteAbsence = (id) => axios.delete(`${BASE_URL}/${id}`);