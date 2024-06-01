import { Schema } from 'mongoose';

type SubscriptionStatus = 'paid' | 'unpaid' | 'trail';
type SubscriptionPlan = 'free' | 'basic' | 'gold' | 'premium';
type SubscriptionState = 'active' | 'inactive';

export type ISubscription = {
  user_id: Schema.Types.ObjectId;
  plan_id: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  payment_status: SubscriptionStatus;
  plan_type: SubscriptionPlan;
  status: SubscriptionState;
  trasactionId?: string;
  amount: number;
};
