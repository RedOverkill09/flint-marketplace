import express from 'express';
import protect from '../middlewares/protect.js';
import requireRole from '../middlewares/requireRole.js';
import { updateProductStatus } from '../controllers/productStatus.controller.js';
import isOwner from '../middlewares/isOwner.js';
import Product from '../models/product.model.js';

const router = express.Router();

router.use(protect, requireRole('SELLER'));

router.patch('/:id/status', isOwner(Product), updateProductStatus);

export default router;