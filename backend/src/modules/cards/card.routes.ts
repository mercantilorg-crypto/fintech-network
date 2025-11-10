import { Router } from 'express';
import { authGuard } from '../../middleware/authGuard';
import { validateBody } from '../../middleware/validation';
import { adjustBalanceSchema, issueCardSchema, updateCardStatusSchema } from './card.schema';
import {
  adjustCardBalanceHandler,
  issueCardHandler,
  listCardsHandler,
  updateCardStatusHandler
} from './card.controller';

const router = Router();

router.post('/', authGuard(['admin', 'emisor']), validateBody(issueCardSchema), issueCardHandler);
router.get('/', authGuard(), listCardsHandler);
router.patch(
  '/:cardId/status',
  authGuard(['admin', 'emisor']),
  validateBody(updateCardStatusSchema),
  updateCardStatusHandler
);
router.post(
  '/:cardId/adjust',
  authGuard(['admin', 'emisor']),
  validateBody(adjustBalanceSchema),
  adjustCardBalanceHandler
);

export const cardRoutes = router;
