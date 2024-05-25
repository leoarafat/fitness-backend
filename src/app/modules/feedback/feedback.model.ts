import mongoose, { model } from 'mongoose';
import { IFeedback, IReply } from './feedback.interface';

const replySchema = new mongoose.Schema<IReply>(
  {
    text: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'replied'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    reply: replySchema,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const FeedBack = model('FeedBack', feedbackSchema);
