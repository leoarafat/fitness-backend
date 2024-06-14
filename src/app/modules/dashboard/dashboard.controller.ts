import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { DashboardService } from './dashboard.service';
import sendResponse from '../../../shared/sendResponse';

const totalCount = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.totalCount();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved successful',
    data: result,
  });
});
const totalIncomes = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.totalIncomes();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved successful',
    data: result,
  });
});
const getMonthlySubscriptionGrowth = catchAsync(
  async (req: Request, res: Response) => {
    const year = req.query.year
      ? parseInt(req.query.year as string, 10)
      : undefined;
    const result = await DashboardService.getMonthlySubscriptionGrowth(year);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Data retrieved successful',
      data: result,
    });
  },
);
const getMonthlyUserGrowth = catchAsync(async (req: Request, res: Response) => {
  const year = req.query.year
    ? parseInt(req.query.year as string, 10)
    : undefined;
  const result = await DashboardService.getMonthlyUserGrowth(year);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved successful',
    data: result,
  });
});
// const incomeGrowth = catchAsync(async (req: Request, res: Response) => {
//   const result = await DashboardService.incomeGrowth();
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Data retrieved successful',
//     data: result,
//   });
// });
const incomeGrowth = catchAsync(async (req: Request, res: Response) => {
  const { year } = req.query; // Retrieve year from query parameters
  const result = await DashboardService.incomeGrowth(Number(year)); // Pass year to service function
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const subscriptionUserDetails = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardService.subscriptionUserDetails();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Data retrieved successful',
      data: result,
    });
  },
);
const ecommerceUserDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.ecommerceUserDetails();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved successful',
    data: result,
  });
});

export const DashboardController = {
  totalCount,
  getMonthlySubscriptionGrowth,
  getMonthlyUserGrowth,
  totalIncomes,
  incomeGrowth,
  subscriptionUserDetails,
  ecommerceUserDetails,
};
