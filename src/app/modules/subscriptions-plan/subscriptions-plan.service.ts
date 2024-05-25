/* eslint-disable @typescript-eslint/ban-ts-comment */
import ApiError from '../../../errors/ApiError';

import {
  ISubscriptionPlan,
  ISubscriptionPlanItem,
} from './subscriptions-plan.interface';
// import stripePackage from 'stripe';
import { SubscriptionPlan } from './subscriptions-plan.model';
// const stripe = new stripePackage('your_stripe_secret_key');

//* Admin Management Start
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
    console.error(error);
    //@ts-ignore
    throw new Error(error?.message);
  }
};
const updateSubscriptionsItem = async (id: string, payload: any) => {
  try {
    const subs = await SubscriptionPlan.findOne({ 'items._id': id });

    if (!subs) {
      throw new ApiError(404, 'Item not found');
    }

    const result = await SubscriptionPlan.findOneAndUpdate(
      { 'items._id': id },
      { $set: { 'items.$.title': payload.title } },
      { new: true },
    );
    return result;
  } catch (error) {
    console.error(error);
    //@ts-ignore
    throw new Error(error?.message);
  }
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
    console.error(error);
  }
};
const deleteSubscriptions = async (id: string) => {
  const check = await SubscriptionPlan.findById(id);
  if (!check) {
    throw new ApiError(404, 'SubscriptionPlan not found');
  }
  return await SubscriptionPlan.findByIdAndDelete(id);
};
//* Admin Management End

//* Buy Subscription Plan for user
// const upgradeSubscriptionPlan = async (
//   user: IReqUser,
//   payload: { planId: string },
// ) => {
//   const findUser = await User.findById(user?.userId);
//   if (!findUser) {
//     throw new ApiError(404, 'User not found');
//   }

//   const findPlan = await SubscriptionPlan.findById(payload.planId);
//   if (!findPlan) {
//     throw new ApiError(404, 'Subscriptions plan not found');
//   }
//   const stripeSubscription = await stripe.subscriptions.create({
//     customer: findUser._id,
//     items: [{ plan: findPlan._id.toString() }],
//     payment_behavior: 'default_incomplete',
//     expand: ['latest_invoice.payment_intent'],
//   });

//   // Handle payment status from Stripe
//   if (stripeSubscription.status === 'active') {
//     findUser.subscriptionPlan = findPlan.plan_type;
//     await findUser.save();

//     return {
//       message: 'Subscription purchased successfully',
//     };
//   } else {
//     return {
//       message: 'Failed to purchase subscription',
//     };
//   }
// };
//*

export const SubscriptionsPlanService = {
  addSubscription,
  addSubscriptionByTitle,
  deleteSubscriptionsTitle,
  getSubscriptions,
  deleteSubscriptions,
  updateSubscriptionsTitle,
  updateSubscriptionsItem,
};
