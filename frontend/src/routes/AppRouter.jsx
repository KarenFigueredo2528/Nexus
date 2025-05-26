import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Employees from '../modules/employees';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}> 
        <Route index element={<Employees />} />
        <Route path="employees" element={<Employees />} />
        {/* Aquí irán más rutas para los otros módulos */}
      </Route>
    </Routes>
  );
};

export default AppRouter;