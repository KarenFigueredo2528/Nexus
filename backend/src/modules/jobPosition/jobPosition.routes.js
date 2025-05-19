import { Router } from 'express';
import * as jobPositionController from './jobPosition.controller.js';

const router = Router();

router.get('/', jobPositionController.getAllJobPositions);
router.get('/:id', jobPositionController.getJobPositionById);
router.post('/', jobPositionController.createJobPosition);
router.put('/:id', jobPositionController.updateJobPosition);
router.delete('/:id', jobPositionController.deleteJobPosition);

export default router;
