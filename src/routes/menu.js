import express from 'express';
const router = express.Router();

// Get menu items
router.get('/:tableId', (req, res) => {
  res.json({ 
    items: [
      { _id: '1', name: 'Margherita Pizza', price: 299, description: 'Classic cheese pizza', isVeg: true },
      { _id: '2', name: 'Burger', price: 199, description: 'Juicy beef burger', isVeg: false },
      { _id: '3', name: 'French Fries', price: 99, description: 'Crispy golden fries', isVeg: true },
    ]
  });
});

// Get categories
router.get('/categories/:tableId', (req, res) => {
  res.json([
    { _id: '1', name: 'Pizza', icon: '🍕' },
    { _id: '2', name: 'Burger', icon: '🍔' },
    { _id: '3', name: 'Fries', icon: '🍟' },
  ]);
});

export default router;