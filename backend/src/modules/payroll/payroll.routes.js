import { Router } from "express";
import * as payrollController from "./payroll.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payroll
 *   description: Gestión de nóminas y pagos de empleados
 */

/**
 * @swagger
 * /payroll:
 *   get:
 *     summary: Obtener todas las nóminas
 *     tags: [Payroll]
 *     responses:
 *       200:
 *         description: Lista de registros de nómina
 */
router.get("/", payrollController.getAllPayroll);

/**
 * @swagger
 * /payroll/{id}:
 *   get:
 *     summary: Obtener un registro de nómina por ID
 *     tags: [Payroll]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de nómina
 *     responses:
 *       200:
 *         description: Registro de nómina encontrado
 *       404:
 *         description: Registro de nómina no encontrado
 */
router.get("/:id", payrollController.getPayrollById);

/**
 * @swagger
 * /payroll:
 *   post:
 *     summary: Crear un nuevo registro de nómina
 *     tags: [Payroll]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               period_start:
 *                 type: string
 *                 format: date
 *               period_end:
 *                 type: string
 *                 format: date
 *               base_salary:
 *                 type: number
 *                 format: float
 *               deductions:
 *                 type: number
 *                 format: float
 *               bonuses:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Registro de nómina creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", payrollController.createPayroll);

/**
 * @swagger
 * /payroll/{id}:
 *   put:
 *     summary: Actualizar un registro de nómina existente
 *     tags: [Payroll]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de nómina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period_start:
 *                 type: string
 *                 format: date
 *               period_end:
 *                 type: string
 *                 format: date
 *               base_salary:
 *                 type: number
 *                 format: float
 *               deductions:
 *                 type: number
 *                 format: float
 *               bonuses:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Registro de nómina actualizado exitosamente
 *       404:
 *         description: Registro de nómina no encontrado
 */
router.put("/:id", payrollController.updatePayroll);

/**
 * @swagger
 * /payroll/{id}:
 *   delete:
 *     summary: Eliminar un registro de nómina
 *     tags: [Payroll]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de nómina
 *     responses:
 *       200:
 *         description: Registro de nómina eliminado exitosamente
 *       404:
 *         description: Registro de nómina no encontrado
 */
router.delete("/:id", payrollController.deletePayroll);

export default router;
