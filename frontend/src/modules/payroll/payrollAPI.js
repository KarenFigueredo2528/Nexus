// src/modules/payroll/payrollAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/payroll';

export const fetchPayrolls = () => {
  return axios.get(`${BASE_URL}`);
};

export const createPayroll = (payrollData) => {
  return axios.post(`${BASE_URL}`, payrollData);
};

export const updatePayroll = (payrollId, payrollData) => {
  return axios.put(`${BASE_URL}/${payrollId}`, payrollData);
};

export const deletePayroll = (payrollId) => {
  return axios.delete(`${BASE_URL}/${payrollId}`);
};