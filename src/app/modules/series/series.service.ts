/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IGenericResponse } from '../../../interfaces/paginations';
import QueryBuilder from '../../../builder/QueryBuilder';
import { ISeries } from './series.interface';
import { Series } from './series.model';
import { Request } from 'express';
import { Classes } from '../class/class.model';

//*
const addSeries = async (req: Request) => {
  const payload = req.body;
  // const { files } = req;
  // //@ts-ignore
  // if (!files?.video) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Video is required');
  // }
  // //@ts-ignore
  // // const video = files?.video[0].path;
  // const video = `/videos/${files?.video[0].filename}`;

  if (!payload.title || !payload.name) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title, name is required');
  }
  // if (!video) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Video is required');
  // }
  // payload.video = video;
  return (await Series.create(payload)).populate('program');
};

//*
const getAllSeries = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<ISeries[]>> => {
  const userQuery = new QueryBuilder(Series.find().populate('program'), query)
    .search(['title', 'name'])
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

//*
const singleSeries = async (id: string, query: Record<string, unknown>) => {
  const series = await Series.findById(id);
  const classQuery = new QueryBuilder(Classes.find({ series: id }), query)
    .search(['topic', 'title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await classQuery.modelQuery;
  const meta = await classQuery.countTotal();
  const finalResult = {
    seriesData: series,
    classData: result,
  };
  return {
    meta,
    data: finalResult,
  };
};
// const singleSeries = async (id: string) => {
//   const series = await Series.findById(id).populate('program');
//   if (!series) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'series not found');
//   }
//   return series;
// };

//*
const deleteSeries = async (id: string) => {
  const series = await Series.findById(id);
  if (!series) {
    throw new ApiError(httpStatus.NOT_FOUND, 'series not found');
  }
  return await Series.findByIdAndDelete(id);
};

//*
const updateSeries = async (req: Request) => {
  const { id } = req.params;
  const series = await Series.findById(id);
  if (!series) {
    throw new ApiError(httpStatus.NOT_FOUND, 'series not found');
  }

  const { ...seriesData } = req.body;

  // //@ts-ignore
  // const video = req.files?.video;

  // if (video) {
  //   // seriesData.video = video[0].path;
  //   seriesData.video = `/videos/${video[0].filename}`;
  // }

  const result = await Series.findByIdAndUpdate(id, seriesData, {
    new: true,
    runValidators: true,
  }).populate('program');
  return result;
};
export const seriesService = {
  addSeries,
  getAllSeries,
  singleSeries,
  deleteSeries,
  updateSeries,
};
