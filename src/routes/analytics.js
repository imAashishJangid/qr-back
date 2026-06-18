import express from 'express';
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
    totalOrders: 150,
    revenue: 45000,
    totalCustomers: 89,
    conversionRate: 68
  });
});

export default router;