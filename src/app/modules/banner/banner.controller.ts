import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { BannerService } from './banner.service';
import sendResponse from '../../../shared/sendResponse';

const addBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.addBanner(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create successful',
    data: result,
  });
});
const getBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getBanner();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved successful',
    data: result,
  });
});
const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.updateBanner(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update successful',
    data: result,
  });
});
const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.deleteBanner(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete successful',
    data: result,
  });
});

export const BannerController = {
  addBanner,
  getBanner,
  updateBanner,
  deleteBanner,
};
