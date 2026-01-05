import ProductGroup from "../models/productGroup.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProductGroup = asyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const seller = req.user.id;

    const group = await ProductGroup.create({
        seller,
        name,
        description
    });

    res.status(201).json({
        success: true,
        group
    })
})

export const getProductGroups = asyncHandler(async (req, res) => {
    const groups = await ProductGroup.find({
        seller: req.user.id
    });

    res.status(200).json({
        success: true,
        groups
    });
});