import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { SubscriptionService } from './subscriptions.service';
import sendResponse from '../../../shared/sendResponse';

const upgradeSubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionService.upgradeSubscription(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Plan upgrade successful',
    data: result,
  });
});
const AllSubscriber = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionService.AllSubscriber(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Plan retrieved successful',
    data: result,
  });
});
// const AllSubscriber = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, ['searchTerm']);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await SubscriptionService.AllSubscriber(
//     filters,
//     paginationOptions,
//   );
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Data Retrieved Successful',
//     data: result.data,
//     meta: result.meta,
//   });
// });
const mySubscription = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionService.mySubscription(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My Plan retrieved successful',
    data: result,
  });
});

export const SubscriptionController = {
  upgradeSubscription,
  AllSubscriber,
  mySubscription,
};
