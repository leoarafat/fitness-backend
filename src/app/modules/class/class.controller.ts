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
const allClasses = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.allClasses(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Class retrieved successful',
    data: result,
  });
});
const singleClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.singleClass(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Class retrieved successful',
    data: result,
  });
});
const deleteClass = catchAsync(async (req: Request, res: Response) => {
  const result = await ClassService.deleteClass(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Class delete successful',
    data: result,
  });
});
export const ClassController = {
  createClass,
  allClasses,
  singleClass,
  deleteClass,
};
