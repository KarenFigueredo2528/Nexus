// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

import { fetchEmployees } from './modules/employees/employeesAPI';
import Employees from './modules/employees';
import Payroll from './modules/payroll';
import JobPositions from './modules/jobPositions';
import Contracts from './modules/contracts';
import SocialSecurity from './modules/socialSecurity';
import Absence from './modules/absences';
import Reports from './modules/reports';

function App() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/job-positions" element={<JobPositions />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/ss" element={<SocialSecurity />} />
          <Route path="/absences" element={<Absence employees={employees} />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
