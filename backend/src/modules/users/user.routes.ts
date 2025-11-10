import { Router } from 'express';
import { authGuard } from '../../middleware/authGuard';
import { getCurrentUser } from './user.controller';

const router = Router();

router.get('/me', authGuard(), getCurrentUser);

export const userRoutes = router;
