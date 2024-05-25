import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ManageService } from './manage.service';
import sendResponse from '../../../shared/sendResponse';

const addAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.addAboutUs(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const addPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.addPrivacyPolicy(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const addTermsConditions = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.addTermsConditions(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const addContactUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.addContactUs(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.getPrivacyPolicy();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.getAboutUs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getTermsConditions = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.getTermsConditions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const getContactUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.getContactUs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const editPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.editPrivacyPolicy(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const editAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.editAboutUs(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const editTermsConditions = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.editTermsConditions(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const editContactUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.editContactUs(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const deleteAboutUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.deleteAboutUs(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const deleteContactUs = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.deleteContactUs(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const deletePrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await ManageService.deletePrivacyPolicy(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const deleteTermsConditions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ManageService.deleteTermsConditions(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successful',
      data: result,
    });
  },
);

export const ManageController = {
  addPrivacyPolicy,
  addAboutUs,
  addTermsConditions,
  addContactUs,
  getPrivacyPolicy,
  getAboutUs,
  getTermsConditions,
  getContactUs,
  editPrivacyPolicy,
  editAboutUs,
  editTermsConditions,
  editContactUs,
  deleteAboutUs,
  deleteContactUs,
  deletePrivacyPolicy,
  deleteTermsConditions,
};
