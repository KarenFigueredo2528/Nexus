import { Router } from 'express';
import * as payrollController from './payroll.controller.js';

const router = Router();

router.get('/', payrollController.getAllPayroll);
router.get('/:id', payrollController.getPayrollById);
router.post('/', payrollController.createPayroll);
router.put('/:id', payrollController.updatePayroll);
router.delete('/:id', payrollController.deletePayroll);

export default router;
