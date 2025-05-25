import { Router } from "express";
import * as jobPositionController from "./jobPosition.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: JobPositions
 *   description: Gestión de cargos o puestos de trabajo
 */

/**
 * @swagger
 * /job-positions:
 *   get:
 *     summary: Obtener todos los puestos de trabajo
 *     tags: [JobPositions]
 *     responses:
 *       200:
 *         description: Lista de puestos
 */
router.get("/", jobPositionController.getAllJobPositions);

/**
 * @swagger
 * /job-positions/{id}:
 *   get:
 *     summary: Obtener un puesto de trabajo por ID
 *     tags: [JobPositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del puesto de trabajo
 *     responses:
 *       200:
 *         description: Puesto encontrado
 *       404:
 *         description: Puesto no encontrado
 */
router.get("/:id", jobPositionController.getJobPositionById);

/**
 * @swagger
 * /job-positions:
 *   post:
 *     summary: Crear un nuevo puesto de trabajo
 *     tags: [JobPositions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               department_id:
 *                 type: integer
 *               level:
 *                type: string
 *               base_salary:
 *                type: number
 *     responses:
 *       201:
 *         description: Puesto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", jobPositionController.createJobPosition);

/**
 * @swagger
 * /job-positions/{id}:
 *   put:
 *     summary: Actualizar un puesto de trabajo existente
 *     tags: [JobPositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del puesto de trabajo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               department_id:
 *                 type: integer
 *               level:
 *                type: string
 *               base_salary:
 *                type: number
 *     responses:
 *       200:
 *         description: Puesto actualizado exitosamente
 *       404:
 *         description: Puesto no encontrado
 */
router.put("/:id", jobPositionController.updateJobPosition);

/**
 * @swagger
 * /job-positions/{id}:
 *   delete:
 *     summary: Eliminar un puesto de trabajo
 *     tags: [JobPositions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del puesto de trabajo
 *     responses:
 *       200:
 *         description: Puesto eliminado exitosamente
 *       404:
 *         description: Puesto no encontrado
 */
router.delete("/:id", jobPositionController.deleteJobPosition);

export default router;
