import { Request, Response } from 'express';
import { getAdminDashboardSummary } from './admin.service';

export const getAdminDashboardHandler = async (_req: Request, res: Response): Promise<void> => {
  const summary = await getAdminDashboardSummary();
  res.json({ success: true, data: summary });
};
