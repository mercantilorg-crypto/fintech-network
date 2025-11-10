import { z } from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum(['p2p', 'load', 'withdrawal', 'purchase']),
  fromCardId: z.string().optional(),
  toCardId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().optional(),
  metadata: z.record(z.any()).optional()
});
