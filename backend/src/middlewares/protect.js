import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authenticated", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded?.userId) {
    throw new AppError("Invalid token payload", 401);
  }
  
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  // TODO: Optionally, you can check if the user changed password after the token was issued we have not implemented that here. because we don't have password change tracking field in the user model. we can add that later if needed. //

  req.user = { 
    id: user._id,
    role: user.role 
  };
  next();
});

export default protect;