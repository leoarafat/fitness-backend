import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { SubscriptionsPlanService } from './subscriptions-plan.service';

//* Admin STart
const adSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionsPlanService.addSubscription(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'adSubscriptions successfully',
    data: result,
  });
});
const adSubscriptionsItem = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionsPlanService.addSubscriptionByTitle(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriptions item add successfully',
    data: result,
  });
});
const getSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionsPlanService.getSubscriptions();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriptions Retrieved successfully',
    data: result,
  });
});
const deleteSubscriptionsTitle = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionsPlanService.deleteSubscriptionsTitle(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Subscriptions item delete successfully',
      data: result,
    });
  },
);
const updateSubscriptionsTitle = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionsPlanService.updateSubscriptionsTitle(
      req.params.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Subscriptions Update successfully',
      data: result,
    });
  },
);
const updateSubscriptionsItem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionsPlanService.updateSubscriptionsItem(
      req.params.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Subscriptions item Update successfully',
      data: result,
    });
  },
);
const deleteSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionsPlanService.deleteSubscriptions(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscriptions delete successfully',
    data: result,
  });
});
//* Admin End

//* User Start
// const upgradeSubscriptionPlan = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await SubscriptionsPlanService.upgradeSubscriptionPlan(
//       req.user as IReqUser,
//       req.body,
//     );
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'Subscriptions upgrade successfully',
//       data: result,
//     });
//   },
// );
//* User End

export const SubscriptionsPlanController = {
  adSubscriptions,
  adSubscriptionsItem,
  getSubscriptions,
  deleteSubscriptionsTitle,
  deleteSubscriptions,
  updateSubscriptionsTitle,
  updateSubscriptionsItem,
};
