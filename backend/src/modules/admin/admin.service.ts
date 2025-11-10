import { CardModel } from '../cards/card.model';
import { TransactionModel } from '../transactions/transaction.model';
import { UserModel } from '../users/user.model';

export const getAdminDashboardSummary = async () => {
  const [userCount, cardCount, transactionCount, totalVolume] = await Promise.all([
    UserModel.countDocuments(),
    CardModel.countDocuments(),
    TransactionModel.countDocuments({ status: 'completed' }),
    TransactionModel.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ])
  ]);

  return {
    users: userCount,
    cards: cardCount,
    transactions: transactionCount,
    totalProcessed: totalVolume[0]?.total ?? 0
  };
};
