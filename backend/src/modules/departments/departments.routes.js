// departments.routes.js
import { Router } from 'express';
import * as departmentController from './departments.controller.js';

const router = Router();

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

export default router;
