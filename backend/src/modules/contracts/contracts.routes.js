import { Router } from 'express';
import * as contractController from './contracts.controller.js';

const router = Router();

router.get('/', contractController.getAllContracts);
router.get('/:id', contractController.getContractById);
router.post('/', contractController.createContract);
router.put('/:id', contractController.updateContract);
router.delete('/:id', contractController.deleteContract);

export default router;
