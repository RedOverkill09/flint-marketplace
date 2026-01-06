import asyncHandler from '../utils/asyncHandler.js';
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';
import AppError from '../utils/AppError.js';

export const listProducts = asyncHandler(async (req, res) => {
    let {page = 1, limit = 10, category, sortType = "newest"} = req.query;
    page = Number(page);
    limit = Number(limit);

    let sortOption = {};
    if(sortType === "newest") sortOption = {createdAt: -1};
    else if(sortType === "price_asc") sortOption = {basePrice: 1};
    else if(sortType === "price_desc") sortOption = {basePrice: -1};
    
    const filter = {status: 'ACTIVE'};

    if(category){
        const catExists = await Category.findById(category);
        if(!catExists || !catExists.isLeaf){
            throw new AppError("Invalid category filter", 400);
        }
        filter.category = category;
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .select("title basePrice images category");

    const buyerView = products.map( (product) => ({
        id: product._id,
        title: product.title,
        basePrice: product.basePrice,
        images: product.images,
        category: product.category
    }));

    res.status(200).json({
        page,
        limit,
        totalProducts,
        products: buyerView
    });
});