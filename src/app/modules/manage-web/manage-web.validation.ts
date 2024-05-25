import { z } from 'zod';

const post = z.object({
  body: z.object({
    description: z.string({ required_error: 'Description is required' }),
  }),
});
const contactUs = z.object({
  body: z.object({
    email: z.string({ required_error: 'Description is required' }),
    phone_number: z.string({ required_error: 'phone_number is required' }),
  }),
});

export const ManageValidation = {
  post,
  contactUs,
};
