import { Router } from 'express';
import * as socialSecurityController from './socialSecurity.controller.js';

const router = Router();

router.get('/', socialSecurityController.getAllSocialSecurity);
router.get('/:id', socialSecurityController.getSocialSecurityById);
router.post('/', socialSecurityController.createSocialSecurity);
router.put('/:id', socialSecurityController.updateSocialSecurity);
router.delete('/:id', socialSecurityController.deleteSocialSecurity);

export default router;
