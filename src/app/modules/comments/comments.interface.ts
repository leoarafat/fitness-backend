import { Types } from 'mongoose';
import { IClass } from '../class/class.interface';
import { IUser } from '../user/user.interface';
import { IAdmin } from '../admin/admin.interface';

export type IComments = {
  classId: Types.ObjectId | IClass;
  userId: Types.ObjectId | IUser;
  comment: string;
  reply: IReply;
};
export type IReply = {
  [x: string]: any;
  reply: string;
  adminId: Types.ObjectId | IAdmin;
  commentId: Types.ObjectId | IComments;
};
