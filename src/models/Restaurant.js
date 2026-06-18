// backend/src/models/Restaurant.js
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  gstNumber: String,
  logo: String,
  cuisine: [String],
  operatingHours: {
    open: String,
    close: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Restaurant', restaurantSchema);