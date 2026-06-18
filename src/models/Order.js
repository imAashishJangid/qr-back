// backend/src/models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
  tableNumber: {
    type: String,
    required: true,
  },
  customerSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerSession',
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  items: [{
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    specialInstructions: String,
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'received', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
  },
  estimatedTime: {
    type: Number,
    default: 15,
  },
  actualTime: Number,
  staffNotes: String,
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'qr'],
  },
}, {
  timestamps: true,
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ORD-${year}${month}${day}-${random}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);