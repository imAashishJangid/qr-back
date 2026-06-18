// backend/src/models/Table.js
import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  tableNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 4,
  },
  qrCode: {
    type: String,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  currentOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Table', tableSchema);