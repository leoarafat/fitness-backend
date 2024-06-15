/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SubscriptionPlan } from '../subscriptions-plan/subscriptions-plan.model';
import ApiError from '../../../errors/ApiError';
import { Subscription } from './subscriptions.model';

import { IReqUser } from '../user/user.interface';
import User from '../user/user.model';

import QueryBuilder from '../../../builder/QueryBuilder';

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
    plan_id: planId,
    plan_type: subscriptionPlan?.plan_type,
    user_id: req?.user?.userId,
    payment_status: payment_status,
    amount,
    startDate,
    endDate,
    transactionId: transactionId,
  });
  await checkUser.save();
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
  const planTypes = subscriptions?.map(sub => sub?.plan_type);
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
