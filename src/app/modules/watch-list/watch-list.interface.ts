import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IClass } from '../class/class.interface';

export type IWatchList = {
  user: Types.ObjectId | IUser;
  classId: Types.ObjectId | IClass;
};
