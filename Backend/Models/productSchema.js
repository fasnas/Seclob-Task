import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  ram: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    categoryName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
      trim: true,
    },
    variants: [variantSchema],
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("products", productSchema);

export default products;