import { Application, Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/user.routes';
import { cardRoutes } from './modules/cards/card.routes';
import { transactionRoutes } from './modules/transactions/transaction.routes';
import { adminRoutes } from './modules/admin/admin.routes';

export const registerRoutes = (app: Application): void => {
  const api = Router();

  api.use('/auth', authRoutes);
  api.use('/users', userRoutes);
  api.use('/cards', cardRoutes);
  api.use('/transactions', transactionRoutes);
  api.use('/admin', adminRoutes);

  app.use('/api', api);
};
