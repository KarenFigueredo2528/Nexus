import { Router } from "express";
import * as departmentController from "./departments.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Gestión de departamentos dentro de la organización
 */

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: Lista de departamentos
 */
router.get("/", departmentController.getAllDepartments);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Obtener un departamento por ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *       404:
 *         description: Departamento no encontrado
 */
router.get("/:id", departmentController.getDepartmentById);

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", departmentController.createDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Actualizar un departamento existente
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado exitosamente
 *       404:
 *         description: Departamento no encontrado
 */
router.put("/:id", departmentController.updateDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Eliminar un departamento
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado exitosamente
 *       404:
 *         description: Departamento no encontrado
 */
router.delete("/:id", departmentController.deleteDepartment);

export default router;
