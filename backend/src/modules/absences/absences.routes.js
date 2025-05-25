import { Router } from "express";
import * as absencesController from "./absences.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Absences
 *   description: Gestión de ausencias de empleados
 */

/**
 * @swagger
 * /absences:
 *   get:
 *     summary: Obtener todas las ausencias
 *     tags: [Absences]
 *     responses:
 *       200:
 *         description: Lista de ausencias
 */
router.get("/", absencesController.getAllAbsences);

/**
 * @swagger
 * /absences/{id}:
 *   get:
 *     summary: Obtener una ausencia por ID
 *     tags: [Absences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ausencia
 *     responses:
 *       200:
 *         description: Ausencia encontrada
 *       404:
 *         description: Ausencia no encontrada
 */
router.get("/:id", absencesController.getAbsenceById);

/**
 * @swagger
 * /absences:
 *   post:
 *     summary: Crear una nueva ausencia
 *     tags: [Absences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ausencia creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", absencesController.createAbsence);

/**
 * @swagger
 * /absences/{id}:
 *   put:
 *     summary: Actualizar una ausencia existente
 *     tags: [Absences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ausencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ausencia actualizada exitosamente
 *       404:
 *         description: Ausencia no encontrada
 */
router.put("/:id", absencesController.updateAbsence);

/**
 * @swagger
 * /absences/{id}:
 *   delete:
 *     summary: Eliminar una ausencia
 *     tags: [Absences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ausencia
 *     responses:
 *       200:
 *         description: Ausencia eliminada exitosamente
 *       404:
 *         description: Ausencia no encontrada
 */
router.delete("/:id", absencesController.deleteAbsence);

export default router;
