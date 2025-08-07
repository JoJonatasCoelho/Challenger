import { z } from 'zod';

const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is a required field' })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long')
      .max(50, 'Password must be at most 50 characters long'),
    name: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is a required field' })
      .email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export {
  registerSchema,
  loginSchema,
};