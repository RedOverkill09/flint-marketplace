import express from 'express';
import { listProducts } from '../controllers/buyerProduct.controller.js';

const router = express.Router();

router.get('/', listProducts);

export default router;