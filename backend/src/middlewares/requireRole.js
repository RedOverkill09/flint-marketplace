import AppError from "../utils/AppError.js";

const requireRole = (...roles) => {
    return (req, res, next) => {
        if(!req.user || !req.user.role ) {
            throw new AppError("Authentication required", 401);
        }
        if(!roles.includes(req.user.role)) {
            throw new AppError("Forbidden: You do not have the required role to access this resource", 403);
        }
        next();
    }
}

export default requireRole;