import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ClassService } from './class.service';
import sendResponse from '../../../shared/sendResponse';

const createClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.createClass(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Class add successful',
    data: result,
  });
});
export const ClassController = {
  createClass,
};
