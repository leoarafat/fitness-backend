import { z } from 'zod';

const post = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
  }),
});

export const SubscribeValidation = { post };
