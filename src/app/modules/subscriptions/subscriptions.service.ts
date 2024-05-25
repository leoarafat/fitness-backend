/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SubscriptionPlan } from '../subscriptions-plan/subscriptions-plan.model';
import ApiError from '../../../errors/ApiError';
import { Subscription } from './subscriptions.model';
import { Payment } from '../payment/payment.model';

const upgradeSubscription = async (req: Request) => {
  try {
    const { planId, transactionId, payment_status, payment_id } = req.body;
    const subscriptionPlan = await SubscriptionPlan.findById(planId);
    if (!subscriptionPlan) {
      throw new ApiError(404, 'Plan not found');
    }
    const isPaid = await Payment.findById(payment_id);
    if (!isPaid) {
      throw new ApiError(404, 'Payment not found. Please payment first');
    }
    const startDate = new Date();
    const endDate = new Date(
      startDate.getTime() + subscriptionPlan.duration * 24 * 60 * 60 * 1000,
    );

    const subscription = await Subscription.create({
      plan_id: planId,
      user_id: req?.user?.userId,
      payment_id,
      payment_status: payment_status,
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

export const SubscriptionService = {
  upgradeSubscription,
};
