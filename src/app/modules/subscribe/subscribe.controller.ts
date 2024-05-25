import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { SubscribeService } from './subscribe.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SubscribeService.insertIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscribe created successfully !',
    data: result,
  });
});
const getSubscribeData = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscribeService.getSubscribeData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscribe retrieved successfully !',
    data: result,
  });
});

export const SubscribeController = {
  insertIntoDB,
  getSubscribeData,
};
