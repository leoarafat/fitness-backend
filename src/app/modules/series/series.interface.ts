import { Types } from 'mongoose';
import { IProgram } from '../program/program.interface';

export type ISeries = {
  title: string;
  name: string;
  video: string;
  program: Types.ObjectId | IProgram;
};
