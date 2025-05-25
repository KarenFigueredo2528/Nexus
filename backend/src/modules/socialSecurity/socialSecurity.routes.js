import { Router } from "express";
import * as socialSecurityController from "./socialSecurity.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SocialSecurity
 *   description: Gestión de afiliaciones y seguridad social de empleados
 */

/**
 * @swagger
 * /social-security:
 *   get:
 *     summary: Obtener todos los registros de seguridad social
 *     tags: [SocialSecurity]
 *     responses:
 *       200:
 *         description: Lista de afiliaciones a seguridad social
 */
router.get("/", socialSecurityController.getAllSocialSecurity);

/**
 * @swagger
 * /social-security/{id}:
 *   get:
 *     summary: Obtener un registro de seguridad social por ID
 *     tags: [SocialSecurity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get("/:id", socialSecurityController.getSocialSecurityById);

/**
 * @swagger
 * /social-security:
 *   post:
 *     summary: Crear un nuevo registro de seguridad social
 *     tags: [SocialSecurity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registration_date:
 *                 type: string
 *                 format: date
 *               health_contribution:
 *                 type: number
 *                 format: float
 *               pension_contribution:
 *                 type: number
 *                 format: float
 *               risk_contribution:
 *                 type: number
 *                 format: float
 *               parafiscal_contribution:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", socialSecurityController.createSocialSecurity);

/**
 * @swagger
 * /social-security/{id}:
 *   put:
 *     summary: Actualizar un registro de seguridad social
 *     tags: [SocialSecurity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               health_provider:
 *                 type: string
 *               pension_provider:
 *                 type: string
 *               affiliation_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 *       404:
 *         description: Registro no encontrado
 */
router.put("/:id", socialSecurityController.updateSocialSecurity);

/**
 * @swagger
 * /social-security/{id}:
 *   delete:
 *     summary: Eliminar un registro de seguridad social
 *     tags: [SocialSecurity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 *       404:
 *         description: Registro no encontrado
 */
router.delete("/:id", socialSecurityController.deleteSocialSecurity);

export default router;
