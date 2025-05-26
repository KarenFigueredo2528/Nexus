import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

import { 
  fetchPayrollSummary,
  fetchAbsencesReport,
  fetchSalaryByDepartment,
  fetchEmployeeDetailReport
} from './reportsAPI';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [payrollSummary, setPayrollSummary] = useState([]);
  const [absencesReport, setAbsencesReport] = useState([]);
  const [salaryByDept, setSalaryByDept] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState([]);

  const loadReports = async () => {
    setLoading(true);
    try {
      const [payrollRes, absencesRes, salaryRes, employeeRes] = await Promise.all([
        fetchPayrollSummary(),
        fetchAbsencesReport(),
        fetchSalaryByDepartment(),
        fetchEmployeeDetailReport()
      ]);
      setPayrollSummary(payrollRes.data);
      setAbsencesReport(absencesRes.data);
      setSalaryByDept(salaryRes.data);
      setEmployeeDetail(employeeRes.data);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const generatePDF = (title, columns, data) => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    doc.autoTable({
      startY: 20,
      head: [columns.map(col => col.header)],
      body: data.map(row => columns.map(col => row[col.field])),
      theme: 'striped',
    });
    doc.save(`${title}.pdf`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports Dashboard</Typography>

      {/* Payroll Summary */}
      <Box mb={4}>
        <Typography variant="h6">Payroll Summary</Typography>
        <Button variant="contained" onClick={() => generatePDF('Payroll Summary', [
          { header: 'Period', field: '_id' },
          { header: 'Total Earnings', field: 'total_earnings' },
          { header: 'Total Deductions', field: 'total_deductions' },
          { header: 'Total Net Salary', field: 'total_net_salary' },
        ], payrollSummary)}>Download PDF</Button>
        <ReportTable columns={[
          { header: 'Period', field: '_id' },
          { header: 'Total Earnings', field: 'total_earnings' },
          { header: 'Total Deductions', field: 'total_deductions' },
          { header: 'Total Net Salary', field: 'total_net_salary' },
        ]} data={payrollSummary} />
      </Box>

      {/* Absences Report */}
      <Box mb={4}>
        <Typography variant="h6">Absences Report</Typography>
        <Button variant="contained" onClick={() => generatePDF('Absences Report', [
          { header: 'Employee', field: '_id' },
          { header: 'Total Absences', field: 'total_absences' },
        ], absencesReport)}>Download PDF</Button>
        <ReportTable columns={[
          { header: 'Employee', field: '_id' },
          { header: 'Total Absences', field: 'total_absences' },
        ]} data={absencesReport} />
      </Box>

      {/* Salary by Department */}
      <Box mb={4}>
        <Typography variant="h6">Salary by Department</Typography>
        <Button variant="contained" onClick={() => generatePDF('Salary by Department', [
          { header: 'Department', field: '_id' },
          { header: 'Total Salary', field: 'total_salary' },
        ], salaryByDept)}>Download PDF</Button>
        <ReportTable columns={[
          { header: 'Department', field: '_id' },
          { header: 'Total Salary', field: 'total_salary' },
        ]} data={salaryByDept} />
      </Box>

      {/* Employee Detail Report */}
      <Box mb={4}>
        <Typography variant="h6">Employee Detail Report</Typography>
        <Button variant="contained" onClick={() => generatePDF('Employee Detail Report', [
          { header: 'First Name', field: 'first_name' },
          { header: 'Last Name', field: 'last_name' },
          { header: 'Identification', field: 'identification' },
          { header: 'Email', field: 'email' },
          { header: 'Status', field: 'status' },
          { header: 'Total Contracts', field: 'total_contracts' },
          { header: 'Total Absences', field: 'total_absences' },
        ], employeeDetail)}>Download PDF</Button>
        <ReportTable columns={[
          { header: 'First Name', field: 'first_name' },
          { header: 'Last Name', field: 'last_name' },
          { header: 'Identification', field: 'identification' },
          { header: 'Email', field: 'email' },
          { header: 'Status', field: 'status' },
          { header: 'Total Contracts', field: 'total_contracts' },
          { header: 'Total Absences', field: 'total_absences' },
        ]} data={employeeDetail} />
      </Box>
    </Box>
  );
};

const ReportTable = ({ columns, data }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.field}>{col.header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={col.field}>{row[col.field]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Reports;