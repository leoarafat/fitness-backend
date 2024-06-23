import { Types } from 'mongoose';

export type ISubscriptionPlan = {
  title: string;
  items: [];
  price: number;
  status: boolean;
  plan_type: 'basic' | 'standard' | 'premium';
  duration: number;
};
export type ISubscriptionPlanItem = {
  subscriptions_id: Types.ObjectId | ISubscriptionPlan;
  title: string;
  status: boolean;
};
