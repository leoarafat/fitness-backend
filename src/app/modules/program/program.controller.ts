import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';

import sendResponse from '../../../shared/sendResponse';
import { programService } from './program.service';
import { IReqUser } from '../user/user.interface';

const createProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await programService.addProgram(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Program add successful',
    data: result,
  });
});
const allPrograms = catchAsync(async (req: Request, res: Response) => {
  const result = await programService.getAllProgram(
    req.query,
    req.user as IReqUser,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Program retrieved successful',
    data: result,
  });
});
const singleProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await programService.singleProgram(req.params.id, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Program retrieved successful',
    data: result.data,
    meta: result.meta as any,
  });
});
const deleteProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await programService.deleteProgram(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Program delete successful',
    data: result,
  });
});
const updateProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await programService.updateProgram(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Program update successful',
    data: result,
  });
});
export const ProgramController = {
  createProgram,
  allPrograms,
  singleProgram,
  deleteProgram,
  updateProgram,
};
