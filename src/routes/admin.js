import express from 'express';
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
    totalOrders: 150,
    revenue: 45000,
    totalCustomers: 89,
    conversionRate: 68,
    dailyRevenue: [
      { date: '2026-06-14', revenue: 3200 },
      { date: '2026-06-15', revenue: 4100 },
      { date: '2026-06-16', revenue: 2800 },
      { date: '2026-06-17', revenue: 3900 },
      { date: '2026-06-18', revenue: 4500 }
    ],
    orderStatus: [
      { name: 'Delivered', value: 65 },
      { name: 'Preparing', value: 20 },
      { name: 'Pending', value: 10 },
      { name: 'Cancelled', value: 5 }
    ],
    topItems: [
      { name: 'Margherita Pizza', sales: 45 },
      { name: 'Burger', sales: 38 },
      { name: 'Pasta', sales: 30 },
      { name: 'Fries', sales: 25 }
    ]
  });
});

export default router;