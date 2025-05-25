import { Router } from "express";
import * as contractController from "./contracts.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Gestión de contratos laborales
 */

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Obtener todos los contratos
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: Lista de contratos
 */
router.get("/", contractController.getAllContracts);

/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Obtener un contrato por ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato
 *     responses:
 *       200:
 *         description: Contrato encontrado
 *       404:
 *         description: Contrato no encontrado
 */
router.get("/:id", contractController.getContractById);

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Crear un nuevo contrato
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               job_psoition_id:
 *                 type: integer
 *               agreed_salary:
 *                 type: number
 *               department_id:
 *                 type: integer
 *               total_deductions:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               net_salary:
 *                 type: number
 *                 format: float
 *               contract_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", contractController.createContract);

/**
 * @swagger
 * /contracts/{id}:
 *   put:
 *     summary: Actualizar un contrato existente
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               job_psoition_id:
 *                 type: integer
 *               agreed_salary:
 *                 type: number
 *               department_id:
 *                 type: integer
 *               total_deductions:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               net_salary:
 *                 type: number
 *                 format: float
 *               contract_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contrato actualizado exitosamente
 *       404:
 *         description: Contrato no encontrado
 */
router.put("/:id", contractController.updateContract);

/**
 * @swagger
 * /contracts/{id}:
 *   delete:
 *     summary: Eliminar un contrato
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato
 *     responses:
 *       200:
 *         description: Contrato eliminado exitosamente
 *       404:
 *         description: Contrato no encontrado
 */
router.delete("/:id", contractController.deleteContract);

export default router;
