import { Schema, model } from 'mongoose';

const bannerSchema = new Schema(
  {
    video: {
      type: String,
    },
    title: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Banner = model('Banner', bannerSchema);
