import { Router } from 'express';
import { authGuard } from '../../middleware/authGuard';
import { getAdminDashboardHandler } from './admin.controller';

const router = Router();

router.get('/dashboard', authGuard(['admin']), getAdminDashboardHandler);

export const adminRoutes = router;
