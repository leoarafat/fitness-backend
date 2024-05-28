import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';

import sendResponse from '../../../shared/sendResponse';
import { seriesService } from './series.service';

const createSeries = catchAsync(async (req: Request, res: Response) => {
  const result = await seriesService.addSeries(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Series add successful',
    data: result,
  });
});
const allSeries = catchAsync(async (req: Request, res: Response) => {
  const result = await seriesService.getAllSeries(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Series retrieved successful',
    data: result,
  });
});
const singleSeries = catchAsync(async (req: Request, res: Response) => {
  const result = await seriesService.singleSeries(req.params.id, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Series and class retrieved successful',
    data: result.data,
    meta: result.meta,
  });
});
const deleteSeries = catchAsync(async (req: Request, res: Response) => {
  const result = await seriesService.deleteSeries(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Series deleted successful',
    data: result,
  });
});
const updateSeries = catchAsync(async (req: Request, res: Response) => {
  const result = await seriesService.updateSeries(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Series update successful',
    data: result,
  });
});

export const SeriesController = {
  createSeries,
  allSeries,
  singleSeries,
  deleteSeries,
  updateSeries,
};
