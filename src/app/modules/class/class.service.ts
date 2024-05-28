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
    // pdfFile = files?.pdf[0].path;
    pdfFile = `/documents/${files.pdf[0].filename}`;
  }
  let docFile = undefined;
  //@ts-ignore
  if (files?.docs) {
    //@ts-ignore
    docFile = `/documents/${files.docs[0].filename}`;
  }
  let video = undefined;
  //@ts-ignore
  if (files?.video) {
    //@ts-ignore
    video = `/videos/${files.video[0].filename}`;
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
  const classQuery = new QueryBuilder(Classes.find(), query)
    .search(['topic', 'title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await classQuery.modelQuery;
  const meta = await classQuery.countTotal();

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
  await Classes.findByIdAndUpdate(
    id,
    { isRead: true },
    {
      new: true,
    },
  );
  return result;
};
const getClassBySeries = async (id: string, query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Classes.find({ series: id }), query)
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
    // classData.video = video[0].path;
    classData.video = `/videos/${video[0].filename}`;
  }
  if (pdf) {
    classData.pdfFile = `/documents/${pdf[0].filename}`;
  }
  if (docs) {
    classData.docFile = `/documents/${docs[0].filename}`;
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
  getClassBySeries,
};
