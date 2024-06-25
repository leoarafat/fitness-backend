/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SubscriptionPlan } from '../subscriptions-plan/subscriptions-plan.model';
import ApiError from '../../../errors/ApiError';
import { Subscription } from './subscriptions.model';

import { IReqUser } from '../user/user.interface';
import User from '../user/user.model';

import QueryBuilder from '../../../builder/QueryBuilder';
import Notification from '../notifications/notifications.model';

const upgradeSubscription = async (req: Request) => {
  const { planId, transactionId, payment_status, amount } = req.body;

  const checkUser = await User.findById(req?.user?.userId);

  if (!checkUser) {
    throw new ApiError(404, 'User not found');
  }
  const subscriptionPlan = await SubscriptionPlan.findById(planId);

  if (!subscriptionPlan) {
    throw new ApiError(404, 'Plan not found');
  }
  checkUser.isSubscribed = true;
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + subscriptionPlan.duration * 24 * 60 * 60 * 1000,
  );

  const subscription = await Subscription.create({
    amount,
    startDate,
    endDate,
    plan_id: planId,
    plan_type: subscriptionPlan?.plan_type,
    user_id: req?.user?.userId,
    payment_status: payment_status,
    status: 'active',
    transactionId: transactionId,
  });
  await checkUser.save();
  const notification = await Notification.create({
    user: checkUser?._id,
    title: 'Unlock New Subscription Plan',
    message: `Unlock New Plan From ${checkUser?.name} on ${subscriptionPlan?.plan_type} Subscription.`,
  });
  //@ts-ignore
  global.io.to(checkUser?._id.toString()).emit('notification', notification);
  return subscription;
};
const AllSubscriber = async (query: Record<string, unknown>) => {
  const subscriptionsQuery = (
    await new QueryBuilder(Subscription.find().populate('user_id'), query)
      .search(['plan_type'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await subscriptionsQuery.modelQuery;
  const meta = await subscriptionsQuery.countTotal();
  const subscriptions = await Subscription.find({});
  const planTypes = [...new Set(subscriptions?.map(sub => sub?.plan_type))];
  return {
    meta,
    data: result,
    planTypes,
  };
};

const mySubscription = async (req: Request) => {
  const { userId } = req.user as IReqUser;
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(404, 'User not found');
  }
  const subscription = await Subscription.findOne({ user_id: userId });
  if (!subscription) {
    return null;
  }
  return subscription;
};
export const SubscriptionService = {
  upgradeSubscription,
  AllSubscriber,
  mySubscription,
};
