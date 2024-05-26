import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { FeedBackService } from './feedback.service';
import sendResponse from '../../../shared/sendResponse';

const sendFeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedBackService.sendFeedBack(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Feedback send successfully',
    data: result,
  });
});
const getFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedBackService.getFeedback(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Feedback retrieved successfully',
    data: result,
  });
});

export const FeedbackController = {
  sendFeedBack,
  getFeedback,
};
