import { Types } from 'mongoose';
import { IProgram } from '../program/program.interface';
import { ISeries } from '../series/series.interface';

export type IClass = {
  program: Types.ObjectId | IProgram;
  series: Types.ObjectId | ISeries;
  title: string;
  topic: string;
  date: Date;
  description: string;
  video: string;
  videoDuration: string;
  pdfFile: string;
  docFile: string;
  isRead: boolean;
  accessType: 'basic' | 'standard' | 'premium';
};
