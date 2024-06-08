import { Schema, model } from 'mongoose';
import { IProducts } from './products.interface';

const productSchema = new Schema<IProducts>(
  {
    productName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'baby'],
      required: true,
    },
    date: {
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
    images: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Products = model<IProducts>('Product', productSchema);
