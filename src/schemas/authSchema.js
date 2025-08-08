import { z } from 'zod';

const registerSchema = z.object({
    email: z
        .string({ required_error: 'Email is a required field' })
        .email('Invalid email format')
        .meta({ example: 'jane.doe@example.com' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
        .max(50, 'Password must be at most 50 characters long')
        .meta({ example: 'password123' }),
    name: z
        .string({ required_error: 'Name is a required field' })
        .meta({ example: 'Jane Doe' }),
});

const loginSchema = z.object({
  email: z
      .string({ required_error: 'Email is a required field' })
        .email('Invalid email format')
        .meta({ example: 'jane.doe@example.com' }),
    password: z.string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
        .max(50, 'Password must be at most 50 characters long')
        .meta({ example: 'password123' }),
});

export {
    registerSchema,
    loginSchema,
};