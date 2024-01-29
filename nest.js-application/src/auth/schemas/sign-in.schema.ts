import { z } from 'zod';

export const phoneNumberSchema = z.string();
export const passwordSchema = z.string();

export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
export type Password = z.infer<typeof passwordSchema>;
