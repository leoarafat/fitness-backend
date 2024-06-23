import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IFeedback = {
  user: Types.ObjectId | IUser;
  text: string;
  approveStatus: 'pending' | 'approved';
};
