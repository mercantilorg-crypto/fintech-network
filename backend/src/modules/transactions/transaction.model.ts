import { Document, Model, Schema, model } from 'mongoose';

export interface ITransaction extends Document {
  reference: string;
  type: 'p2p' | 'load' | 'withdrawal' | 'purchase';
  fromCardId?: string;
  toCardId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

const transactionSchema = new Schema<ITransaction>(
  {
    reference: { type: String, required: true, unique: true },
    type: { type: String, enum: ['p2p', 'load', 'withdrawal', 'purchase'], required: true },
    fromCardId: { type: String },
    toCardId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const TransactionModel: Model<ITransaction> = model<ITransaction>('Transaction', transactionSchema);
