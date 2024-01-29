import { z } from 'zod';

export const userSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    patronymic: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
  })
  .required();

export type UserDto = z.infer<typeof userSchema>;
