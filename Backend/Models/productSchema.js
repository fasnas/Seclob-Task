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
    },
    description: {
      type: String,
    },
    subCategory: {
      type: String,
      required: true,
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

export default products = mongoose.model('products', productSchema);
