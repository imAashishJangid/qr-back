// backend/src/models/CustomerSession.js
import mongoose from 'mongoose';

const customerSessionSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: String,
  currentOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('CustomerSession', customerSessionSchema);