/* eslint-disable @typescript-eslint/ban-ts-comment */
import ApiError from '../../../errors/ApiError';
import { logger } from '../../../shared/logger';

import {
  ISubscriptionPlan,
  ISubscriptionPlanItem,
} from './subscriptions-plan.interface';
import { SubscriptionPlan } from './subscriptions-plan.model';
const addSubscription = async (payload: ISubscriptionPlan) => {
  const checkIsExist = await SubscriptionPlan.findOne({ title: payload.title });
  if (checkIsExist) {
    throw new ApiError(404, 'Subscription already exist');
  }
  const result = await SubscriptionPlan.create(payload);
  return result;
};

const addSubscriptionByTitle = async (payload: ISubscriptionPlanItem) => {
  const subscription = await SubscriptionPlan.findOne({
    _id: payload.subscriptions_id,
  });
  if (!subscription) {
    throw new ApiError(404, 'Subscriptions Not Found');
  }

  //@ts-ignore
  subscription.items.push({ title: payload.title });
  await subscription.save();
  return subscription;
};

const getSubscriptions = async () => {
  //   console.log(id);
  const result = await SubscriptionPlan.find({});
  return result;
};

const updateSubscriptionsTitle = async (id: string, payload: any) => {
  try {
    const subs = await SubscriptionPlan.findOne({ _id: id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    const result = await SubscriptionPlan.findOneAndUpdate(
      { _id: id },
      { ...payload },
      { new: true, runValidators: true },
    );
    return result;
  } catch (error) {
    logger.error(error);
    //@ts-ignore
    throw new Error(error?.message);
  }
};

const updateSubscriptionsItem = async (id: string, payload: any) => {
  const { SubscriptionData } = payload;
  const isExistSubscriptionPlan = await SubscriptionPlan.findById(id);

  if (!isExistSubscriptionPlan) {
    throw new ApiError(404, 'Subscription not found');
  }

  isExistSubscriptionPlan.title = SubscriptionData.title;
  isExistSubscriptionPlan.price = SubscriptionData.price;

  const updatedItems = SubscriptionData.items.map((item: any) => ({
    title: item.title,
    _id: item._id || undefined,
  }));

  isExistSubscriptionPlan.items = updatedItems;

  await isExistSubscriptionPlan.save();

  return isExistSubscriptionPlan;
};

const deleteSubscriptionsTitle = async (id: string) => {
  try {
    const subs = await SubscriptionPlan.findOne({ 'subscriptions_id._id': id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    await SubscriptionPlan.updateOne(
      { _id: subs._id },
      { $pull: { items: { _id: id } } },
    );
  } catch (error) {
    logger.error(error);
  }
};
const deleteSubscriptions = async (id: string) => {
  const check = await SubscriptionPlan.findById(id);
  if (!check) {
    throw new ApiError(404, 'SubscriptionPlan not found');
  }
  return await SubscriptionPlan.findByIdAndDelete(id);
};

export const SubscriptionsPlanService = {
  addSubscription,
  addSubscriptionByTitle,
  deleteSubscriptionsTitle,
  getSubscriptions,
  deleteSubscriptions,
  updateSubscriptionsTitle,
  updateSubscriptionsItem,
};
