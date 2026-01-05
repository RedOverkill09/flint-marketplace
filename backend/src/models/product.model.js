import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "ARCHIVED"],
      default: "DRAFT",
    },

    optionGroups: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        required: {
          type: Boolean,
          default: true,
        },
        options: [
          {
            label: {
              type: String,
              required: true,
              trim: true,
            },
            priceDelta: {
              type: Number,
              required: true,
              min: 0,
              default: 0,
            },
            imageOverrides: [String],
          },
        ],
      },
    ],

    productGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductGroup",
      default: null,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
