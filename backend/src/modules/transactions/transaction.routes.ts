import { Router } from 'express';
import { authGuard } from '../../middleware/authGuard';
import { validateBody } from '../../middleware/validation';
import { createTransactionHandler, listTransactionsHandler } from './transaction.controller';
import { createTransactionSchema } from './transaction.schema';

const router = Router();

router.post('/', authGuard(), validateBody(createTransactionSchema), createTransactionHandler);
router.get('/', authGuard(), listTransactionsHandler);

export const transactionRoutes = router;
