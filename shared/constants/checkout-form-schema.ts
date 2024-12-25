import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'The name must contain at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must contain at least 2 characters' }),
  email: z.string().email({ message: 'Incorrect mail' }),
  phone: z.string().min(10, { message: 'Incorrect phone number' }),
  address: z.string().min(10, { message: 'Enter a valid address' }),
  comment: z.string().optional(),
});

export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>;
