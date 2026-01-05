import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isOwner = (Model, ownerField = 'seller') =>
    asyncHandler(async(req, res, next) => {
        const resourceId = req.params.id;
        if(!resourceId){
            throw new AppError("Resource ID is required", 400);
        }

        const resource = await Model.findById(resourceId);

        if(!resource){
            throw new AppError("Resource not found.", 404);
        }

        if(resource[ownerField].toString() !== req.user.id.toString()){
            throw new AppError("Forbidden: You do not own this resource", 403);
        }

        req.resource = resource;
        next();
    });

export default isOwner;