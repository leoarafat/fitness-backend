import { z } from 'zod';

const post = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({ required_error: 'Email is required' }),
    topic: z.string({ required_error: 'Topic is required' }),
  }),
});
const update = z.object({
  body: z.object({
    name: z.string({}).optional(),
    email: z.string({}).optional(),
    topic: z.string({}).optional(),
  }),
});

export const FeedbackValidation = {
  post,
  update,
};
