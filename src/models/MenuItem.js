// backend/src/models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  isVeg: {
    type: Boolean,
    default: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isBestseller: {
    type: Boolean,
    default: false,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  preparationTime: {
    type: Number,
    default: 15,
  },
  calories: Number,
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
  },
}, {
  timestamps: true,
});

export default mongoose.model('MenuItem', menuItemSchema);