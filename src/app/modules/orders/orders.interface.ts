import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IProducts } from '../products/products.interface';

export type IOrder = {
  user: Types.ObjectId | IUser;
  product: Types.ObjectId | IProducts;
  quantity: number;
  totalAmount: number;
  deliveryDate: Date;
  address: string;
  contactNumber: string;
  paymentMethod: 'card' | 'paypal';
  transactionId: string;
  payerId: string;
  orderStatus: 'pending' | 'deliver' | 'shipped';
};
