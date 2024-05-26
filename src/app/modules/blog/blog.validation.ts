import { z } from 'zod';

const post = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1)
      .max(100),
    topic: z
      .string({
        required_error: 'topic is required',
      })
      .min(1)
      .max(100),
    description: z
      .string({
        required_error: 'description is required',
      })
      .min(1)
      .max(1000),
  }),

  files: z.object({
    image: z
      .array(
        z.object({}).refine(() => true, {
          message: 'Image is required',
        }),
      )
      .nonempty({ message: 'Image array cannot be empty' }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({}).optional(),
    topic: z.string({}).optional(),
    description: z.string({}).optional(),
  }),

  files: z.object({
    image: z.array(
      z
        .object({})
        .refine(() => true, {})
        .optional(),
    ),
  }),
});

export const BlogValidation = {
  post,
  update,
};
