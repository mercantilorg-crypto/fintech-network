import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { AuthenticatedRequest } from '../../middleware/authGuard';
import { ITransaction } from './transaction.model';
import { createTransaction, listTransactions } from './transaction.service';

export const createTransactionHandler = async (req: Request, res: Response): Promise<void> => {
  const transaction = await createTransaction(req.body);
  res.status(201).json({ success: true, data: transaction });
};

export const listTransactionsHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { cardId, limit } = req.query;
  const filter: FilterQuery<ITransaction> = {};

  if (typeof cardId === 'string') {
    filter.$or = [{ fromCardId: cardId }, { toCardId: cardId }];
  }

  const parsedLimit = typeof limit === 'string' ? Number(limit) : undefined;

  const transactions = await listTransactions(filter, parsedLimit);
  res.json({ success: true, data: transactions });
};
