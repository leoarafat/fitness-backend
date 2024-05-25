import { z } from 'zod';

const post = z.object({
  body: z.object({
    planId: z.string({ required_error: 'planId is required' }),
    transactionId: z.string({ required_error: 'transactionId is required' }),
    payment_id: z.string({ required_error: 'payment_id is required' }),
  }),
});

export const SubscriptionValidation = { post };
