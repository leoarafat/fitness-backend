import { Schema, model } from 'mongoose';
import { IClass } from './class.interface';

const classSchema = new Schema<IClass>(
  {
    program: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
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
    pdfFile: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /\.pdf$/.test(v);
        },
        message: props => `${props.value} is not a valid PDF file!`,
      },
    },
    docFile: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return /\.(doc|docx)$/.test(v);
        },
        message: props => `${props.value} is not a valid DOC file!`,
      },
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
