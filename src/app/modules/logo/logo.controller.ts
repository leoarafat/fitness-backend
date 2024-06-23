import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { LogoService } from './logo.service';

const addLogo = catchAsync(async (req: Request, res: Response) => {
  const result = await LogoService.addLogo(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Create successful',
    data: result,
  });
});
const getLogo = catchAsync(async (req: Request, res: Response) => {
  const result = await LogoService.getLogo();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieved successful',
    data: result,
  });
});
const updateLogo = catchAsync(async (req: Request, res: Response) => {
  const result = await LogoService.updateLogo(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update successful',
    data: result,
  });
});
const deleteLogo = catchAsync(async (req: Request, res: Response) => {
  const result = await LogoService.deleteLogo(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete successful',
    data: result,
  });
});

export const LogoController = {
  addLogo,
  getLogo,
  updateLogo,
  deleteLogo,
};
