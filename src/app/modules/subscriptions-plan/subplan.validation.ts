import { z } from 'zod';

const post = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    price: z.string({ required_error: 'price is required' }),
    duration: z.string({ required_error: 'duration is required' }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.string().optional(),
    duration: z.string().optional(),
  }),
});
export const SubscriptionPlanValidation = { post, update };
