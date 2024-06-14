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
  const payload = req.body as ISeries;

  if (!payload.title || !payload.program) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Title, Program is required');
  }
  return (await Series.create(payload)).populate('program');
};

//*
const getAllSeries = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<ISeries[]>> => {
  const userQuery = (
    await new QueryBuilder(Series.find().populate('program'), query)
      .search(['title', 'name'])
      .filter()
  )
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
  const classQuery = (
    await new QueryBuilder(Classes.find({ series: id }), query)
      .search(['topic', 'title'])
      .filter()
  )
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
