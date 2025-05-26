import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/social-security';

export const fetchSocialSecurity = () => axios.get(BASE_URL);
export const createSocialSecurity = (data) => axios.post(BASE_URL, data);
export const updateSocialSecurity = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteSocialSecurity = (id) => axios.delete(`${BASE_URL}/${id}`);