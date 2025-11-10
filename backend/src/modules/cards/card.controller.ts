import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/authGuard';
import { adjustCardBalance, issueCard, listUserCards, updateCardStatus } from './card.service';

export const issueCardHandler = async (req: Request, res: Response): Promise<void> => {
  const card = await issueCard(req.body);
  res.status(201).json({ success: true, data: card });
};

export const listCardsHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const cards = await listUserCards(req.user!.id);
  res.json({ success: true, data: cards });
};

export const updateCardStatusHandler = async (req: Request, res: Response): Promise<void> => {
  const card = await updateCardStatus(req.params.cardId, req.body.status);
  res.json({ success: true, data: card });
};

export const adjustCardBalanceHandler = async (req: Request, res: Response): Promise<void> => {
  const card = await adjustCardBalance(req.params.cardId, req.body.amount);
  res.json({ success: true, data: card });
};
