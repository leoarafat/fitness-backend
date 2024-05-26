import { Schema, model } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    payerId: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
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
export const Order = model('Order', orderSchema);
