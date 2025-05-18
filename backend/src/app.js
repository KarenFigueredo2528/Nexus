import express from 'express';
import bodyParser from 'body-parser';

import employeeRoutes from './modules/employees/employees.routes.js';
import departmentRoutes from './modules/departments/departments.routes.js';
import contractRoutes from './modules/contracts/contracts.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/contracts', contractRoutes);

app.use(errorHandler);

export default app;
