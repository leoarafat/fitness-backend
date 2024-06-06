import { z } from 'zod';

const post = z.object({
  body: z.object({
    planId: z.string({ required_error: 'planId is required' }),
  }),
});

export const SubscriptionValidation = { post };
