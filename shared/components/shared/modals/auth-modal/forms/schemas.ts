import { z } from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Password must contain at least 6 characters' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Incorrect mail' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'The name must contain at least 2 characters' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
