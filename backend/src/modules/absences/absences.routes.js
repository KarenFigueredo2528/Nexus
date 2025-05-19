import { Router } from 'express';
import * as absencesController from './absences.controller.js';

const router = Router();
router.get('/', absencesController.getAllAbsences);
router.get('/:id', absencesController.getAbsenceById);
router.post('/', absencesController.createAbsence);
router.put('/:id', absencesController.updateAbsence);
router.delete('/:id', absencesController.deleteAbsence);

export default router;
