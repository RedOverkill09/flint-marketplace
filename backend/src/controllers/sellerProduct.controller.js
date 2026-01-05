import asyncHandler from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";
import AppError from "../utils/AppError.js";
import Product from "../models/product.model.js";

// CREATE PRODUCT (DRAFT only)
export const createProduct = asyncHandler(async (req, res) => {
    const {title, description, basePrice, images, category} = req.body;

    const categoryExists = await Category.findById(category);
    if(!categoryExists) {
        throw new AppError("Invalid category", 400);
    }

    const product = await Product.create({
        seller: req.user.id,
        title,
        description,
        basePrice,
        images,
        category,
        status: 'DRAFT'
    });

    res.status(201).json({
        status: 'success',
        product
    })
})

// UPDATE PRODUCT (ownership enforced)
export const updateProduct = asyncHandler(async (req, res) => {
    if("status" in req.body){
        throw new AppError("Product status cannot be changed via this endpoint", 400);
    }

    const productId = req.params.id;
    if(!productId){
        throw new AppError("Product ID is required", 400);
    }

    const product = req.resource;
    
    if(!product){
        throw new AppError("Product not found.", 404);
    }

    //Category immutable after activation
    if(req.body.category && product.status !== "DRAFT"){
        throw new AppError("Category cannot be changed after product activation", 400);
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({
        status: 'success',
        product
    });

}) 