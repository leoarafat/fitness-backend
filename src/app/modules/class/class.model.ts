import { Schema, model } from 'mongoose';
import { IClass } from './class.interface';

const classSchema = new Schema<IClass>(
  {
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    series: {
      type: Schema.Types.ObjectId,
      ref: 'Series',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    videoDuration: {
      type: String,
    },
    pdfFile: {
      type: String,
    },
    docFile: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Classes = model('Class', classSchema);
