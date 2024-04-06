import { Schema, model } from 'mongoose';
import { IProduct, ProductModel } from './product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre('save', async function (next) {
  const existingProduct = await Product.findOne({ name: this.name });
  if (existingProduct) {
    throw new Error('This Product is already Exist');
  }
  next();
});

export const Product = model<IProduct, ProductModel>('Product', ProductSchema);
