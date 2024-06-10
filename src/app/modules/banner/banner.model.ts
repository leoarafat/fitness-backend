import { Schema, model } from 'mongoose';

const bannerSchema = new Schema(
  {
    video: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Banner = model('Banner', bannerSchema);
