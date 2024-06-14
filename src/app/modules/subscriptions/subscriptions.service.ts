/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SubscriptionPlan } from '../subscriptions-plan/subscriptions-plan.model';
import ApiError from '../../../errors/ApiError';
import { Subscription } from './subscriptions.model';
import QueryBuilder from '../../../builder/QueryBuilder';
import { IReqUser } from '../user/user.interface';
import User from '../user/user.model';

const upgradeSubscription = async (req: Request) => {
  try {
    const { planId, transactionId, payment_status, amount } = req.body;
    const subscriptionPlan = await SubscriptionPlan.findById(planId);
    if (!subscriptionPlan) {
      throw new ApiError(404, 'Plan not found');
    }

    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + subscriptionPlan.duration * 24 * 60 * 60 * 1000,
    );

    const subscription = await Subscription.create({
      plan_id: planId,
      user_id: req?.user?.userId,
      payment_status: payment_status,
      amount,
      startDate,
      endDate,
      transactionId: transactionId,
    });

    return subscription;
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
    //@ts-ignore
    throw new Error(error?.message);
  }
};
const AllSubscriber = async (query: Record<string, unknown>) => {
  const orderQuery = (
    await new QueryBuilder(Subscription.find().populate('user_id'), query)
      .search(['startDate'])
      .filter()
  )
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    data: result,
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
