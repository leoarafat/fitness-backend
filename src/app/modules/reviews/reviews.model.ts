import { Schema, model } from 'mongoose';
import { IReview } from './reviews.interface';

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ratting: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = model('Review', reviewSchema);

export default Review;
