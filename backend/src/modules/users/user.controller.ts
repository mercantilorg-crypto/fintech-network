import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/authGuard';
import { findUserById } from './user.service';

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await findUserById(req.user!.id);
  res.json({
    success: true,
    data: user
  });
};
