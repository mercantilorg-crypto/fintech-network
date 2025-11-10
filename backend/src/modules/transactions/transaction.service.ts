import { randomUUID } from 'crypto';
import { FilterQuery } from 'mongoose';
import { adjustCardBalance } from '../cards/card.service';
import { ITransaction, TransactionModel } from './transaction.model';

export interface CreateTransactionInput {
  type: 'p2p' | 'load' | 'withdrawal' | 'purchase';
  fromCardId?: string;
  toCardId?: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, unknown>;
}

const generateReference = (): string => `TX-${randomUUID()}`;

export const createTransaction = async (input: CreateTransactionInput): Promise<ITransaction> => {
  const transaction = new TransactionModel({
    reference: generateReference(),
    type: input.type,
    fromCardId: input.fromCardId,
    toCardId: input.toCardId,
    amount: input.amount,
    currency: input.currency ?? 'USD',
    status: 'pending',
    metadata: input.metadata ?? {}
  });

  await transaction.save();

  try {
    switch (input.type) {
      case 'p2p': {
        if (!input.fromCardId || !input.toCardId) {
          throw new Error('fromCardId and toCardId are required for P2P transactions');
        }
        await adjustCardBalance(input.fromCardId, -input.amount);
        await adjustCardBalance(input.toCardId, input.amount);
        break;
      }
      case 'load': {
        if (!input.toCardId) {
          throw new Error('toCardId is required for load transactions');
        }
        await adjustCardBalance(input.toCardId, input.amount);
        break;
      }
      case 'withdrawal': {
        if (!input.fromCardId) {
          throw new Error('fromCardId is required for withdrawal transactions');
        }
        await adjustCardBalance(input.fromCardId, -input.amount);
        break;
      }
      case 'purchase': {
        if (!input.fromCardId) {
          throw new Error('fromCardId is required for purchase transactions');
        }
        await adjustCardBalance(input.fromCardId, -input.amount);
        break;
      }
      default:
        break;
    }

    transaction.status = 'completed';
    await transaction.save();
  } catch (error) {
    transaction.status = 'failed';
    transaction.metadata = { ...transaction.metadata, error: (error as Error).message };
    await transaction.save();
    throw error;
  }

  return transaction;
};

export const listTransactions = async (
  filter: FilterQuery<ITransaction>,
  limit = 20
): Promise<ITransaction[]> => {
  return TransactionModel.find(filter).sort({ createdAt: -1 }).limit(limit);
};
