import { Schema, model } from 'mongoose';
import { IWatchList } from './watch-list.interface';

const watchLitSchema = new Schema<IWatchList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const WatchList = model('WatchList', watchLitSchema);
