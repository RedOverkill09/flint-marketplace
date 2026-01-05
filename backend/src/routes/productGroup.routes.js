import express from 'express';
import protect from '../middlewares/protect.js';
import requireRole from '../middlewares/requireRole.js';
import { createProductGroup, getProductGroups } from '../controllers/productGroup.controller.js';

const router = express.Router();

router.use(protect, requireRole('SELLER'));

router.post('/', createProductGroup);
router.get('/', getProductGroups);

export default router;