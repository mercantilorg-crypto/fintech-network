const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  toCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
  type: {
    type: String,
    enum: ['p2p', 'load', 'withdraw', 'payment', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    trim: true
  },
  merchantId: {
    type: String
  },
  merchantName: {
    type: String
  },
  reference: {
    type: String,
    unique: true,
    sparse: true
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  processedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
transactionSchema.index({ fromCardId: 1, createdAt: -1 });
transactionSchema.index({ toCardId: 1, createdAt: -1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ reference: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
