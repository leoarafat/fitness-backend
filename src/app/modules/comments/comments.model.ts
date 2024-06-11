import { Schema, model } from 'mongoose';
import { IComments, IReply } from './comments.interface';

const replySchema = new Schema<IReply>(
  {
    reply: {
      type: String,
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'USER',
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
const commentsSchema = new Schema<IComments>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    reply: [replySchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Comment = model('Comment', commentsSchema);
