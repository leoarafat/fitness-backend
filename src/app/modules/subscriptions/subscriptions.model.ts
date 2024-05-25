import { Schema, model } from 'mongoose';
import { ISubscription } from './subscriptions.interface';

const subscriptionSchema = new Schema<ISubscription>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan_id: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
    payment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
      enum: ['paid', 'unpaid', 'trail'],
      default: 'unpaid',
    },
    plan_type: {
      type: String,
      enum: ['free', 'basic', 'gold', 'premium'],
      default: 'free',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    trasactionId: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export const Subscription = model('Subscription', subscriptionSchema);
