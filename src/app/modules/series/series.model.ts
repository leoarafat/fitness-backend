import { Schema, model } from 'mongoose';
import { ISeries } from './series.interface';

const seriesSchema = new Schema<ISeries>(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    video: {
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
export const Series = model('Series', seriesSchema);
