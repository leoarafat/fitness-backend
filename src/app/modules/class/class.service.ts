/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Classes } from './class.model';
import { IGenericResponse } from '../../../interfaces/paginations';
import { IClass } from './class.interface';
import QueryBuilder from '../../../builder/QueryBuilder';

const createClass = async (req: Request) => {
  const { ...classData } = req.body;
  const { files } = req;
  let pdfFile = undefined;
  //@ts-ignore
  if (files?.pdf) {
    //@ts-ignore
    pdfFile = files?.pdf[0].path;
  }
  let docFile = undefined;
  //@ts-ignore
  if (files?.docs) {
    //@ts-ignore
    docFile = files?.docs[0].path;
  }
  let video = undefined;
  //@ts-ignore
  if (files?.video) {
    //@ts-ignore
    video = files?.docs[0].path;
  }

  if (!pdfFile || !docFile || !video) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'All file is required');
  }
  const result = await Classes.create({
    ...classData,
    pdfFile,
    docFile,
    video,
  });
  return result;
};

const allClasses = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<IClass[]>> => {
  const userQuery = new QueryBuilder(Classes.find(), query)
    .search(['topic', 'title'])
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
const singleClass = async (id: string) => {
  const result = await Classes.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  return result;
};
const deleteClass = async (id: string) => {
  const classes = await Classes.findById(id);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  const result = await Classes.findByIdAndDelete(id);
  return result;
};
const updateClass = async (req: Request) => {
  const { id } = req.params;
  const classes = await Classes.findById(id);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }

  const { ...classData } = req.body;

  //@ts-ignore
  const video = req.files?.video;
  //@ts-ignore
  const pdf = req.files?.pdf;
  //@ts-ignore
  const docs = req.files?.docs;

  if (video) {
    classData.video = video[0].path;
  }
  if (pdf) {
    classData.pdfFile = pdf[0].path;
  }
  if (docs) {
    classData.docFile = docs[0].path;
  }

  const updateClass = await Classes.findByIdAndUpdate(id, classData, {
    new: true,
    runValidators: true,
  });
  return updateClass;
};
export const ClassService = {
  createClass,
  allClasses,
  singleClass,
  deleteClass,
  updateClass,
};
