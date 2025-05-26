import { Router } from "express";
import * as reportController from "./reports.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints para generar reportes del sistema de nómina
 */

/**
 * @swagger
 * /reports/payroll-summary:
 *   get:
 *     summary: Obtener resumen general de nómina
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Reporte de resumen de nómina generado exitosamente
 */
router.get("/payroll-summary", reportController.getGeneralPayrollReport);

/**
 * @swagger
 * /reports/absences:
 *   get:
 *     summary: Obtener reporte de ausencias
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Reporte de ausencias generado exitosamente
 */
router.get("/absences", reportController.getAbsencesReport);

/**
 * @swagger
 * /reports/salary-department:
 *   get:
 *     summary: Obtener reporte de salario por departamento
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Reporte de salarios por departamento generado exitosamente
 */
router.get("/salary-department", reportController.getSalaryByDepartmentReport);

/**
 * @swagger
 * /reports/employee-details:
 *   get:
 *     summary: Obtener reporte detallado de empleados
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Reporte detallado de empleados generado exitosamente
 */
router.get("/employee-details", reportController.getEmployeeDetailReport);

export default router;
