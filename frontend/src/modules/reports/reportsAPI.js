import axios from 'axios';

export const fetchPayrollSummary = () => axios.get('/api/reports/payroll-summary');
export const fetchAbsencesReport = () => axios.get('/api/reports/absences');
export const fetchSalaryByDepartment = () => axios.get('/api/reports/salary-by-department');
export const fetchEmployeeDetailReport = () => axios.get('/api/reports/employee-detail');