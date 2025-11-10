const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  expiryMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  expiryYear: {
    type: Number,
    required: true
  },
  cvv: {
    type: String,
    required: true,
    length: 3
  },
  type: {
    type: String,
    enum: ['virtual', 'physical'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'cancelled'],
    default: 'pending'
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  spendingLimit: {
    type: Number,
    default: 10000
  },
  dailyLimit: {
    type: Number,
    default: 1000
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  activatedAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
cardSchema.index({ userId: 1 });
cardSchema.index({ cardNumber: 1 });
cardSchema.index({ status: 1 });

module.exports = mongoose.model('Card', cardSchema);
