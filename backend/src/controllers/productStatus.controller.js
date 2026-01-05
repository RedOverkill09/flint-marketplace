import Product from "../models/product.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

// UPDATE PRODUCT STATUS
export const updateProductStatus = asyncHandler(async (req, res) => {
    const {status} = req.body;
    const productId = req.params.id;

    if(!productId){
        throw new AppError("Product ID is required", 400);
    }

    const product = req.resource;

    if(!product){
        throw new AppError("Product not found.", 404);
    }

    if(product.seller.toString() !== req.user.id.toString()){
        throw new AppError("Forbidden: You do not own this product", 403);
    }

    if(status === 'ACTIVE'){
        if(product.status != 'DRAFT'){
            throw new AppError("Only DRAFT products can be activated", 400);
        }
        product.status = 'ACTIVE';
    }else if(status === 'ARCHIVED'){
        if(product.status !== 'ACTIVE'){
            throw new AppError("Only ACTIVE products can be archived", 400);
        }
        product.status = 'ARCHIVED';
    }else{
        throw new AppError("Invalid status transition", 400);
    }

    await product.save();
    res.status(200).json({
        status: 'success',
        product
    });
});