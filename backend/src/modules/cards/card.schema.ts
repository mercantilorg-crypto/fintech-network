import { z } from 'zod';

export const issueCardSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(['virtual', 'physical']),
  currency: z.string().optional(),
  initialBalance: z.number().min(0).optional()
});

export const updateCardStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'blocked', 'cancelled'])
});

export const adjustBalanceSchema = z.object({
  amount: z.number().nonnegative()
});
