import mongoose, { Schema, model } from 'mongoose';
import { IFeedback } from './feedback.interface';

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    text: {
      type: String,
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

export const FeedBack = model('FeedBack', feedbackSchema);
