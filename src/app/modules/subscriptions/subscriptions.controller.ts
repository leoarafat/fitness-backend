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

export const SubscriptionController = {
  upgradeSubscription,
};
