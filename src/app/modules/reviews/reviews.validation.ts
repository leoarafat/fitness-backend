import { z } from 'zod';

const post = z.object({
  body: z.object({
    description: z.string({ required_error: 'Description is required' }),
    ratting: z.number({ required_error: 'ratting is required' }),
  }),
});
export const ReviewValidation = { post };
