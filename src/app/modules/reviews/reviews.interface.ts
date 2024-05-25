import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  user: Types.ObjectId | IUser;
  ratting: number;
  description: string;
};
