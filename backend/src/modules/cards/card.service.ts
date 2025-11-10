import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { Types } from 'mongoose';
import { AppError } from '../../utils/appError';
import { CardModel, ICard } from './card.model';

export interface IssueCardInput {
  userId: string;
  type: 'virtual' | 'physical';
  currency?: string;
  initialBalance?: number;
}

const generateCardId = (): string => `CARD-${randomUUID()}`;
const generateLast4 = (): string => Math.floor(1000 + Math.random() * 9000).toString();

export const issueCard = async (payload: IssueCardInput): Promise<ICard> => {
  const card = new CardModel({
    userId: new Types.ObjectId(payload.userId),
    cardId: generateCardId(),
    type: payload.type,
    status: 'active',
    currency: payload.currency ?? 'USD',
    balance: payload.initialBalance ?? 0,
    last4: generateLast4()
  });

  return card.save();
};

export const listUserCards = async (userId: string): Promise<ICard[]> => {
  return CardModel.find({ userId }).sort({ createdAt: -1 });
};

export const updateCardStatus = async (cardId: string, status: ICard['status']): Promise<ICard> => {
  const card = await CardModel.findOneAndUpdate({ cardId }, { status }, { new: true });
  if (!card) {
    throw AppError.notFound('Card not found');
  }
  return card;
};

export const adjustCardBalance = async (cardId: string, amount: number): Promise<ICard> => {
  const card = await CardModel.findOne({ cardId });
  if (!card) {
    throw AppError.notFound('Card not found');
  }

  const newBalance = card.balance + amount;
  if (newBalance < 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficient funds');
  }

  card.balance = newBalance;
  await card.save();
  return card;
};
