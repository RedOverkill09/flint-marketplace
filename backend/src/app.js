import express from 'express';
const app = express();

app.use(express.json());

import authRoutes from './routes/auth.routes.js';
app.use("/api/auth", authRoutes);

import sellerProductRoutes from './routes/sellerProduct.routes.js';
app.use("/api/seller/products", sellerProductRoutes);

import productStatusRoute from './routes/productStatus.routes.js';
app.use("/api/seller/products", productStatusRoute);

import productGroupRoutes from './routes/productGroup.routes.js';
app.use("/api/seller/product-groups", productGroupRoutes);

import buyerProductRoutes from './routes/buyerProduct.routes.js';
app.use("/api/products", buyerProductRoutes);

import errorHandler from './middlewares/errorHandler.js';
app.use(errorHandler);

export default app;