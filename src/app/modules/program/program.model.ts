import { Schema, model } from 'mongoose';
import { IProgram } from './program.interface';

const programSchema = new Schema<IProgram>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    accessType: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
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
export const Program = model('Program', programSchema);
