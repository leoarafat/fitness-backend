import { Schema, model } from 'mongoose';
import {
  ISubscriptionPlan,
  ISubscriptionPlanItem,
} from './subscriptions-plan.interface';

const subscriptionsSchema = new Schema<ISubscriptionPlan>(
  {
    title: {
      type: String,
      required: true,
    },
    items: [
      {
        title: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    plan_type: {
      type: String,
      enum: ['free', 'basic', 'gold', 'premium'],
      default: 'free',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const subscriptionItemSchema = new Schema<ISubscriptionPlanItem>(
  {
    subscriptions_id: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const SubscriptionPlan = model<ISubscriptionPlan>(
  'SubscriptionPlan',
  subscriptionsSchema,
);
export const SubscriptionsItem = model<ISubscriptionPlanItem>(
  'SubscriptionsItem',
  subscriptionItemSchema,
);
