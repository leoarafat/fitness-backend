/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProgram } from './program.interface';
import { Program } from './program.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Series } from '../series/series.model';
import { Classes } from '../class/class.model';
import { Request } from 'express';

const addProgram = async (req: Request) => {
  const payload = req.body;
  const { files } = req;
  //@ts-ignore
  if (!files?.image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'image is required');
  }
  //@ts-ignore
  const image = files?.image[0].path;

  if (!payload.title) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title is required');
  }
  if (!image) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'image is required');
  }
  payload.image = image;
  return await Series.create(payload);
};

const getAllProgram = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IProgram[]>> => {
  const userQuery = new QueryBuilder(Program.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    data: result,
  };
};
const singleProgram = async (id: string) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }

  const series = await Series.find({ program: id });
  const classes = await Classes.find({ program: id });
  return {
    program,
    series,
    classes,
  };
};
const deleteProgram = async (id: string) => {
  const program = await Program.findById(id);
  if (!program) {
    throw new ApiError(httpStatus.NOT_FOUND, 'program not found');
  }
  const result = await Program.findByIdAndDelete(id);
  return result;
};
const updateProgram = async (req: Request) => {
  const { id } = req.params;
  const programs = await Program.findById(id);
  if (!programs) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Program not found');
  }

  const { ...programData } = req.body;

  //@ts-ignore
  const image = req.files?.image;

  if (image) {
    programData.image = image[0].path;
  }

  const updateClass = await Program.findByIdAndUpdate(id, programData, {
    new: true,
    runValidators: true,
  });
  return updateClass;
};
export const programService = {
  addProgram,
  getAllProgram,
  singleProgram,
  deleteProgram,
  updateProgram,
};
