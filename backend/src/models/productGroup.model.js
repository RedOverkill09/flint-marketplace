import mongoose from "mongoose";    

const productGroupSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requireed: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {timestamps: true});

const ProductGroup = mongoose.model("ProductGroup", productGroupSchema);
export default ProductGroup;