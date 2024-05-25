import { Schema, model } from 'mongoose';

const SubscribeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Subscribe = model('Subscribe', SubscribeSchema);

export default Subscribe;
