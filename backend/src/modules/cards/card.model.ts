import { Document, Model, Schema, model, Types } from 'mongoose';

export interface ICard extends Document {
  userId: Types.ObjectId;
  cardId: string;
  type: 'virtual' | 'physical';
  status: 'pending' | 'active' | 'blocked' | 'cancelled';
  currency: string;
  balance: number;
  last4: string;
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    cardId: { type: String, required: true, unique: true },
    type: { type: String, enum: ['virtual', 'physical'], default: 'virtual' },
    status: { type: String, enum: ['pending', 'active', 'blocked', 'cancelled'], default: 'pending' },
    currency: { type: String, default: 'USD' },
    balance: { type: Number, default: 0 },
    last4: { type: String, required: true }
  },
  { timestamps: true }
);

export const CardModel: Model<ICard> = model<ICard>('Card', cardSchema);
