import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IProducts } from '../products/products.interface';

export type IOrder = {
  user: Types.ObjectId | IUser;
  product: Types.ObjectId | IProducts;
  quantity: number;
  totalAmount: number;
  paymentId: string;
  paymentStatus: string;
  deliveryDate: Date;
  transactionId: string;
  orderStatus: 'pending' | 'deliver' | 'shipped';
  location: string;
};
