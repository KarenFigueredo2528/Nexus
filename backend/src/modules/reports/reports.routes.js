import { Router } from 'express';
import * as reportController from './reports.controller.js';

const router = Router();

router.get('/payroll-summary', reportController.getGeneralPayrollReport);
router.get('/absences', reportController.getAbsencesReport);
router.get('/salary-department', reportController.getSalaryByDepartmentReport);
router.get('/employee-details', reportController.getEmployeeDetailReport);

export default router;
