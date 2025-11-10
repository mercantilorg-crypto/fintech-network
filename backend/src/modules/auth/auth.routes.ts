import { Router } from 'express';
import { validateBody } from '../../middleware/validation';
import { loginSchema, registerSchema } from './auth.schema';
import { loginHandler, registerHandler } from './auth.controller';

const router = Router();

router.post('/register', validateBody(registerSchema), registerHandler);
router.post('/login', validateBody(loginSchema), loginHandler);

export const authRoutes = router;
