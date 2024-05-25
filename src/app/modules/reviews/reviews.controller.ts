import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ReviewService } from './reviews.service';
import { IReqUser } from '../user/user.interface';
import sendResponse from '../../../shared/sendResponse';

const addReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.addReview(req.user as IReqUser, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review added',
    data: result,
  });
});
const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviews(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review added',
    data: result.data,
    meta: result.meta,
  });
});
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteReview(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted',
    data: result,
  });
});

export const ReviewController = {
  addReview,
  getReviews,
  deleteReview,
};
