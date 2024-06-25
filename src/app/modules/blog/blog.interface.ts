import { Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IBlog = {
  topic: string;
  title: string;
  description: string;
  images: [];
  created_by: Types.ObjectId | IAdmin;
  accessType: 'Basic' | 'Standard' | 'Premium';
  youtubeUrl: string;
};
