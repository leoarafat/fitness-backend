import { Types } from 'mongoose';
import { IProgram } from '../program/program.interface';

export type IClass = {
  program: Types.ObjectId | IProgram;
  title: string;
  topic: string;
  date: Date;
  description: string;
  video: string;
  pdfFile: string;
  docFile: string;
};
