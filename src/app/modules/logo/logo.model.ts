import { Schema, model } from 'mongoose';

const logoSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Logo = model('Logo', logoSchema);
